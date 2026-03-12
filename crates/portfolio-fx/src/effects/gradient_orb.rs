//! gradient_orb.rs — WebGL2-powered Gradient Orb / Morphing Blob renderer
//!
//! Two modes using GLSL ES 3.0 SDF shaders:
//!   Mode 0 – GradientOrb  (simple animated radial gradient circle)
//!   Mode 1 – MorphingBlob (organic SDF blob with smooth-union secondary shape)

use std::cell::RefCell;
use std::rc::Rc;

use wasm_bindgen::prelude::*;
use wasm_bindgen::JsCast;
use web_sys::{
    HtmlCanvasElement, WebGl2RenderingContext as GL, WebGlBuffer, WebGlProgram,
    WebGlVertexArrayObject,
};

use crate::renderer::{compile_program, create_quad_buffer, Gl2Context, QUAD_VERTS};

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

uniform float u_time;
uniform float u_opacity;
uniform float u_morph_speed;
uniform float u_shape_scale;
uniform vec4  u_color_a;
uniform vec4  u_color_b;
uniform vec4  u_glow_color;
uniform float u_glow_strength;
uniform float u_edge_softness;
uniform int   u_mode;

out vec4 frag_color;
in  vec2 v_uv;

float smin(float a, float b, float k) {
    float h = max(k - abs(a-b), 0.0) / k;
    return min(a,b) - h*h*k*0.25;
}
mat2 rot2(float a) { float c=cos(a),s=sin(a); return mat2(c,-s,s,c); }
float cos_noise(vec2 p) { return cos(p.x)*cos(p.y); }
float fbm(vec2 p) {
    float v=0.0, amp=0.5, freq=1.0;
    for (int i=0;i<4;i++) {
        v += cos_noise(p*freq)*amp;
        p  = rot2(0.37+float(i)*0.11)*p;
        amp*=0.5; freq*=2.1;
    }
    return v;
}
float sdf_blob(vec2 p, float r, float t, float speed) {
    float angle=atan(p.y,p.x);
    float prim = 0.08*sin(3.0*angle+t*speed*0.7)
               + 0.06*sin(5.0*angle-t*speed*1.1)
               + 0.04*sin(7.0*angle+t*speed*0.4);
    float surf = fbm(p*2.5+vec2(t*speed*0.15, t*speed*0.22))*0.05;
    return length(p)-(r+prim+surf);
}

vec4 mode_gradient_orb(vec2 uv) {
    vec2 p = (uv-vec2(0.5))*2.0;
    float r = u_shape_scale*0.55;
    float breath = 1.0+0.06*sin(u_time*0.9);
    float d = length(p)-r*breath;
    float fill = smoothstep(u_edge_softness, -u_edge_softness, d);
    float tg = clamp(length(p)/(r*breath), 0.0, 1.0);
    vec3 color = mix(u_color_a.rgb, u_color_b.rgb, tg*tg);
    float gd = max(d,0.0);
    float gv = exp(-gd*gd*6.0)*u_glow_strength;
    vec2 hp = vec2(sin(u_time*0.6)*0.25, cos(u_time*0.4)*0.20)*r;
    float hi = exp(-dot(p-hp,p-hp)*8.0)*0.18;
    vec3 out_rgb = color*fill + u_glow_color.rgb*gv + hi*fill;
    return vec4(out_rgb, clamp((fill+gv*0.4)*u_opacity, 0.0, 1.0));
}

vec4 mode_morphing_blob(vec2 uv) {
    vec2 p = (uv-vec2(0.5))*2.0;
    float speed = u_morph_speed;
    float r = u_shape_scale*0.48;
    float d0 = sdf_blob(p, r, u_time, speed);
    float oa = u_time*speed*0.35;
    float or_ = r*0.32;
    vec2 op = vec2(cos(oa),sin(oa))*r*0.38;
    float d1 = sdf_blob(p-op, or_, u_time, speed*1.4);
    float d = smin(d0, d1, r*0.35);
    float fill = smoothstep(u_edge_softness, -u_edge_softness, d);
    float tg = clamp(length(p)/(r*1.2), 0.0, 1.0);
    vec3 color = mix(u_color_a.rgb, u_color_b.rgb, pow(tg, 1.6));
    vec2 suv = rot2(u_time*speed*0.22)*p;
    float sheen = smoothstep(0.6, 0.0, length(suv-vec2(0.15,-0.10)))*0.22;
    float gd = max(d,0.0);
    float gv = exp(-gd*gd*5.0)*u_glow_strength;
    float rim = smoothstep(u_edge_softness*3.0, 0.0, abs(d))*0.35*fill;
    vec3 out_rgb = color*fill + sheen*fill + u_glow_color.rgb*gv + mix(u_color_b.rgb,vec3(1.0),0.5)*rim;
    return vec4(out_rgb, clamp((fill+gv*0.35)*u_opacity, 0.0, 1.0));
}

void main() {
    frag_color = (u_mode == 1) ? mode_morphing_blob(v_uv) : mode_gradient_orb(v_uv);
}
"#;

// ─── Preset helpers ────────────────────────────────────────────────────────────

fn hex_to_linear(hex: &str) -> [f32; 3] {
    let h = hex.trim_start_matches('#');
    if h.len() < 6 { return [1.0,1.0,1.0]; }
    let r = u8::from_str_radix(&h[0..2], 16).unwrap_or(255) as f32 / 255.0;
    let g = u8::from_str_radix(&h[2..4], 16).unwrap_or(255) as f32 / 255.0;
    let b = u8::from_str_radix(&h[4..6], 16).unwrap_or(255) as f32 / 255.0;
    [r.powf(2.2), g.powf(2.2), b.powf(2.2)]
}

// ─── Renderer ──────────────────────────────────────────────────────────────────

#[wasm_bindgen]
pub struct GradientOrbRenderer {
    ctx: Gl2Context,
    program: WebGlProgram,
    vao: WebGlVertexArrayObject,
    #[allow(dead_code)]
    quad_buf: WebGlBuffer,

    mode: u32,
    opacity: f32,
    morph_speed: f32,
    shape_scale: f32,
    color_a: [f32; 4],
    color_b: [f32; 4],
    glow_color: [f32; 4],
    glow_strength: f32,
    edge_softness: f32,

    start_time_ms: f64,
    running: Rc<RefCell<bool>>,
    raf_id: Rc<RefCell<Option<i32>>>,
}

unsafe impl Send for GradientOrbRenderer {}
unsafe impl Sync for GradientOrbRenderer {}

#[wasm_bindgen]
impl GradientOrbRenderer {
    /// Create a new renderer.
    /// `mode_value`: 0 = GradientOrb, 1 = MorphingBlob
    #[wasm_bindgen]
    pub fn new(canvas: HtmlCanvasElement, mode_value: u32) -> Result<GradientOrbRenderer, JsValue> {
        let ctx = Gl2Context::from_canvas(&canvas).map_err(|e| JsValue::from_str(&e))?;
        let gl = &ctx.gl;

        let program = compile_program(gl, VERT_SRC, FRAG_SRC).map_err(|e| JsValue::from_str(&e))?;
        let quad_buf = create_quad_buffer(gl).map_err(|e| JsValue::from_str(&e))?;

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
            ctx, program, vao, quad_buf,
            mode: mode_value,
            opacity: 1.0,
            morph_speed: 1.0,
            shape_scale: 1.0,
            color_a: [0.0, 1.0, 1.0, 1.0],
            color_b: [0.0, 0.1, 0.3, 1.0],
            glow_color: [0.0, 0.8, 1.0, 1.0],
            glow_strength: 0.6,
            edge_softness: 0.06,
            start_time_ms: crate::now_ms(),
            running: Rc::new(RefCell::new(false)),
            raf_id: Rc::new(RefCell::new(None)),
        })
    }

    #[wasm_bindgen] pub fn start(&mut self) {
        if *self.running.borrow() { return; }
        *self.running.borrow_mut() = true;
        self.schedule_raf();
    }
    #[wasm_bindgen] pub fn stop(&mut self) {
        *self.running.borrow_mut() = false;
        if let Some(id) = self.raf_id.borrow_mut().take() {
            web_sys::window().unwrap().cancel_animation_frame(id).ok();
        }
    }

    #[wasm_bindgen] pub fn set_opacity(&mut self, v: f32) { self.opacity = v.clamp(0.0,1.0); }
    #[wasm_bindgen] pub fn set_morph_speed(&mut self, v: f32) { self.morph_speed = v.max(0.0); }
    #[wasm_bindgen] pub fn set_shape_scale(&mut self, v: f32) { self.shape_scale = v.max(0.01); }
    #[wasm_bindgen] pub fn set_edge_softness(&mut self, v: f32) { self.edge_softness = v.clamp(0.001,0.5); }
    #[wasm_bindgen] pub fn set_glow_strength(&mut self, v: f32) { self.glow_strength = v.clamp(0.0,2.0); }

    /// Set the inner colour from a hex string, e.g. `"#00ffff"`.
    #[wasm_bindgen] pub fn set_color_a(&mut self, hex: &str) {
        let [r,g,b] = hex_to_linear(hex); self.color_a = [r,g,b,1.0];
    }
    /// Set the outer/edge colour from a hex string.
    #[wasm_bindgen] pub fn set_color_b(&mut self, hex: &str) {
        let [r,g,b] = hex_to_linear(hex); self.color_b = [r,g,b,1.0];
    }
    /// Set the glow halo colour from a hex string.
    #[wasm_bindgen] pub fn set_glow_color(&mut self, hex: &str) {
        let [r,g,b] = hex_to_linear(hex); self.glow_color = [r,g,b,1.0];
    }

    /// Notify the renderer that the canvas has been resized.
    #[wasm_bindgen] pub fn resize(&mut self, width: u32, height: u32) {
        self.ctx.resize(width, height);
    }

    fn schedule_raf(&self) {
        let running  = Rc::clone(&self.running);
        let raf_id   = Rc::clone(&self.raf_id);
        let self_ptr = self as *const GradientOrbRenderer as *mut GradientOrbRenderer;

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

    fn draw_frame(&self, t: f32) {
        let gl = &self.ctx.gl;
        self.ctx.clear();
        gl.use_program(Some(&self.program));
        gl.bind_vertex_array(Some(&self.vao));

        set_u1f(gl, &self.program, "u_time",         t);
        set_u1f(gl, &self.program, "u_opacity",      self.opacity);
        set_u1f(gl, &self.program, "u_morph_speed",  self.morph_speed);
        set_u1f(gl, &self.program, "u_shape_scale",  self.shape_scale);
        set_u4f(gl, &self.program, "u_color_a",      self.color_a);
        set_u4f(gl, &self.program, "u_color_b",      self.color_b);
        set_u4f(gl, &self.program, "u_glow_color",   self.glow_color);
        set_u1f(gl, &self.program, "u_glow_strength",self.glow_strength);
        set_u1f(gl, &self.program, "u_edge_softness",self.edge_softness);
        set_u1i(gl, &self.program, "u_mode",         self.mode as i32);

        gl.draw_arrays(GL::TRIANGLES, 0, (QUAD_VERTS.len() / 4) as i32);
        gl.bind_vertex_array(None);
        gl.use_program(None);
    }
}

fn set_u1f(gl: &GL, p: &WebGlProgram, n: &str, v: f32) { gl.uniform1f(gl.get_uniform_location(p,n).as_ref(), v); }
fn set_u1i(gl: &GL, p: &WebGlProgram, n: &str, v: i32) { gl.uniform1i(gl.get_uniform_location(p,n).as_ref(), v); }
fn set_u4f(gl: &GL, p: &WebGlProgram, n: &str, v: [f32;4]) {
    gl.uniform4f(gl.get_uniform_location(p,n).as_ref(), v[0],v[1],v[2],v[3]);
}
