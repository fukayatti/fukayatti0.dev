//! renderer.rs — Shared WebGL2 context and shader utilities
//!
//! Provides a thin ergonomic wrapper around the browser's WebGL2 API
//! (via web-sys) so each effect renderer doesn't have to repeat the
//! boilerplate of context creation, shader compilation, buffer helpers, etc.

use wasm_bindgen::prelude::*;
use wasm_bindgen::JsCast;
use web_sys::{
    HtmlCanvasElement, WebGl2RenderingContext as GL, WebGlBuffer, WebGlProgram, WebGlShader,
    WebGlTexture, WebGlUniformLocation, WebGlVertexArrayObject,
};

// ─── WebGL2 Context wrapper ────────────────────────────────────────────────────

pub struct Gl2Context {
    pub gl: GL,
    pub width: u32,
    pub height: u32,
}

impl Gl2Context {
    /// Obtain a WebGL2 context from an HTML canvas element.
    pub fn from_canvas(canvas: &HtmlCanvasElement) -> Result<Self, String> {
        let width = canvas.width();
        let height = canvas.height();

        // Request WebGL2 with alpha so the canvas can be composited over the page.
        let opts = js_sys::Object::new();
        js_sys::Reflect::set(&opts, &"alpha".into(), &JsValue::TRUE)
            .map_err(|e| format!("reflect set alpha: {e:?}"))?;
        js_sys::Reflect::set(&opts, &"premultipliedAlpha".into(), &JsValue::FALSE)
            .map_err(|e| format!("reflect set premultipliedAlpha: {e:?}"))?;
        js_sys::Reflect::set(&opts, &"antialias".into(), &JsValue::FALSE)
            .map_err(|e| format!("reflect set antialias: {e:?}"))?;

        let gl = canvas
            .get_context_with_context_options("webgl2", &opts)
            .map_err(|e| format!("getContext error: {e:?}"))?
            .ok_or_else(|| "WebGL2 not supported in this browser".to_string())?
            .dyn_into::<GL>()
            .map_err(|_| "cast to WebGl2RenderingContext failed".to_string())?;

        crate::log("portfolio-fx: WebGL2 context created");

        Ok(Self { gl, width, height })
    }

    /// Update the stored dimensions (call when the canvas is resized).
    pub fn resize(&mut self, width: u32, height: u32) {
        self.width = width;
        self.height = height;
        self.gl.viewport(0, 0, width as i32, height as i32);
    }

    /// Clear the canvas to fully-transparent black.
    pub fn clear(&self) {
        self.gl.clear_color(0.0, 0.0, 0.0, 0.0);
        self.gl.clear(GL::COLOR_BUFFER_BIT);
    }

    /// Enable standard alpha blending:
    ///   out.rgb = src.a * src.rgb + (1 − src.a) * dst.rgb
    pub fn enable_alpha_blend(&self) {
        self.gl.enable(GL::BLEND);
        self.gl.blend_equation(GL::FUNC_ADD);
        self.gl.blend_func_separate(
            GL::SRC_ALPHA,
            GL::ONE_MINUS_SRC_ALPHA,
            GL::ONE,
            GL::ONE_MINUS_SRC_ALPHA,
        );
    }

    /// Enable additive blending (good for glow / particle effects):
    ///   out.rgb = src.a * src.rgb + dst.rgb
    pub fn enable_additive_blend(&self) {
        self.gl.enable(GL::BLEND);
        self.gl.blend_equation(GL::FUNC_ADD);
        self.gl
            .blend_func_separate(GL::SRC_ALPHA, GL::ONE, GL::ONE, GL::ONE);
    }
}

// ─── Shader helpers ────────────────────────────────────────────────────────────

/// Compile a GLSL ES 3.0 vertex + fragment shader pair into a linked program.
/// Returns an error string if compilation or linking fails.
pub fn compile_program(gl: &GL, vert_src: &str, frag_src: &str) -> Result<WebGlProgram, String> {
    let vert = compile_shader(gl, GL::VERTEX_SHADER, vert_src)?;
    let frag = compile_shader(gl, GL::FRAGMENT_SHADER, frag_src)?;

    let program = gl
        .create_program()
        .ok_or_else(|| "gl.create_program() returned None".to_string())?;

    gl.attach_shader(&program, &vert);
    gl.attach_shader(&program, &frag);
    gl.link_program(&program);

    gl.delete_shader(Some(&vert));
    gl.delete_shader(Some(&frag));

    let ok = gl
        .get_program_parameter(&program, GL::LINK_STATUS)
        .as_bool()
        .unwrap_or(false);

    if ok {
        Ok(program)
    } else {
        let log = gl
            .get_program_info_log(&program)
            .unwrap_or_else(|| "(no info log)".to_string());
        gl.delete_program(Some(&program));
        Err(format!("Program link failed: {log}"))
    }
}

fn compile_shader(gl: &GL, shader_type: u32, src: &str) -> Result<WebGlShader, String> {
    let shader = gl
        .create_shader(shader_type)
        .ok_or_else(|| "gl.create_shader() returned None".to_string())?;

    gl.shader_source(&shader, src);
    gl.compile_shader(&shader);

    let ok = gl
        .get_shader_parameter(&shader, GL::COMPILE_STATUS)
        .as_bool()
        .unwrap_or(false);

    if ok {
        Ok(shader)
    } else {
        let log = gl
            .get_shader_info_log(&shader)
            .unwrap_or_else(|| "(no info log)".to_string());
        gl.delete_shader(Some(&shader));
        let type_name = if shader_type == GL::VERTEX_SHADER {
            "vertex"
        } else {
            "fragment"
        };
        Err(format!("{type_name} shader compile failed: {log}"))
    }
}

// ─── Buffer helpers ────────────────────────────────────────────────────────────

/// Create a `GL::ARRAY_BUFFER` and upload `data` as STATIC_DRAW.
pub fn create_static_f32_buffer(gl: &GL, data: &[f32]) -> Result<WebGlBuffer, String> {
    let buf = gl
        .create_buffer()
        .ok_or_else(|| "gl.create_buffer() failed".to_string())?;
    gl.bind_buffer(GL::ARRAY_BUFFER, Some(&buf));
    let js_arr = js_sys::Float32Array::from(data);
    gl.buffer_data_with_array_buffer_view(GL::ARRAY_BUFFER, &js_arr, GL::STATIC_DRAW);
    gl.bind_buffer(GL::ARRAY_BUFFER, None);
    Ok(buf)
}

/// Create an empty `GL::ARRAY_BUFFER` with `size_bytes` reserved as DYNAMIC_DRAW.
pub fn create_dynamic_buffer(gl: &GL, size_bytes: usize) -> Result<WebGlBuffer, String> {
    let buf = gl
        .create_buffer()
        .ok_or_else(|| "gl.create_buffer() failed".to_string())?;
    gl.bind_buffer(GL::ARRAY_BUFFER, Some(&buf));
    gl.buffer_data_with_i32(GL::ARRAY_BUFFER, size_bytes as i32, GL::DYNAMIC_DRAW);
    gl.bind_buffer(GL::ARRAY_BUFFER, None);
    Ok(buf)
}

/// Upload `data` into an existing ARRAY_BUFFER (which must already be bound
/// or will be bound by this function).
pub fn upload_f32_buffer(gl: &GL, buf: &WebGlBuffer, data: &[f32]) {
    gl.bind_buffer(GL::ARRAY_BUFFER, Some(buf));
    let js_arr = js_sys::Float32Array::from(data);
    gl.buffer_sub_data_with_i32_and_array_buffer_view(GL::ARRAY_BUFFER, 0, &js_arr);
    gl.bind_buffer(GL::ARRAY_BUFFER, None);
}

// ─── Vertex attribute helpers ──────────────────────────────────────────────────

/// Thin descriptor for a single vertex attribute.
pub struct AttribDesc {
    pub name: &'static str,
    /// Number of f32 components (1, 2, 3, or 4).
    pub size: i32,
    /// Total number of f32 values in one vertex / instance.
    pub stride: i32,
    /// Offset within one vertex / instance in f32 units.
    pub offset: i32,
    /// 0 = per-vertex, 1 = per-instance
    pub divisor: u32,
}

/// Bind a buffer and configure a list of vertex attributes for a program.
pub fn setup_attribs(gl: &GL, program: &WebGlProgram, buf: &WebGlBuffer, attrs: &[AttribDesc]) {
    gl.bind_buffer(GL::ARRAY_BUFFER, Some(buf));
    for attr in attrs {
        let loc = gl.get_attrib_location(program, attr.name);
        if loc < 0 {
            // Attribute unused / optimised away – silently skip.
            continue;
        }
        let loc = loc as u32;
        gl.enable_vertex_attrib_array(loc);
        gl.vertex_attrib_pointer_with_i32(
            loc,
            attr.size,
            GL::FLOAT,
            false,
            attr.stride * 4, // stride in bytes
            attr.offset * 4, // offset in bytes
        );
        if attr.divisor > 0 {
            gl.vertex_attrib_divisor(loc, attr.divisor);
        }
    }
}

// ─── Texture helpers ───────────────────────────────────────────────────────────

/// Upload an RGBA `ImageData` object (from Canvas 2D) as a WebGL texture.
pub fn upload_image_data_texture(
    gl: &GL,
    image_data: &web_sys::ImageData,
) -> Result<WebGlTexture, String> {
    let tex = gl
        .create_texture()
        .ok_or_else(|| "gl.create_texture() failed".to_string())?;
    gl.bind_texture(GL::TEXTURE_2D, Some(&tex));

    gl.tex_parameteri(GL::TEXTURE_2D, GL::TEXTURE_WRAP_S, GL::CLAMP_TO_EDGE as i32);
    gl.tex_parameteri(GL::TEXTURE_2D, GL::TEXTURE_WRAP_T, GL::CLAMP_TO_EDGE as i32);
    gl.tex_parameteri(GL::TEXTURE_2D, GL::TEXTURE_MIN_FILTER, GL::LINEAR as i32);
    gl.tex_parameteri(GL::TEXTURE_2D, GL::TEXTURE_MAG_FILTER, GL::LINEAR as i32);

    gl.tex_image_2d_with_u32_and_u32_and_image_data(
        GL::TEXTURE_2D,
        0,
        GL::RGBA as i32,
        GL::RGBA,
        GL::UNSIGNED_BYTE,
        image_data,
    )
    .map_err(|e| format!("texImage2D failed: {e:?}"))?;

    gl.bind_texture(GL::TEXTURE_2D, None);
    Ok(tex)
}

/// Upload an `<img>` element as a WebGL texture via a hidden Canvas 2D.
pub fn upload_html_image_texture(
    gl: &GL,
    image: &web_sys::HtmlImageElement,
) -> Result<WebGlTexture, String> {
    let img_w = image.natural_width();
    let img_h = image.natural_height();
    if img_w == 0 || img_h == 0 {
        return Err("Image not yet loaded or has zero dimensions".to_string());
    }

    // Draw the image onto a temporary Canvas 2D to get ImageData.
    let document = web_sys::window().unwrap().document().ok_or("no document")?;

    let tmp_canvas: HtmlCanvasElement = document
        .create_element("canvas")
        .map_err(|e| format!("{e:?}"))?
        .dyn_into()
        .map_err(|_| "cast to HtmlCanvasElement failed")?;
    tmp_canvas.set_width(img_w);
    tmp_canvas.set_height(img_h);

    let ctx2d = tmp_canvas
        .get_context("2d")
        .map_err(|e| format!("{e:?}"))?
        .ok_or("no 2d context")?
        .dyn_into::<web_sys::CanvasRenderingContext2d>()
        .map_err(|_| "cast to CanvasRenderingContext2d failed")?;

    ctx2d
        .draw_image_with_html_image_element(image, 0.0, 0.0)
        .map_err(|e| format!("drawImage failed: {e:?}"))?;

    let image_data = ctx2d
        .get_image_data(0.0, 0.0, img_w as f64, img_h as f64)
        .map_err(|e| format!("getImageData failed: {e:?}"))?;

    upload_image_data_texture(gl, &image_data)
}

/// Upload a raw canvas element as a WebGL texture (for the glyph atlas).
pub fn upload_canvas_texture(gl: &GL, canvas: &HtmlCanvasElement) -> Result<WebGlTexture, String> {
    let tex = gl
        .create_texture()
        .ok_or_else(|| "gl.create_texture() failed".to_string())?;
    gl.bind_texture(GL::TEXTURE_2D, Some(&tex));

    gl.tex_parameteri(GL::TEXTURE_2D, GL::TEXTURE_WRAP_S, GL::CLAMP_TO_EDGE as i32);
    gl.tex_parameteri(GL::TEXTURE_2D, GL::TEXTURE_WRAP_T, GL::CLAMP_TO_EDGE as i32);
    gl.tex_parameteri(GL::TEXTURE_2D, GL::TEXTURE_MIN_FILTER, GL::LINEAR as i32);
    gl.tex_parameteri(GL::TEXTURE_2D, GL::TEXTURE_MAG_FILTER, GL::LINEAR as i32);

    gl.tex_image_2d_with_u32_and_u32_and_html_canvas_element(
        GL::TEXTURE_2D,
        0,
        GL::RGBA as i32,
        GL::RGBA,
        GL::UNSIGNED_BYTE,
        canvas,
    )
    .map_err(|e| format!("texImage2D (canvas) failed: {e:?}"))?;

    gl.bind_texture(GL::TEXTURE_2D, None);
    Ok(tex)
}

// ─── Uniform setters ───────────────────────────────────────────────────────────

pub fn uniform1f(gl: &GL, program: &WebGlProgram, name: &str, v: f32) {
    let loc = gl.get_uniform_location(program, name);
    gl.uniform1f(loc.as_ref(), v);
}

pub fn uniform2f(gl: &GL, program: &WebGlProgram, name: &str, x: f32, y: f32) {
    let loc = gl.get_uniform_location(program, name);
    gl.uniform2f(loc.as_ref(), x, y);
}

pub fn uniform3f(gl: &GL, program: &WebGlProgram, name: &str, x: f32, y: f32, z: f32) {
    let loc = gl.get_uniform_location(program, name);
    gl.uniform3f(loc.as_ref(), x, y, z);
}

pub fn uniform4f(gl: &GL, program: &WebGlProgram, name: &str, x: f32, y: f32, z: f32, w: f32) {
    let loc = gl.get_uniform_location(program, name);
    gl.uniform4f(loc.as_ref(), x, y, z, w);
}

pub fn uniform1i(gl: &GL, program: &WebGlProgram, name: &str, v: i32) {
    let loc = gl.get_uniform_location(program, name);
    gl.uniform1i(loc.as_ref(), v);
}

// ─── Standard full-screen quad ─────────────────────────────────────────────────

/// Six vertices (two triangles) covering the entire clip-space [-1,1]×[-1,1].
/// Each vertex: [clip_x, clip_y, u, v]
#[rustfmt::skip]
pub const QUAD_VERTS: &[f32] = &[
    -1.0,  1.0,   0.0, 0.0,
    -1.0, -1.0,   0.0, 1.0,
     1.0, -1.0,   1.0, 1.0,

    -1.0,  1.0,   0.0, 0.0,
     1.0, -1.0,   1.0, 1.0,
     1.0,  1.0,   1.0, 0.0,
];

/// Build and return a static GL buffer containing the full-screen quad.
pub fn create_quad_buffer(gl: &GL) -> Result<WebGlBuffer, String> {
    create_static_f32_buffer(gl, QUAD_VERTS)
}
