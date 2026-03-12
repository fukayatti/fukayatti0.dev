//! rgb_split.rs — WebGL2-powered RGB Split / Distortion / Glitch renderer
//!
//! Three modes share the same GLSL ES 3.0 shaders, dispatched via `u_mode`:
//!   Mode 0 – DistortedProfile  (mouse-tracked chromatic aberration + warp)
//!   Mode 1 – DistortedImage    (stronger warp + CRT scanlines + scan beam)
//!   Mode 2 – GlitchImage       (aggressive band-slicing + noise warp on hover)

use std::cell::RefCell;
use std::rc::Rc;

use wasm_bindgen::prelude::*;
use wasm_bindgen::JsCast;
use web_sys::{
    HtmlCanvasElement, HtmlImageElement, WebGl2RenderingContext as GL, WebGlBuffer, WebGlProgram,
    WebGlTexture, WebGlVertexArrayObject,
};

use crate::renderer::{
    compile_program, create_quad_buffer, upload_html_image_texture, Gl2Context, QUAD_VERTS,
};

// ─── Mode constants ────────────────────────────────────────────────────────────

pub const MODE_DISTORTED_PROFILE: u32 = 0;
pub const MODE_DISTORTED_IMAGE: u32 = 1;
pub const MODE_GLITCH_IMAGE: u32 = 2;

// ─── GLSL ES 3.0 Shaders ──────────────────────────────────────────────────────

const VERT_SRC: &str = r#"#version 300 es
precision highp float;
in vec2 a_position;
in vec2 a_texcoord;
out vec2 v_uv;
void main() {
    gl_Position = vec4(a_position, 0.0, 1.0);
    v_uv = a_texcoord;
}
"#;

const FRAG_SRC: &str = r#"#version 300 es
precision highp float;
precision highp int;

uniform sampler2D u_image;
uniform vec2  u_mouse_uv;
uniform float u_split_intensity;
uniform float u_color_strength;
uniform float u_time;
uniform float u_glitch_amount;
uniform float u_opacity;
uniform int   u_mode;
uniform float u_width;
uniform float u_height;

in  vec2 v_uv;
out vec4 frag_color;

uint pcg(uint v) {
    uint state = v * 747796405u + 2891336453u;
    uint word  = ((state >> ((state >> 28u) + 4u)) ^ state) * 277803737u;
    return (word >> 22u) ^ word;
}
float rand_f32(uint seed) { return float(pcg(seed)) / float(0xffffffffu); }

float hash21(vec2 p) {
    vec2 p2 = fract(p * vec2(127.1, 311.7));
    p2 += dot(p2, p2.yx + 19.19);
    return fract((p2.x + p2.y) * p2.x);
}
float smooth_noise(vec2 p) {
    vec2 i = floor(p); vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash21(i),hash21(i+vec2(1,0)),u.x),mix(hash21(i+vec2(0,1)),hash21(i+vec2(1,1)),u.x),u.y);
}

vec2 warp_uv(vec2 uv) {
    float s = u_split_intensity * 0.018;
    vec2 fc = uv - vec2(0.5);
    return uv + fc * dot(fc,fc) * s * 4.0 + (u_mouse_uv - vec2(0.5)) * s;
}
void rgb_offsets(vec2 uv, out vec2 r_off, out vec2 b_off) {
    vec2 co = u_mouse_uv - vec2(0.5);
    float intensity = u_split_intensity * 0.035;
    r_off =  co * intensity;
    b_off = -co * intensity;
}
float scanlines(vec2 uv) {
    float sl = sin(uv.y * (u_height/4.0) * 3.14159);
    return 0.85 + 0.15 * sl * sl;
}
float scan_beam(vec2 uv) {
    float dist = abs(uv.y - fract(u_time * 0.33));
    return 1.0 + 0.18 * exp(-dist * 60.0);
}
float vignette(vec2 uv) {
    vec2 p = uv * 2.0 - 1.0;
    return 1.0 - dot(p * vec2(0.55,0.45), p * vec2(0.55,0.45));
}
vec4 tex(vec2 uv) { return texture(u_image, clamp(uv, vec2(0.0), vec2(1.0))); }

vec4 mode_distorted_profile(vec2 uv) {
    vec2 w = warp_uv(uv); vec2 ro, bo; rgb_offsets(w, ro, bo);
    vec3 c = vec3(tex(w+ro).r, tex(w).g, tex(w+bo).b);
    float g = dot(c, vec3(0.299,0.587,0.114));
    vec3 f = mix(vec3(g), c, u_color_strength);
    return vec4(f * scanlines(uv) * scan_beam(uv) * clamp(vignette(uv),0.0,1.0), u_opacity);
}
vec4 mode_distorted_image(vec2 uv) {
    vec2 w = warp_uv(uv); vec2 ro, bo; rgb_offsets(w, ro, bo);
    vec3 c = vec3(tex(w+ro*1.4).r, tex(w).g, tex(w+bo*1.4).b);
    float g = dot(c, vec3(0.299,0.587,0.114));
    vec3 f = mix(vec3(g), c, u_color_strength) + vec3(0.0,0.06,0.08)*u_glitch_amount;
    return vec4(f * scanlines(uv) * scan_beam(uv) * clamp(vignette(uv),0.1,1.0), u_opacity);
}
vec4 mode_glitch_image(vec2 uv) {
    vec2 d = uv;
    float ts = floor(u_time * 18.0);
    float br = hash21(vec2(floor(uv.y*24.0)/24.0*1973.5+ts*37.1, (floor(uv.y*24.0)/24.0*1973.5+ts*37.1)*0.31));
    float thr = 1.0 - u_glitch_amount * 0.7;
    if (br > thr) {
        float sx = (br-thr)/(1.0-thr)*0.08;
        d.x += sx * ((br > 0.5+thr*0.5) ? 1.0 : -1.0) * u_glitch_amount;
    }
    float ws = u_glitch_amount * 0.006;
    d.x += (smooth_noise(vec2(uv.y*40.0, u_time*6.0))-0.5)*ws;
    d.y += (smooth_noise(vec2(uv.x*40.0, u_time*6.0+3.7))-0.5)*ws*0.4;
    d = clamp(d, vec2(0.0), vec2(1.0));
    float sp = u_split_intensity * u_glitch_amount * 0.06;
    vec3 c = vec3(tex(d+vec2(sp,0.0)).r, tex(d).g, tex(d-vec2(sp,0.0)).b);
    float g = dot(c, vec3(0.299,0.587,0.114));
    vec3 f = mix(vec3(g), c, u_color_strength);
    float bb = 1.0 + u_glitch_amount * 0.08;
    float sl = 0.92 + 0.08 * scanlines(uv);
    uint ns = uint(uv.x*512.0)*1301u + uint(uv.y*512.0)*797u + uint(ts)*31337u;
    float no = (rand_f32(ns)-0.5)*0.06*u_glitch_amount;
    vec3 o = clamp(f*bb*sl*scan_beam(uv)*clamp(vignette(uv),0.15,1.0)+no, vec3(0.0), vec3(1.0));
    return vec4(o + vec3(0.0,1.0,0.9)*max(0.0,u_glitch_amount-0.7)*0.15, u_opacity);
}

void main() {
    if (u_mode == 0)      frag_color = mode_distorted_profile(v_uv);
    else if (u_mode == 1) frag_color = mode_distorted_image(v_uv);
    else                  frag_color = mode_glitch_image(v_uv);
}
"#;

// ─── Renderer ──────────────────────────────────────────────────────────────────

#[wasm_bindgen]
pub struct RgbSplitRenderer {
    ctx: Gl2Context,
    program: WebGlProgram,
    vao: WebGlVertexArrayObject,
    quad_buf: WebGlBuffer,
    image_tex: WebGlTexture,

    mode: u32,
    start_time_ms: f64,
    mouse_uv_x: f32,
    mouse_uv_y: f32,
    split_intensity: f32,
    color_strength: f32,
    glitch_amount: f32,
    opacity: f32,

    running: Rc<RefCell<bool>>,
    raf_id: Rc<RefCell<Option<i32>>>,
}

unsafe impl Send for RgbSplitRenderer {}
unsafe impl Sync for RgbSplitRenderer {}

#[wasm_bindgen]
impl RgbSplitRenderer {
    /// Create a new renderer.
    /// `mode_value`: 0=DistortedProfile, 1=DistortedImage, 2=GlitchImage
    #[wasm_bindgen]
    pub fn new(
        canvas: HtmlCanvasElement,
        image: HtmlImageElement,
        mode_value: u32,
    ) -> Result<RgbSplitRenderer, JsValue> {
        let ctx = Gl2Context::from_canvas(&canvas).map_err(|e| JsValue::from_str(&e))?;
        let gl = &ctx.gl;

        let program = compile_program(gl, VERT_SRC, FRAG_SRC).map_err(|e| JsValue::from_str(&e))?;
        let quad_buf = create_quad_buffer(gl).map_err(|e| JsValue::from_str(&e))?;
        let image_tex = upload_html_image_texture(gl, &image).map_err(|e| JsValue::from_str(&e))?;

        let vao = gl.create_vertex_array()
            .ok_or_else(|| JsValue::from_str("create_vertex_array failed"))?;
        gl.bind_vertex_array(Some(&vao));
        gl.bind_buffer(GL::ARRAY_BUFFER, Some(&quad_buf));

        let pos_loc = gl.get_attrib_location(&program, "a_position") as u32;
        gl.enable_vertex_attrib_array(pos_loc);
        gl.vertex_attrib_pointer_with_i32(pos_loc, 2, GL::FLOAT, false, 16, 0);

        let tc_loc = gl.get_attrib_location(&program, "a_texcoord") as u32;
        gl.enable_vertex_attrib_array(tc_loc);
        gl.vertex_attrib_pointer_with_i32(tc_loc, 2, GL::FLOAT, false, 16, 8);

        gl.bind_vertex_array(None);
        gl.bind_buffer(GL::ARRAY_BUFFER, None);
        ctx.enable_alpha_blend();

        Ok(Self {
            ctx,
            program,
            vao,
            quad_buf,
            image_tex,
            mode: mode_value,
            start_time_ms: crate::now_ms(),
            mouse_uv_x: 0.5,
            mouse_uv_y: 0.5,
            split_intensity: 1.0,
            color_strength: 0.0,
            glitch_amount: 0.0,
            opacity: 1.0,
            running: Rc::new(RefCell::new(false)),
            raf_id: Rc::new(RefCell::new(None)),
        })
    }

    #[wasm_bindgen]
    pub fn start(&mut self) {
        if *self.running.borrow() { return; }
        *self.running.borrow_mut() = true;
        self.schedule_raf();
    }

    #[wasm_bindgen]
    pub fn stop(&mut self) {
        *self.running.borrow_mut() = false;
        if let Some(id) = self.raf_id.borrow_mut().take() {
            web_sys::window().unwrap().cancel_animation_frame(id).ok();
        }
    }

    #[wasm_bindgen]
    pub fn set_mouse_uv(&mut self, x: f32, y: f32) {
        self.mouse_uv_x = x; self.mouse_uv_y = y;
    }

    #[wasm_bindgen]
    pub fn reset_mouse(&mut self) {
        self.mouse_uv_x = 0.5; self.mouse_uv_y = 0.5;
    }

    #[wasm_bindgen]
    pub fn set_glitch_amount(&mut self, v: f32) { self.glitch_amount = v.clamp(0.0, 1.0); }

    #[wasm_bindgen]
    pub fn set_color_strength(&mut self, v: f32) { self.color_strength = v.clamp(0.0, 1.0); }

    #[wasm_bindgen]
    pub fn set_split_intensity(&mut self, v: f32) { self.split_intensity = v.clamp(0.0, 1.0); }

    #[wasm_bindgen]
    pub fn set_opacity(&mut self, v: f32) { self.opacity = v.clamp(0.0, 1.0); }

    #[wasm_bindgen]
    pub fn resize(&mut self, width: u32, height: u32) { self.ctx.resize(width, height); }

    /// Draw a single frame immediately (without starting the loop).
    #[wasm_bindgen]
    pub fn render_once(&mut self) {
        let t = ((crate::now_ms() - self.start_time_ms) / 1000.0) as f32;
        self.draw_frame(t);
    }

    fn schedule_raf(&self) {
        let running = Rc::clone(&self.running);
        let raf_id  = Rc::clone(&self.raf_id);
        let self_ptr = self as *const RgbSplitRenderer as *mut RgbSplitRenderer;

        let closure: Rc<RefCell<Option<Closure<dyn FnMut()>>>> = Rc::new(RefCell::new(None));
        let c2 = Rc::clone(&closure);

        *closure.borrow_mut() = Some(Closure::wrap(Box::new(move || {
            if !*running.borrow() { return; }
            let t = ((crate::now_ms() - unsafe { (*self_ptr).start_time_ms }) / 1000.0) as f32;
            unsafe { (*self_ptr).draw_frame(t) };
            let win = web_sys::window().unwrap();
            let id = win.request_animation_frame(c2.borrow().as_ref().unwrap().as_ref().unchecked_ref()).unwrap();
            *raf_id.borrow_mut() = Some(id);
        }) as Box<dyn FnMut()>));

        let win = web_sys::window().unwrap();
        let id = win.request_animation_frame(closure.borrow().as_ref().unwrap().as_ref().unchecked_ref()).unwrap();
        *self.raf_id.borrow_mut() = Some(id);
        std::mem::forget(closure);
    }

    fn draw_frame(&self, t_secs: f32) {
        let gl = &self.ctx.gl;
        self.ctx.clear();
        gl.use_program(Some(&self.program));
        gl.bind_vertex_array(Some(&self.vao));

        gl.active_texture(GL::TEXTURE0);
        gl.bind_texture(GL::TEXTURE_2D, Some(&self.image_tex));
        if let Some(loc) = gl.get_uniform_location(&self.program, "u_image") {
            gl.uniform1i(Some(&loc), 0);
        }

        set_u1i(gl, &self.program, "u_mode",  self.mode as i32);
        set_u2f(gl, &self.program, "u_mouse_uv", self.mouse_uv_x, self.mouse_uv_y);
        set_u1f(gl, &self.program, "u_split_intensity", self.split_intensity);
        set_u1f(gl, &self.program, "u_color_strength",  self.color_strength);
        set_u1f(gl, &self.program, "u_time",            t_secs);
        set_u1f(gl, &self.program, "u_glitch_amount",   self.glitch_amount);
        set_u1f(gl, &self.program, "u_opacity",         self.opacity);
        set_u1f(gl, &self.program, "u_width",   self.ctx.width  as f32);
        set_u1f(gl, &self.program, "u_height",  self.ctx.height as f32);

        gl.draw_arrays(GL::TRIANGLES, 0, (QUAD_VERTS.len() / 4) as i32);
        gl.bind_vertex_array(None);
        gl.use_program(None);
    }
}

fn set_u1f(gl: &GL, p: &WebGlProgram, n: &str, v: f32) { gl.uniform1f(gl.get_uniform_location(p,n).as_ref(), v); }
fn set_u1i(gl: &GL, p: &WebGlProgram, n: &str, v: i32) { gl.uniform1i(gl.get_uniform_location(p,n).as_ref(), v); }
fn set_u2f(gl: &GL, p: &WebGlProgram, n: &str, x: f32, y: f32) { gl.uniform2f(gl.get_uniform_location(p,n).as_ref(), x, y); }
