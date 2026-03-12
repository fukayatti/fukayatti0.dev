// Particle System - Vertex & Fragment Shader
// Handles both CyberGrid floating particles and ParticleBackground
// Each particle is rendered as a billboard quad with soft glow

struct VertexInput {
    @location(0) position: vec2<f32>,  // quad corner [-1,1]
    @location(1) tex_coord: vec2<f32>, // UV [0,1]
}

struct ParticleInstance {
    @location(2) world_pos: vec2<f32>,  // pixel position
    @location(3) size: f32,             // radius in pixels
    @location(4) alpha: f32,            // base opacity
    @location(5) color: vec4<f32>,      // RGBA color
}

struct VertexOutput {
    @builtin(position) clip_position: vec4<f32>,
    @location(0) uv: vec2<f32>,
    @location(1) alpha: f32,
    @location(2) color: vec4<f32>,
}

struct Params {
    screen_width:  f32,
    screen_height: f32,
    time:          f32,
    _pad:          f32,
}

@group(0) @binding(0) var<uniform> params: Params;

@vertex
fn vs_main(vert: VertexInput, inst: ParticleInstance) -> VertexOutput {
    var out: VertexOutput;

    // Expand the unit quad by the particle size around its world position
    let px = inst.world_pos.x + vert.position.x * inst.size;
    let py = inst.world_pos.y + vert.position.y * inst.size;

    // Pixel → clip space
    let cx = (px / params.screen_width)  * 2.0 - 1.0;
    let cy = 1.0 - (py / params.screen_height) * 2.0;

    out.clip_position = vec4<f32>(cx, cy, 0.0, 1.0);
    out.uv    = vert.tex_coord;
    out.alpha = inst.alpha;
    out.color = inst.color;

    return out;
}

@fragment
fn fs_main(in: VertexOutput) -> @location(0) vec4<f32> {
    // Signed distance from centre of the billboard quad
    let p = in.uv * 2.0 - 1.0;   // [-1, 1]
    let dist = length(p);

    // Smooth circular mask
    let mask = 1.0 - smoothstep(0.6, 1.0, dist);

    // Soft inner glow – brighter at centre
    let glow = exp(-dist * dist * 3.5) * 0.8;

    let total_alpha = (mask + glow) * in.alpha;

    // Slight pulse with time so particles feel alive
    let pulse = 0.88 + 0.12 * sin(params.time * 2.3 + in.uv.x * 6.28);

    return vec4<f32>(in.color.rgb, clamp(total_alpha * pulse, 0.0, 1.0));
}

// ─── Connection lines (separate pipeline, no instancing) ──────────────────────
// Rendered as thin line segments between nearby particles.
// The CPU uploads a buffer of line-pair endpoints each frame.

struct LineVertex {
    @location(0) position: vec2<f32>,
    @location(1) line_alpha: f32,
    @location(2) color: vec4<f32>,
}

struct LineVertexOutput {
    @builtin(position) clip_position: vec4<f32>,
    @location(0) alpha: f32,
    @location(1) color: vec4<f32>,
}

struct LineParams {
    screen_width:  f32,
    screen_height: f32,
    time:          f32,
    _pad:          f32,
}

@group(0) @binding(0) var<uniform> line_params: LineParams;

@vertex
fn vs_line(v: LineVertex) -> LineVertexOutput {
    var out: LineVertexOutput;

    let cx = (v.position.x / line_params.screen_width)  * 2.0 - 1.0;
    let cy = 1.0 - (v.position.y / line_params.screen_height) * 2.0;

    out.clip_position = vec4<f32>(cx, cy, 0.0, 1.0);
    out.alpha = v.line_alpha;
    out.color = v.color;

    return out;
}

@fragment
fn fs_line(in: LineVertexOutput) -> @location(0) vec4<f32> {
    // Slight flicker on lines to make the network feel organic
    let flicker = 0.9 + 0.1 * sin(line_params.time * 4.1);
    return vec4<f32>(in.color.rgb, clamp(in.alpha * flicker, 0.0, 1.0));
}
