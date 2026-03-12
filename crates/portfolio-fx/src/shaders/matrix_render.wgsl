// Matrix Rain - Render Shader
// Renders each character glyph as a quad with green gradient glow

struct VertexInput {
    @location(0) position: vec2<f32>,  // quad corner [-1,1]
    @location(1) tex_coord: vec2<f32>, // UV [0,1]
}

struct InstanceInput {
    @location(2) col_x: f32,        // pixel x of this column
    @location(3) char_world_y: f32, // pixel y of this character in the column
    @location(4) char_index: u32,   // glyph index in atlas
    @location(5) col_y_head: f32,   // y of the column head (last char)
    @location(6) col_length: u32,   // number of chars in this column
    @location(7) char_pos: u32,     // position of this char within the column (0 = top)
}

struct VertexOutput {
    @builtin(position) clip_position: vec4<f32>,
    @location(0) uv: vec2<f32>,
    @location(1) brightness: f32,
    @location(2) is_head: f32,
    @location(3) glyph_uv_offset: vec2<f32>,
}

struct Params {
    screen_width: f32,
    screen_height: f32,
    font_size: f32,
    atlas_cols: f32,  // number of glyph columns in the atlas texture
    atlas_rows: f32,  // number of glyph rows in the atlas texture
    time: f32,
    _pad0: f32,
    _pad1: f32,
}

@group(0) @binding(0) var<uniform> params: Params;
@group(1) @binding(0) var t_atlas: texture_2d<f32>;
@group(1) @binding(1) var s_atlas: sampler;

@vertex
fn vs_main(vert: VertexInput, inst: InstanceInput) -> VertexOutput {
    var out: VertexOutput;

    let fs = params.font_size;

    // Position this quad in pixel space
    let pixel_x = inst.col_x + (vert.position.x * 0.5 + 0.5) * fs;
    let pixel_y = inst.char_world_y + (vert.position.y * -0.5 + 0.5) * fs;

    // Convert to clip space [-1, 1]
    let cx = (pixel_x / params.screen_width) * 2.0 - 1.0;
    let cy = 1.0 - (pixel_y / params.screen_height) * 2.0;
    out.clip_position = vec4<f32>(cx, cy, 0.0, 1.0);

    out.uv = vert.tex_coord;

    // Brightness: head chars are brightest, fade toward top of column
    let pos_f = f32(inst.char_pos);
    let len_f = f32(inst.col_length);
    let t = pos_f / max(len_f - 1.0, 1.0);  // 0 = column top, 1 = head

    // Non-linear brightness curve – most of the column is dim, tip is bright
    out.brightness = pow(t, 2.0) * 0.7 + 0.05;

    // The very last character in the column is the glowing head
    out.is_head = select(0.0, 1.0, inst.char_pos == inst.col_length - 1u);

    // Second-to-last chars are near-head (bright green)
    let near_head = select(0.0, 1.0, inst.char_pos >= inst.col_length - 4u);
    out.brightness = mix(out.brightness, 0.85, near_head * 0.6);

    // UV into the glyph atlas
    let atlas_col = f32(inst.char_index % u32(params.atlas_cols));
    let atlas_row = f32(inst.char_index / u32(params.atlas_cols));
    let glyph_w = 1.0 / params.atlas_cols;
    let glyph_h = 1.0 / params.atlas_rows;
    out.glyph_uv_offset = vec2<f32>(
        atlas_col * glyph_w,
        atlas_row * glyph_h,
    );

    // Pass cell size fractions for the fragment to sample correctly
    // (reuse _pad fields conceptually – stored in glyph_uv_offset z/w via out.uv trick)
    out.uv = vec2<f32>(
        atlas_col * glyph_w + vert.tex_coord.x * glyph_w,
        atlas_row * glyph_h + vert.tex_coord.y * glyph_h,
    );

    return out;
}

@fragment
fn fs_main(in: VertexOutput) -> @location(0) vec4<f32> {
    // Sample the glyph from the atlas (single-channel alpha mask)
    let alpha_mask = textureSample(t_atlas, s_atlas, in.uv).r;

    // Head character: white with green glow
    let head_color  = vec3<f32>(1.0, 1.0, 1.0);
    // Near-head characters: bright green
    let near_color  = vec3<f32>(0.0, 1.0, 0.2);
    // Body characters: dark green
    let body_color  = vec3<f32>(0.0, 0.6, 0.05);

    // Blend based on brightness
    var color: vec3<f32>;
    if in.is_head > 0.5 {
        color = head_color;
    } else {
        color = mix(body_color, near_color, clamp((in.brightness - 0.05) / 0.8, 0.0, 1.0));
    }

    // Subtle flicker: modulate alpha slightly with time + position
    let flicker = 0.92 + 0.08 * sin(in.uv.x * 37.3 + params.time * 12.1);

    let final_alpha = alpha_mask * in.brightness * flicker;

    // Add a soft glow halo for the head character
    let glow = select(0.0, (1.0 - alpha_mask) * 0.18 * flicker, in.is_head > 0.5);
    let glow_color = vec3<f32>(0.0, 0.8, 0.1);

    let out_color = color * alpha_mask + glow_color * glow;
    return vec4<f32>(out_color, clamp(final_alpha + glow, 0.0, 1.0));
}
