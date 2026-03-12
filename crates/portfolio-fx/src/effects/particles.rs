//! particles.rs — GPU Particle System (WebGL2)
//!
//! Handles both:
//!   - `CyberGrid` floating particles (Hero + About sections)
//!   - `ParticleBackground`: mouse-attracted particles with connection-line network
//!
//! All simulation runs on the CPU; results are uploaded each frame as a flat
//! vertex buffer (6 vertices × 6 floats per particle quad).
//! Connection lines use a separate LINE_LIST draw call.

use std::cell::RefCell;
use std::rc::Rc;

use wasm_bindgen::prelude::*;
use wasm_bindgen::JsCast;
use web_sys::{HtmlCanvasElement, WebGl2RenderingContext as GL};

use crate::renderer::{compile_program, create_dynamic_buffer, upload_f32_buffer, Gl2Context};

// ─── Mode ──────────────────────────────────────────────────────────────────────

/// `0` = CyberGrid (upward-drifting dots), `1` = Network (mouse-attracted + lines).
#[wasm_bindgen]
#[derive(Clone, Copy, PartialEq)]
pub enum ParticleMode {
    CyberGrid = 0,
    Network = 1,
}

// ─── GLSL shaders ──────────────────────────────────────────────────────────────

// Particle quad shader — renders each particle as a billboard with a soft glow.
const PARTICLE_VERT: &str = r#"#version 300 es
precision highp float;

in vec2  a_position;  // clip-space corner [-1,1]
in vec2  a_uv;        // [0,1]
in float a_alpha;
in vec4  a_color;

out vec2  v_uv;
out float v_alpha;
out vec4  v_color;

void main() {
    gl_Position = vec4(a_position, 0.0, 1.0);
    v_uv    = a_uv;
    v_alpha = a_alpha;
    v_color = a_color;
}
"#;

const PARTICLE_FRAG: &str = r#"#version 300 es
precision mediump float;

uniform float u_time;

in vec2  v_uv;
in float v_alpha;
in vec4  v_color;

out vec4 out_color;

void main() {
    vec2  p    = v_uv * 2.0 - 1.0;
    float dist = length(p);

    float mask = 1.0 - smoothstep(0.55, 1.0, dist);
    float glow = exp(-dist * dist * 3.5) * 0.8;

    float pulse = 0.88 + 0.12 * sin(u_time * 2.3 + v_uv.x * 6.28);
    float alpha = clamp((mask + glow) * v_alpha * pulse, 0.0, 1.0);

    out_color = vec4(v_color.rgb, alpha);
}
"#;

// Line shader — thin segments between nearby particles.
const LINE_VERT: &str = r#"#version 300 es
precision highp float;

in vec2  a_position;
in float a_alpha;
in vec4  a_color;

out float v_alpha;
out vec4  v_color;

void main() {
    gl_Position = vec4(a_position, 0.0, 1.0);
    v_alpha = a_alpha;
    v_color = a_color;
}
"#;

const LINE_FRAG: &str = r#"#version 300 es
precision mediump float;

uniform float u_time;

in float v_alpha;
in vec4  v_color;

out vec4 out_color;

void main() {
    float flicker = 0.9 + 0.1 * sin(u_time * 4.1);
    out_color = vec4(v_color.rgb, clamp(v_alpha * flicker, 0.0, 1.0));
}
"#;

// ─── CPU particle state ────────────────────────────────────────────────────────

#[derive(Clone)]
struct Particle {
    x: f32,
    y: f32,
    vx: f32,
    vy: f32,
    size: f32,  // radius in pixels
    alpha: f32, // current alpha
    base_alpha: f32,
    phase: f32, // for CyberGrid fade cycle
    cycle: f32, // cycle duration (seconds)
    r: f32,
    g: f32,
    b: f32,
}

// ─── Renderer ──────────────────────────────────────────────────────────────────

#[wasm_bindgen]
pub struct ParticleRenderer {
    ctx: Gl2Context,
    mode: ParticleMode,

    // Particle pipeline
    particle_prog: web_sys::WebGlProgram,
    particle_vao: web_sys::WebGlVertexArrayObject,
    particle_vbo: web_sys::WebGlBuffer,

    // Line pipeline
    line_prog: web_sys::WebGlProgram,
    line_vao: web_sys::WebGlVertexArrayObject,
    line_vbo: web_sys::WebGlBuffer,

    // Simulation
    particles: Vec<Particle>,

    // Mouse (pixels)
    mouse_x: f32,
    mouse_y: f32,

    // Timing
    start_ms: f64,
    last_ms: f64,

    // rAF loop
    running: Rc<RefCell<bool>>,
    raf_id: Rc<RefCell<Option<i32>>>,
}

unsafe impl Send for ParticleRenderer {}
unsafe impl Sync for ParticleRenderer {}

#[wasm_bindgen]
impl ParticleRenderer {
    // ──────────────────────────────────────────────────────────────────────────
    //  Construction
    // ──────────────────────────────────────────────────────────────────────────

    /// `mode_value`: 0 = CyberGrid, 1 = Network
    #[wasm_bindgen]
    pub fn new(canvas: HtmlCanvasElement, mode_value: u32) -> Result<ParticleRenderer, JsValue> {
        let mode = if mode_value == 1 {
            ParticleMode::Network
        } else {
            ParticleMode::CyberGrid
        };

        let width = canvas.width();
        let height = canvas.height();

        let ctx = Gl2Context::from_canvas(&canvas).map_err(|e| JsValue::from_str(&e))?;

        // ── Particle pipeline ─────────────────────────────────────────────────
        let particle_prog = compile_program(&ctx.gl, PARTICLE_VERT, PARTICLE_FRAG)
            .map_err(|e| JsValue::from_str(&e))?;

        // 6 floats per vertex: [clip_x, clip_y, u, v, alpha, ___pad]
        // + 4 floats color  → actually we flatten color into per-vertex:
        // layout: [clip_x, clip_y, u, v, alpha, r, g, b]  → 8 floats/vertex
        let max_particles = 512usize;
        let particle_vbo = create_dynamic_buffer(&ctx.gl, max_particles * 6 * 8 * 4)
            .map_err(|e| JsValue::from_str(&e))?;

        let particle_vao = ctx
            .gl
            .create_vertex_array()
            .ok_or_else(|| JsValue::from_str("particle vao failed"))?;

        ctx.gl.bind_vertex_array(Some(&particle_vao));
        ctx.gl.bind_buffer(GL::ARRAY_BUFFER, Some(&particle_vbo));

        let stride = (8 * 4) as i32; // 8 floats × 4 bytes
        setup_attrib(&ctx.gl, &particle_prog, "a_position", 2, stride, 0);
        setup_attrib(&ctx.gl, &particle_prog, "a_uv", 2, stride, 2 * 4);
        setup_attrib(&ctx.gl, &particle_prog, "a_alpha", 1, stride, 4 * 4);
        setup_attrib(&ctx.gl, &particle_prog, "a_color", 3, stride, 5 * 4);

        ctx.gl.bind_vertex_array(None);
        ctx.gl.bind_buffer(GL::ARRAY_BUFFER, None);

        // ── Line pipeline ─────────────────────────────────────────────────────
        let line_prog =
            compile_program(&ctx.gl, LINE_VERT, LINE_FRAG).map_err(|e| JsValue::from_str(&e))?;

        // 7 floats per vertex: [clip_x, clip_y, alpha, r, g, b, _pad]
        let line_vbo =
            create_dynamic_buffer(&ctx.gl, 2048 * 7 * 4).map_err(|e| JsValue::from_str(&e))?;

        let line_vao = ctx
            .gl
            .create_vertex_array()
            .ok_or_else(|| JsValue::from_str("line vao failed"))?;

        ctx.gl.bind_vertex_array(Some(&line_vao));
        ctx.gl.bind_buffer(GL::ARRAY_BUFFER, Some(&line_vbo));

        let lstride = (7 * 4) as i32;
        setup_attrib(&ctx.gl, &line_prog, "a_position", 2, lstride, 0);
        setup_attrib(&ctx.gl, &line_prog, "a_alpha", 1, lstride, 2 * 4);
        setup_attrib(&ctx.gl, &line_prog, "a_color", 4, lstride, 3 * 4);

        ctx.gl.bind_vertex_array(None);
        ctx.gl.bind_buffer(GL::ARRAY_BUFFER, None);

        // ── Blending: additive for particles, alpha for lines ─────────────────
        ctx.gl.enable(GL::BLEND);
        ctx.gl.blend_equation(GL::FUNC_ADD);
        ctx.gl
            .blend_func_separate(GL::SRC_ALPHA, GL::ONE, GL::ONE, GL::ONE);

        // ── Initial particles ─────────────────────────────────────────────────
        let particles = init_particles(width, height, mode);

        let now = crate::now_ms();
        Ok(ParticleRenderer {
            ctx,
            mode,
            particle_prog,
            particle_vao,
            particle_vbo,
            line_prog,
            line_vao,
            line_vbo,
            particles,
            mouse_x: -9999.0,
            mouse_y: -9999.0,
            start_ms: now,
            last_ms: now,
            running: Rc::new(RefCell::new(false)),
            raf_id: Rc::new(RefCell::new(None)),
        })
    }

    // ──────────────────────────────────────────────────────────────────────────
    //  Public JS API
    // ──────────────────────────────────────────────────────────────────────────

    pub fn start(&mut self) {
        if *self.running.borrow() {
            return;
        }
        *self.running.borrow_mut() = true;
        self.schedule_raf();
    }

    pub fn stop(&mut self) {
        *self.running.borrow_mut() = false;
        if let Some(id) = self.raf_id.borrow_mut().take() {
            web_sys::window().unwrap().cancel_animation_frame(id).ok();
        }
    }

    pub fn set_mouse(&mut self, x: f32, y: f32) {
        self.mouse_x = x;
        self.mouse_y = y;
    }

    pub fn resize(&mut self, width: u32, height: u32) {
        self.ctx.resize(width, height);
        self.particles = init_particles(width, height, self.mode);
    }

    // ──────────────────────────────────────────────────────────────────────────
    //  rAF loop
    // ──────────────────────────────────────────────────────────────────────────

    fn schedule_raf(&mut self) {
        let self_ptr = self as *mut ParticleRenderer;
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
        let dt = delta_s.min(0.05);

        let w = self.ctx.width as f32;
        let h = self.ctx.height as f32;

        // ── Simulate ──────────────────────────────────────────────────────────
        match self.mode {
            ParticleMode::CyberGrid => simulate_cyber_grid(&mut self.particles, h, elapsed_s),
            ParticleMode::Network => {
                simulate_network(&mut self.particles, w, h, self.mouse_x, self.mouse_y, dt)
            }
        }

        // ── Build & upload particle vertex buffer ─────────────────────────────
        let pverts = build_particle_verts(&self.particles, w, h);
        upload_f32_buffer(&self.ctx.gl, &self.particle_vbo, &pverts);

        // ── Build & upload line vertex buffer (Network only) ──────────────────
        let lverts = if self.mode == ParticleMode::Network {
            build_line_verts(&self.particles, w, h)
        } else {
            Vec::new()
        };
        if !lverts.is_empty() {
            upload_f32_buffer(&self.ctx.gl, &self.line_vbo, &lverts);
        }

        // ── Render ────────────────────────────────────────────────────────────
        let gl = &self.ctx.gl;
        gl.viewport(0, 0, self.ctx.width as i32, self.ctx.height as i32);
        gl.clear_color(0.0, 0.0, 0.0, 0.0);
        gl.clear(GL::COLOR_BUFFER_BIT);

        // Additive blend for particles
        gl.blend_func_separate(GL::SRC_ALPHA, GL::ONE, GL::ONE, GL::ONE);

        // Draw lines first (behind particles) with alpha blend
        if !lverts.is_empty() {
            gl.blend_func_separate(
                GL::SRC_ALPHA,
                GL::ONE_MINUS_SRC_ALPHA,
                GL::ONE,
                GL::ONE_MINUS_SRC_ALPHA,
            );
            gl.use_program(Some(&self.line_prog));
            let t = gl.get_uniform_location(&self.line_prog, "u_time");
            gl.uniform1f(t.as_ref(), elapsed_s);
            gl.bind_vertex_array(Some(&self.line_vao));
            gl.draw_arrays(GL::LINES, 0, (lverts.len() / 7) as i32);
            gl.bind_vertex_array(None);

            // Switch back to additive for particles
            gl.blend_func_separate(GL::SRC_ALPHA, GL::ONE, GL::ONE, GL::ONE);
        }

        // Draw particle quads
        if !pverts.is_empty() {
            gl.use_program(Some(&self.particle_prog));
            let t = gl.get_uniform_location(&self.particle_prog, "u_time");
            gl.uniform1f(t.as_ref(), elapsed_s);
            gl.bind_vertex_array(Some(&self.particle_vao));
            gl.draw_arrays(GL::TRIANGLES, 0, (pverts.len() / 8) as i32);
            gl.bind_vertex_array(None);
        }

        gl.use_program(None);
    }
}

// ─── Vertex attribute helper ───────────────────────────────────────────────────

fn setup_attrib(
    gl: &GL,
    prog: &web_sys::WebGlProgram,
    name: &str,
    size: i32,
    stride: i32,
    offset: i32,
) {
    let loc = gl.get_attrib_location(prog, name);
    if loc < 0 {
        return;
    }
    let loc = loc as u32;
    gl.enable_vertex_attrib_array(loc);
    gl.vertex_attrib_pointer_with_i32(loc, size, GL::FLOAT, false, stride, offset);
}

// ─── Particle initialisation ───────────────────────────────────────────────────

fn init_particles(width: u32, height: u32, mode: ParticleMode) -> Vec<Particle> {
    let count = match mode {
        ParticleMode::CyberGrid => 20,
        ParticleMode::Network => {
            let n = (width as f32 * height as f32 / 15_000.0) as usize + 20;
            n.max(10).min(300)
        }
    };

    let mut seed: u32 = 0xC0FFEE42;
    let mut rng = move || -> f32 {
        seed = seed.wrapping_mul(1664525).wrapping_add(1013904223);
        (seed >> 16) as f32 / 65535.0
    };

    (0..count)
        .map(|i| match mode {
            ParticleMode::CyberGrid => Particle {
                x: (i as f32 / count as f32) * width as f32
                    + (rng() - 0.5) * (width as f32 / count as f32),
                y: rng() * height as f32,
                vx: 0.0,
                vy: 0.0,
                size: 3.0 + rng() * 3.0,
                alpha: 0.0,
                base_alpha: 0.4 + rng() * 0.6,
                phase: rng() * std::f32::consts::TAU,
                cycle: 3.0 + rng() * 3.0,
                r: 0.0,
                g: 0.85 + rng() * 0.15,
                b: 1.0,
            },
            ParticleMode::Network => Particle {
                x: rng() * width as f32,
                y: rng() * height as f32,
                vx: (rng() - 0.5) * 0.5,
                vy: (rng() - 0.5) * 0.5,
                size: 2.0 + rng() * 2.5,
                alpha: 0.3 + rng() * 0.4,
                base_alpha: 0.3 + rng() * 0.4,
                phase: rng() * std::f32::consts::TAU,
                cycle: 4.0 + rng() * 4.0,
                r: 0.39 + rng() * 0.15,
                g: 0.40 + rng() * 0.15,
                b: 0.80 + rng() * 0.20,
            },
        })
        .collect()
}

// ─── Simulations ───────────────────────────────────────────────────────────────

fn simulate_cyber_grid(particles: &mut Vec<Particle>, height: f32, time: f32) {
    for p in particles.iter_mut() {
        let t = ((time + p.phase / std::f32::consts::TAU * p.cycle) / p.cycle).fract();
        let fade = if t < 0.2 {
            t / 0.2
        } else if t < 0.8 {
            1.0
        } else {
            1.0 - (t - 0.8) / 0.2
        };
        p.alpha = p.base_alpha * fade;

        let base_y = p.phase * height / std::f32::consts::TAU;
        p.y = (base_y - t * 100.0).rem_euclid(height);
    }
}

fn simulate_network(
    particles: &mut Vec<Particle>,
    width: f32,
    height: f32,
    mouse_x: f32,
    mouse_y: f32,
    dt: f32,
) {
    const MOUSE_RADIUS: f32 = 200.0;
    const MOUSE_FORCE: f32 = 0.025;
    const DAMPING: f32 = 0.985;

    for p in particles.iter_mut() {
        if mouse_x > 0.0 {
            let dx = mouse_x - p.x;
            let dy = mouse_y - p.y;
            let dist = (dx * dx + dy * dy).sqrt();
            if dist < MOUSE_RADIUS && dist > 0.1 {
                let force = (MOUSE_RADIUS - dist) / MOUSE_RADIUS;
                p.vx += (dx / dist) * force * MOUSE_FORCE;
                p.vy += (dy / dist) * force * MOUSE_FORCE;
            }
        }

        p.x += p.vx;
        p.y += p.vy;
        p.vx *= DAMPING;
        p.vy *= DAMPING;

        if p.x < 0.0 {
            p.x += width;
        }
        if p.x > width {
            p.x -= width;
        }
        if p.y < 0.0 {
            p.y += height;
        }
        if p.y > height {
            p.y -= height;
        }
    }
}

// ─── Vertex buffer builders ────────────────────────────────────────────────────

/// Build particle billboard quads.
/// Vertex layout (8 floats): [clip_x, clip_y, u, v, alpha, r, g, b]
fn build_particle_verts(particles: &[Particle], w: f32, h: f32) -> Vec<f32> {
    let mut v = Vec::with_capacity(particles.len() * 6 * 8);

    for p in particles {
        if p.alpha < 0.005 {
            continue;
        }

        // Pixel extents
        let px0 = p.x - p.size;
        let px1 = p.x + p.size;
        let py0 = p.y - p.size;
        let py1 = p.y + p.size;

        // Clip space
        let cx0 = (px0 / w) * 2.0 - 1.0;
        let cx1 = (px1 / w) * 2.0 - 1.0;
        let cy0 = -((py0 / h) * 2.0 - 1.0);
        let cy1 = -((py1 / h) * 2.0 - 1.0);

        let push = |buf: &mut Vec<f32>, cx: f32, cy: f32, u: f32, vv: f32| {
            buf.extend_from_slice(&[cx, cy, u, vv, p.alpha, p.r, p.g, p.b]);
        };

        let mut tmp = Vec::with_capacity(6 * 8);
        push(&mut tmp, cx0, cy0, 0.0, 0.0);
        push(&mut tmp, cx0, cy1, 0.0, 1.0);
        push(&mut tmp, cx1, cy1, 1.0, 1.0);
        push(&mut tmp, cx0, cy0, 0.0, 0.0);
        push(&mut tmp, cx1, cy1, 1.0, 1.0);
        push(&mut tmp, cx1, cy0, 1.0, 0.0);
        v.extend_from_slice(&tmp);
    }

    v
}

/// Build line segment vertices for the Network mode.
/// Vertex layout (7 floats): [clip_x, clip_y, alpha, r, g, b, _pad]
fn build_line_verts(particles: &[Particle], w: f32, h: f32) -> Vec<f32> {
    const CONNECTION_DIST: f32 = 120.0;
    const LR: f32 = 0.39;
    const LG: f32 = 0.40;
    const LB: f32 = 0.95;

    let mut v: Vec<f32> = Vec::new();

    for i in 0..particles.len() {
        for j in (i + 1)..particles.len() {
            let pa = &particles[i];
            let pb = &particles[j];

            let dx = pa.x - pb.x;
            let dy = pa.y - pb.y;
            let dist = (dx * dx + dy * dy).sqrt();

            if dist >= CONNECTION_DIST {
                continue;
            }

            let alpha = 0.15 * (1.0 - dist / CONNECTION_DIST);

            let to_clip =
                |x: f32, y: f32| -> (f32, f32) { ((x / w) * 2.0 - 1.0, -((y / h) * 2.0 - 1.0)) };

            let (ax, ay) = to_clip(pa.x, pa.y);
            let (bx, by) = to_clip(pb.x, pb.y);

            v.extend_from_slice(&[ax, ay, alpha, LR, LG, LB, 0.0]);
            v.extend_from_slice(&[bx, by, alpha, LR, LG, LB, 0.0]);

            if v.len() >= 2040 * 7 {
                return v;
            }
        }
    }

    v
}
