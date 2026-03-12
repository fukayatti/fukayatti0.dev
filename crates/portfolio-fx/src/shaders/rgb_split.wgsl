// RGB Split / Distortion / Glitch - Vertex & Fragment Shader
// Used for: DistortedProfile (Hero), DistortedImage (About), GlitchImage (Projects)
// Supports mouse-tracked RGB chromatic aberration, CRT scanlines, warp distortion

struct VertexInput {
    @location(0) position: vec2<f32>,
    @location(1) tex_coord: vec2<f32>,
}

struct VertexOutput {
    @builtin(position) clip_position: vec4<f32>,
    @location(0) uv: vec2<f32>,
}

struct RgbParams {
    // Mouse UV position [0,1] – centre = (0.5, 0.5)
    mouse_uv:       vec2<f32>,
    // How strong the RGB split is (0 = none, 1 = full)
    split_intensity: f32,
    // 0 = grayscale, 1 = full color
    color_strength:  f32,
    // Elapsed time in seconds (for animated effects)
    time:            f32,
    // 0 = idle/hover-off, 1 = fully active (glitch mode)
    glitch_amount:   f32,
    // Overall opacity
    opacity:         f32,
    // Effect mode: 0 = distorted_profile, 1 = distorted_image, 2 = glitch_image
    mode:            f32,
    // Screen / element dimensions (pixels) for scanline scale
    width:           f32,
    height:          f32,
}

@group(0) @binding(0) var<uniform> params: RgbParams;
@group(1) @binding(0) var t_image:  texture_2d<f32>;
@group(1) @binding(1) var s_image:  sampler;

// ─── Utilities ────────────────────────────────────────────────────────────────

// PCG hash – fast GPU random
fn pcg(v: u32) -> u32 {
    var state = v * 747796405u + 2891336453u;
    var word  = ((state >> ((state >> 28u) + 4u)) ^ state) * 277803737u;
    return (word >> 22u) ^ word;
}

fn rand_f32(seed: u32) -> f32 {
    return f32(pcg(seed)) / f32(0xffffffffu);
}

// Hash-based noise for glitch slicing
fn hash21(p: vec2<f32>) -> f32 {
    var p2 = fract(p * vec2<f32>(127.1, 311.7));
    p2 += dot(p2, p2.yx + 19.19);
    return fract((p2.x + p2.y) * p2.x);
}

// Smooth noise
fn noise(p: vec2<f32>) -> f32 {
    let i = floor(p);
    let f = fract(p);
    let u = f * f * (3.0 - 2.0 * f);
    return mix(
        mix(hash21(i + vec2(0.0, 0.0)), hash21(i + vec2(1.0, 0.0)), u.x),
        mix(hash21(i + vec2(0.0, 1.0)), hash21(i + vec2(1.0, 1.0)), u.x),
        u.y
    );
}

// ─── Vertex ───────────────────────────────────────────────────────────────────

@vertex
fn vs_main(in: VertexInput) -> VertexOutput {
    var out: VertexOutput;
    out.clip_position = vec4<f32>(in.position, 0.0, 1.0);
    out.uv = in.tex_coord;
    return out;
}

// ─── Shared sub-routines ──────────────────────────────────────────────────────

// Compute the per-channel UV offsets driven by mouse position
fn rgb_offsets(uv: vec2<f32>) -> vec3<vec2<f32>> {
    let centre_offset = params.mouse_uv - vec2<f32>(0.5);
    let intensity = params.split_intensity * 0.035;

    // Red channel: shift toward mouse
    let r_offset = centre_offset * intensity;
    // Blue channel: shift away from mouse
    let b_offset = -centre_offset * intensity;

    return vec3<vec2<f32>>(r_offset, vec2<f32>(0.0), b_offset);
}

// CRT scanline darkening
fn scanlines(uv: vec2<f32>) -> f32 {
    // One scanline every 4 pixels
    let line_freq = params.height / 4.0;
    let sl = sin(uv.y * line_freq * 3.14159);
    // Darken every other pair of rows by ~30 %
    return 0.85 + 0.15 * sl * sl;
}

// Horizontal scan-beam that sweeps top→bottom periodically
fn scan_beam(uv: vec2<f32>) -> f32 {
    let beam_y  = fract(params.time * 0.33);   // full sweep every 3 s
    let dist    = abs(uv.y - beam_y);
    return 1.0 + 0.18 * exp(-dist * 60.0);    // adds a faint bright line
}

// Vignette darkening toward edges
fn vignette(uv: vec2<f32>) -> f32 {
    let p = uv * 2.0 - 1.0;
    return 1.0 - dot(p * vec2<f32>(0.55, 0.45), p * vec2<f32>(0.55, 0.45));
}

// Warp UV with mouse-driven lens distortion (mode 0 & 1)
fn warp_uv(uv: vec2<f32>) -> vec2<f32> {
    let strength = params.split_intensity * 0.018;
    let offset   = (params.mouse_uv - vec2<f32>(0.5)) * strength;
    // Barrel-like warp: push UV away from mouse
    let from_centre = uv - vec2<f32>(0.5);
    let warped = uv + from_centre * dot(from_centre, from_centre) * strength * 4.0;
    return warped + offset;
}

// ─── Mode 0: DistortedProfile (Hero section) ─────────────────────────────────
// Smooth RGB split that follows the mouse, grayscale base with color on hover

fn mode_distorted_profile(uv: vec2<f32>) -> vec4<f32> {
    let warped = warp_uv(uv);
    let offs   = rgb_offsets(warped);

    let r  = textureSample(t_image, s_image, clamp(warped + offs[0], vec2(0.0), vec2(1.0))).r;
    let g  = textureSample(t_image, s_image, clamp(warped,            vec2(0.0), vec2(1.0))).g;
    let b  = textureSample(t_image, s_image, clamp(warped + offs[2],  vec2(0.0), vec2(1.0))).b;

    let color_rgb = vec3<f32>(r, g, b);
    let gray      = dot(color_rgb, vec3<f32>(0.299, 0.587, 0.114));
    let final_rgb = mix(vec3<f32>(gray), color_rgb, params.color_strength);

    let sl  = scanlines(uv);
    let sb  = scan_beam(uv);
    let vig = clamp(vignette(uv), 0.0, 1.0);

    return vec4<f32>(final_rgb * sl * sb * vig, params.opacity);
}

// ─── Mode 1: DistortedImage (About section) ──────────────────────────────────
// Same as profile but with a stronger warp and tighter glow on hover

fn mode_distorted_image(uv: vec2<f32>) -> vec4<f32> {
    let warped = warp_uv(uv);
    let offs   = rgb_offsets(warped);

    // Stronger split in this mode
    let scale = 1.4;
    let r  = textureSample(t_image, s_image, clamp(warped + offs[0] * scale, vec2(0.0), vec2(1.0))).r;
    let g  = textureSample(t_image, s_image, clamp(warped,                   vec2(0.0), vec2(1.0))).g;
    let b  = textureSample(t_image, s_image, clamp(warped + offs[2] * scale, vec2(0.0), vec2(1.0))).b;

    let color_rgb = vec3<f32>(r, g, b);
    let gray      = dot(color_rgb, vec3<f32>(0.299, 0.587, 0.114));
    let final_rgb = mix(vec3<f32>(gray), color_rgb, params.color_strength);

    let sl  = scanlines(uv);
    let sb  = scan_beam(uv);
    let vig = clamp(vignette(uv), 0.1, 1.0);

    // Cyan tint on fully hovered image
    let hover_tint = vec3<f32>(0.0, 0.06, 0.08) * params.glitch_amount;

    return vec4<f32>((final_rgb + hover_tint) * sl * sb * vig, params.opacity);
}

// ─── Mode 2: GlitchImage (Projects section – hover trigger) ──────────────────
// Aggressive horizontal band slicing with random offsets driven by time

fn mode_glitch_image(uv: vec2<f32>) -> vec4<f32> {
    var displaced_uv = uv;

    // -- Glitch band slicing --
    // Divide the image into coarse horizontal bands;
    // some bands get a random horizontal shift when glitching.
    let band_count = 24.0;
    let band_y     = floor(uv.y * band_count) / band_count;

    // Time-varying seed so bands flicker unpredictably
    let time_step  = floor(params.time * 18.0);
    let band_seed  = band_y * 1973.5 + time_step * 37.1;
    let band_rand  = hash21(vec2<f32>(band_seed, band_seed * 0.31));

    // Only shift a portion of the bands (controlled by glitch_amount)
    let threshold  = 1.0 - params.glitch_amount * 0.7;
    if band_rand > threshold {
        // How far to shift this band (up to ±8 % of width)
        let shift_x = (band_rand - threshold) / (1.0 - threshold) * 0.08;
        let dir     = select(-1.0, 1.0, band_rand > 0.5 + threshold * 0.5);
        displaced_uv.x += shift_x * dir * params.glitch_amount;
    }

    // -- Fine-grained noise warp --
    let warp_strength = params.glitch_amount * 0.006;
    let ntime         = params.time * 6.0;
    displaced_uv.x   += (noise(vec2<f32>(uv.y * 40.0, ntime))       - 0.5) * warp_strength;
    displaced_uv.y   += (noise(vec2<f32>(uv.x * 40.0, ntime + 3.7)) - 0.5) * warp_strength * 0.4;

    displaced_uv = clamp(displaced_uv, vec2<f32>(0.0), vec2<f32>(1.0));

    // -- RGB split (larger during glitch) --
    let split = params.split_intensity * params.glitch_amount * 0.06;
    let r = textureSample(t_image, s_image, clamp(displaced_uv + vec2<f32>( split,  0.0), vec2(0.0), vec2(1.0))).r;
    let g = textureSample(t_image, s_image, displaced_uv).g;
    let b = textureSample(t_image, s_image, clamp(displaced_uv + vec2<f32>(-split,  0.0), vec2(0.0), vec2(1.0))).b;

    let color_rgb = vec3<f32>(r, g, b);
    let gray      = dot(color_rgb, vec3<f32>(0.299, 0.587, 0.114));
    // Hover → color pops in
    let final_rgb = mix(vec3<f32>(gray), color_rgb, params.color_strength);

    // -- Scale effect (zoom in slightly on hover) --
    // Not done at shader level (handled by CSS transform on canvas element),
    // but we brighten slightly to simulate it.
    let brightness_boost = 1.0 + params.glitch_amount * 0.08;

    // CRT scanlines (lighter in this mode)
    let sl = 0.92 + 0.08 * scanlines(uv);
    let sb = scan_beam(uv);

    // Vignette
    let vig = clamp(vignette(uv), 0.15, 1.0);

    // Digital noise overlay during glitch
    let noise_seed = u32(uv.x * 512.0) * 1301u + u32(uv.y * 512.0) * 797u + u32(time_step) * 31337u;
    let dig_noise  = rand_f32(noise_seed);
    let noise_overlay = (dig_noise - 0.5) * 0.06 * params.glitch_amount;

    let out_rgb = clamp(final_rgb * brightness_boost * sl * sb * vig + noise_overlay, vec3(0.0), vec3(1.0));

    // -- Cyan accent tint at peak glitch --
    let cyan_tint = vec3<f32>(0.0, 1.0, 0.9) * max(0.0, params.glitch_amount - 0.7) * 0.15;

    return vec4<f32>(out_rgb + cyan_tint, params.opacity);
}

// ─── Dispatch ─────────────────────────────────────────────────────────────────

@fragment
fn fs_main(in: VertexOutput) -> @location(0) vec4<f32> {
    let mode = i32(round(params.mode));
    switch mode {
        case 0: { return mode_distorted_profile(in.uv); }
        case 1: { return mode_distorted_image(in.uv);   }
        case 2: { return mode_glitch_image(in.uv);      }
        default: { return mode_distorted_profile(in.uv); }
    }
}
