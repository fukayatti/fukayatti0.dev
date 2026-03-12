//! matrix_rain.rs — GPU-accelerated Matrix Rain renderer (WebGL2)
//!
//! Architecture:
//!   1. A glyph atlas texture is rasterised on the CPU using a hidden <canvas>
//!      (browser's built-in monospace font, no font files needed).
//!   2. Column positions / character assignments are updated on the CPU each frame.
//!   3. A single drawArrays call renders all visible characters as instanced quads
//!      using a flat vertex buffer: 6 vertices × N characters, each vertex carrying
//!      position + atlas UV + brightness + is_head.
//!
//! GLSL ES 3.0 shaders are embedded as string constants.

use std::cell::RefCell;
use std::rc::Rc;

use wasm_bindgen::prelude::*;
use wasm_bindgen::JsCast;
use web_sys::{HtmlCanvasElement, WebGl2RenderingContext as GL};

use crate::renderer::{
    compile_program, create_dynamic_buffer, upload_canvas_texture, upload_f32_buffer, Gl2Context,
};

// ─── Character set ─────────────────────────────────────────────────────────────

const MATRIX_CHARS: &str =
    "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン\
     ァィゥェォッャュョ\
     0123456789\
     ABCDEFGHIJKLMNOPQRSTUVWXYZ\
     @#$%^&*()+=[]{}|;:<>?";

const ATLAS_COLS: u32 = 16;
const FONT_SIZE: f32 = 14.0;

// ─── GLSL shaders ──────────────────────────────────────────────────────────────

const VERT_SRC: &str = r#"#version 300 es
precision highp float;

// Per-vertex data for one corner of a character quad (6 verts per char)
in vec2 a_position;    // clip-space corner  [-1, 1]
in vec2 a_uv;          // atlas UV           [0, 1]
in float a_brightness; // [0.05, 1.0]
in float a_is_head;    // 0.0 or 1.0

out vec2 v_uv;
out float v_brightness;
out float v_is_head;

void main() {
    gl_Position = vec4(a_position, 0.0, 1.0);
    v_uv        = a_uv;
    v_brightness = a_brightness;
    v_is_head   = a_is_head;
}
"#;

const FRAG_SRC: &str = r#"#version 300 es
precision mediump float;

uniform sampler2D u_atlas;
uniform float u_time;

in vec2 v_uv;
in float v_brightness;
in float v_is_head;

out vec4 out_color;

void main() {
    float mask = texture(u_atlas, v_uv).r;

    vec3 head_color  = vec3(1.0, 1.0, 1.0);
    vec3 near_color  = vec3(0.0, 1.0, 0.2);
    vec3 body_color  = vec3(0.0, 0.55, 0.05);

    vec3 color;
    if (v_is_head > 0.5) {
        color = head_color;
    } else {
        float t = clamp((v_brightness - 0.05) / 0.8, 0.0, 1.0);
        color = mix(body_color, near_color, t);
    }

    // Subtle per-character flicker
    float flicker = 0.92 + 0.08 * sin(v_uv.x * 37.3 + u_time * 12.1);
    float alpha   = mask * v_brightness * flicker;

    // Soft glow halo around the head character
    float glow = 0.0;
    if (v_is_head > 0.5) {
        glow = (1.0 - mask) * 0.18 * flicker;
    }

    out_color = vec4(color * mask + vec3(0.0, 0.8, 0.1) * glow,
                     clamp(alpha + glow, 0.0, 1.0));
}
"#;

// ─── Column CPU state ──────────────────────────────────────────────────────────

struct Column {
    /// X pixel position (centre of the column).
    x: f32,
    /// Y pixel position of the *top* character.
    y: f32,
    speed: f32,
    chars: Vec<u32>,
}

// ─── Renderer ──────────────────────────────────────────────────────────────────

#[wasm_bindgen]
pub struct MatrixRainRenderer {
    ctx: Gl2Context,

    // WebGL objects
    program: web_sys::WebGlProgram,
    vao: web_sys::WebGlVertexArrayObject,
    vbo: web_sys::WebGlBuffer,
    atlas_tex: web_sys::WebGlTexture,

    // Atlas metadata
    atlas_cols: u32,
    atlas_rows: u32,
    glyph_count: u32,
    cell_px: u32,

    // Simulation state
    columns: Vec<Column>,
    start_ms: f64,
    last_ms: f64,
    frame: u32,

    // rAF loop
    running: Rc<RefCell<bool>>,
    raf_id: Rc<RefCell<Option<i32>>>,
}

// WASM is single-threaded.
unsafe impl Send for MatrixRainRenderer {}
unsafe impl Sync for MatrixRainRenderer {}

#[wasm_bindgen]
impl MatrixRainRenderer {
    /// Create and initialise the renderer for the given canvas.
    #[wasm_bindgen]
    pub fn new(canvas: HtmlCanvasElement) -> Result<MatrixRainRenderer, JsValue> {
        let width = canvas.width();
        let height = canvas.height();

        let ctx = Gl2Context::from_canvas(&canvas).map_err(|e| JsValue::from_str(&e))?;

        // ── Glyph atlas ───────────────────────────────────────────────────────
        let chars: Vec<char> = MATRIX_CHARS.chars().collect();
        let glyph_count = chars.len() as u32;
        let atlas_rows = (glyph_count + ATLAS_COLS - 1) / ATLAS_COLS;
        let cell_px = FONT_SIZE as u32 + 4;
        let atlas_w = ATLAS_COLS * cell_px;
        let atlas_h = atlas_rows * cell_px;

        let atlas_canvas = rasterise_atlas(&chars, cell_px, atlas_w, atlas_h)?;
        let atlas_tex =
            upload_canvas_texture(&ctx.gl, &atlas_canvas).map_err(|e| JsValue::from_str(&e))?;

        // ── Compile shader ────────────────────────────────────────────────────
        let program =
            compile_program(&ctx.gl, VERT_SRC, FRAG_SRC).map_err(|e| JsValue::from_str(&e))?;

        // ── VAO + VBO ─────────────────────────────────────────────────────────
        // One VBO holds all character quads (6 floats × 6 verts × max_chars).
        // Each vertex: [clip_x, clip_y, u, v, brightness, is_head]  → 6 floats
        let max_chars = (width / FONT_SIZE as u32 + 1) * 30;
        let vbo = create_dynamic_buffer(&ctx.gl, (max_chars as usize) * 6 * 6 * 4)
            .map_err(|e| JsValue::from_str(&e))?;

        let vao = ctx
            .gl
            .create_vertex_array()
            .ok_or_else(|| JsValue::from_str("create_vertex_array failed"))?;

        ctx.gl.bind_vertex_array(Some(&vao));
        ctx.gl.bind_buffer(GL::ARRAY_BUFFER, Some(&vbo));

        let stride = (6 * std::mem::size_of::<f32>()) as i32;
        let setup = |name: &str, size: i32, offset: i32| {
            let loc = ctx.gl.get_attrib_location(&program, name);
            if loc >= 0 {
                let loc = loc as u32;
                ctx.gl.enable_vertex_attrib_array(loc);
                ctx.gl.vertex_attrib_pointer_with_i32(
                    loc,
                    size,
                    GL::FLOAT,
                    false,
                    stride,
                    offset * 4,
                );
            }
        };

        setup("a_position", 2, 0);
        setup("a_uv", 2, 2);
        setup("a_brightness", 1, 4);
        setup("a_is_head", 1, 5);

        ctx.gl.bind_vertex_array(None);
        ctx.gl.bind_buffer(GL::ARRAY_BUFFER, None);

        // ── Blending ──────────────────────────────────────────────────────────
        ctx.gl.enable(GL::BLEND);
        ctx.gl.blend_equation(GL::FUNC_ADD);
        ctx.gl
            .blend_func_separate(GL::SRC_ALPHA, GL::ONE, GL::ONE, GL::ONE);

        // ── Initial column state ──────────────────────────────────────────────
        let columns = init_columns(width, height, glyph_count);

        let now = crate::now_ms();
        Ok(MatrixRainRenderer {
            ctx,
            program,
            vao,
            vbo,
            atlas_tex,
            atlas_cols: ATLAS_COLS,
            atlas_rows,
            glyph_count,
            cell_px,
            columns,
            start_ms: now,
            last_ms: now,
            frame: 0,
            running: Rc::new(RefCell::new(false)),
            raf_id: Rc::new(RefCell::new(None)),
        })
    }

    /// Start the animation loop.
    pub fn start(&mut self) {
        if *self.running.borrow() {
            return;
        }
        *self.running.borrow_mut() = true;
        self.schedule_raf();
    }

    /// Stop the animation loop.
    pub fn stop(&mut self) {
        *self.running.borrow_mut() = false;
        if let Some(id) = self.raf_id.borrow_mut().take() {
            web_sys::window().unwrap().cancel_animation_frame(id).ok();
        }
    }

    /// Notify on canvas resize.
    pub fn resize(&mut self, width: u32, height: u32) {
        self.ctx.resize(width, height);
        self.columns = init_columns(width, height, self.glyph_count);
    }

    // ──────────────────────────────────────────────────────────────────────────

    fn schedule_raf(&mut self) {
        let self_ptr = self as *mut MatrixRainRenderer;
        let running = Rc::clone(&self.running);
        let raf_id = Rc::clone(&self.raf_id);

        let cb = Closure::once(move || {
            if !*running.borrow() {
                return;
            }
            let r = unsafe { &mut *self_ptr };
            r.render_frame();
            r.schedule_raf();
        });

        let win = web_sys::window().unwrap();
        let id = win
            .request_animation_frame(cb.as_ref().unchecked_ref())
            .unwrap_or(0);
        *raf_id.borrow_mut() = Some(id);
        cb.forget();
    }

    fn render_frame(&mut self) {
        let now_ms = crate::now_ms();
        let elapsed_s = ((now_ms - self.start_ms) / 1000.0) as f32;
        let delta_s = ((now_ms - self.last_ms) / 1000.0) as f32;
        self.last_ms = now_ms;
        self.frame += 1;

        let w = self.ctx.width as f32;
        let h = self.ctx.height as f32;
        let dt = delta_s.min(0.1);

        // ── Simulate columns ──────────────────────────────────────────────────
        simulate(&mut self.columns, w, h, dt, self.frame, self.glyph_count);

        // ── Build vertex buffer ───────────────────────────────────────────────
        let verts = build_vertices(
            &self.columns,
            w,
            h,
            self.atlas_cols,
            self.atlas_rows,
            self.cell_px,
            self.glyph_count,
        );

        if verts.is_empty() {
            return;
        }

        upload_f32_buffer(&self.ctx.gl, &self.vbo, &verts);

        // ── Draw ──────────────────────────────────────────────────────────────
        let gl = &self.ctx.gl;

        gl.viewport(0, 0, self.ctx.width as i32, self.ctx.height as i32);
        gl.clear_color(0.0, 0.0, 0.0, 0.0);
        gl.clear(GL::COLOR_BUFFER_BIT);

        gl.use_program(Some(&self.program));

        // Uniforms
        let t_loc = gl.get_uniform_location(&self.program, "u_time");
        gl.uniform1f(t_loc.as_ref(), elapsed_s);
        let s_loc = gl.get_uniform_location(&self.program, "u_atlas");
        gl.uniform1i(s_loc.as_ref(), 0);

        gl.active_texture(GL::TEXTURE0);
        gl.bind_texture(GL::TEXTURE_2D, Some(&self.atlas_tex));

        gl.bind_vertex_array(Some(&self.vao));
        let vert_count = (verts.len() / 6) as i32; // 6 floats per vertex
        gl.draw_arrays(GL::TRIANGLES, 0, vert_count);
        gl.bind_vertex_array(None);

        gl.use_program(None);
        gl.bind_texture(GL::TEXTURE_2D, None);
    }
}

// ─── Simulation ────────────────────────────────────────────────────────────────

fn pcg32(v: u32) -> u32 {
    let state = v.wrapping_mul(747796405).wrapping_add(2891336453);
    let word = ((state >> ((state >> 28).wrapping_add(4))) ^ state).wrapping_mul(277803737);
    (word >> 22) ^ word
}

fn init_columns(width: u32, height: u32, glyph_count: u32) -> Vec<Column> {
    let col_count = (width as f32 / FONT_SIZE).floor() as u32;
    let max_chars = (height as f32 / FONT_SIZE) as u32 + 10;

    let mut seed: u32 = 0xDEAD_BEEF;
    let mut rng = move || -> f32 {
        seed = seed.wrapping_mul(1664525).wrapping_add(1013904223);
        (seed >> 16) as f32 / 65535.0
    };

    (0..col_count)
        .map(|i| {
            let char_count = (10 + (rng() * 15.0) as u32).min(max_chars);
            let chars: Vec<u32> = (0..char_count)
                .map(|j| pcg32(i * 997 + j * 31) % glyph_count)
                .collect();
            Column {
                x: i as f32 * FONT_SIZE,
                y: -(rng() * height as f32),
                speed: 1.0 + rng() * 2.5,
                chars,
            }
        })
        .collect()
}

fn simulate(
    columns: &mut Vec<Column>,
    _width: f32,
    height: f32,
    dt: f32,
    frame: u32,
    glyph_count: u32,
) {
    for (i, col) in columns.iter_mut().enumerate() {
        col.y += col.speed * dt * 60.0;

        let reset_y = height + col.chars.len() as f32 * FONT_SIZE;
        if col.y > reset_y {
            col.y = -(col.chars.len() as f32 * FONT_SIZE);
            let s = pcg32(i as u32 ^ frame.wrapping_mul(997));
            col.speed = 1.0 + (s as f32 / u32::MAX as f32) * 2.5;
            for (j, ch) in col.chars.iter_mut().enumerate() {
                *ch = pcg32(i as u32 * 997 + j as u32 * 31 + frame) % glyph_count;
            }
        }

        // Occasional character flicker
        let fs = pcg32(i as u32 * 1234 + frame * 5678);
        if (fs as f32 / u32::MAX as f32) > 0.98 {
            let idx = pcg32(fs + 1) % col.chars.len() as u32;
            col.chars[idx as usize] = pcg32(fs + 2) % glyph_count;
        }
    }
}

// ─── Vertex buffer construction ────────────────────────────────────────────────

/// Build a flat vertex buffer (6 floats per vertex, 6 vertices per character).
/// Vertex layout: [clip_x, clip_y, u, v, brightness, is_head]
fn build_vertices(
    columns: &[Column],
    screen_w: f32,
    screen_h: f32,
    atlas_cols: u32,
    atlas_rows: u32,
    cell_px: u32,
    glyph_count: u32,
) -> Vec<f32> {
    let mut verts: Vec<f32> = Vec::new();

    let gw = 1.0 / atlas_cols as f32;
    let gh = 1.0 / atlas_rows as f32;
    let fs = FONT_SIZE;

    for col in columns {
        let n = col.chars.len() as u32;

        for (i, &char_idx) in col.chars.iter().enumerate() {
            let i = i as u32;
            let char_y = col.y + i as f32 * fs;

            // Cull characters fully outside the viewport
            if char_y + fs < 0.0 || char_y > screen_h {
                continue;
            }

            // Brightness gradient: bottom (head) brightest, top dimmest
            let t = i as f32 / (n - 1).max(1) as f32;
            let brightness = (t * t * 0.7 + 0.05).min(1.0);
            let is_head = if i == n - 1 { 1.0_f32 } else { 0.0 };

            let char_idx = char_idx.min(glyph_count - 1);
            let ac = (char_idx % atlas_cols) as f32;
            let ar = (char_idx / atlas_cols) as f32;

            // Clip-space rectangle for this character cell
            let px0 = col.x;
            let px1 = col.x + fs;
            let py0 = char_y;
            let py1 = char_y + fs;

            let cx0 = (px0 / screen_w) * 2.0 - 1.0;
            let cx1 = (px1 / screen_w) * 2.0 - 1.0;
            // Y is flipped (clip space Y+ = up, pixel Y+ = down)
            let cy0 = -(py0 / screen_h) * 2.0 + 1.0;
            let cy1 = -(py1 / screen_h) * 2.0 + 1.0;

            // Atlas UVs
            let u0 = ac * gw;
            let u1 = (ac + 1.0) * gw;
            let v0 = ar * gh;
            let v1 = (ar + 1.0) * gh;

            // Triangle 1: top-left, bottom-left, bottom-right
            // Triangle 2: top-left, bottom-right, top-right
            let quad: [[f32; 6]; 6] = [
                [cx0, cy0, u0, v0, brightness, is_head],
                [cx0, cy1, u0, v1, brightness, is_head],
                [cx1, cy1, u1, v1, brightness, is_head],
                [cx0, cy0, u0, v0, brightness, is_head],
                [cx1, cy1, u1, v1, brightness, is_head],
                [cx1, cy0, u1, v0, brightness, is_head],
            ];

            for v in &quad {
                verts.extend_from_slice(v);
            }
        }
    }

    verts
}

// ─── Glyph atlas rasterisation ─────────────────────────────────────────────────

fn rasterise_atlas(
    chars: &[char],
    cell_px: u32,
    atlas_w: u32,
    atlas_h: u32,
) -> Result<HtmlCanvasElement, JsValue> {
    let document = web_sys::window()
        .unwrap()
        .document()
        .ok_or_else(|| JsValue::from_str("no document"))?;

    let canvas: HtmlCanvasElement = document.create_element("canvas")?.dyn_into()?;

    canvas.set_width(atlas_w);
    canvas.set_height(atlas_h);

    let ctx2d = canvas
        .get_context("2d")?
        .ok_or_else(|| JsValue::from_str("no 2d context"))?
        .dyn_into::<web_sys::CanvasRenderingContext2d>()?;

    // Black background → glyph pixels will be white (sampled as the red channel)
    ctx2d.set_fill_style_str("black");
    ctx2d.fill_rect(0.0, 0.0, atlas_w as f64, atlas_h as f64);

    ctx2d.set_fill_style_str("white");
    ctx2d.set_font(&format!("bold {}px monospace", cell_px - 2));
    ctx2d.set_text_baseline("top");
    ctx2d.set_text_align("center");

    for (i, ch) in chars.iter().enumerate() {
        let col = (i as u32) % ATLAS_COLS;
        let row = (i as u32) / ATLAS_COLS;
        let cx = col as f64 * cell_px as f64 + cell_px as f64 / 2.0;
        let cy = row as f64 * cell_px as f64 + 1.0;
        ctx2d.fill_text(&ch.to_string(), cx, cy).ok();
    }

    Ok(canvas)
}
