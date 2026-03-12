// Gradient Orb / Morphing Blob - Vertex & Fragment Shader
// Renders SDF-based organic blob shapes with animated borders and glow.
// Used for: GradientOrb (layout), MorphingBlob (AboutSection)

struct VertexInput {
    @location(0) position:  vec2<f32>,
    @location(1) tex_coord: vec2<f32>,
}

struct VertexOutput {
    @builtin(position) clip_position: vec4<f32>,
    @location(0) uv: vec2<f32>,
}

struct OrbParams {
    // Elapsed time (seconds)
    time:          f32,
    // Opacity / visibility multiplier [0, 1]
    opacity:       f32,
    // Morph speed multiplier (1 = normal)
    morph_speed:   f32,
    // Overall scale of the blob shape relative to the canvas [0, 1]
    shape_scale:   f32,
    // Inner colour  (RGBA, linear)
    color_a:       vec4<f32>,
    // Outer / edge colour (RGBA, linear)
    color_b:       vec4<f32>,
    // Glow colour tint (RGB – alpha ignored)
    glow_color:    vec4<f32>,
    // How strong the outer glow halo is [0, 1]
    glow_strength: f32,
    // Blur softness: higher = softer edge
    edge_softness: f32,
    // 0 = gradient_orb (simple), 1 = morphing_blob (organic)
    mode:          f32,
    _pad:          f32,
}

@group(0) @binding(0) var<uniform> params: OrbParams;

// ─── Vertex ───────────────────────────────────────────────────────────────────

@vertex
fn vs_main(in: VertexInput) -> VertexOutput {
    var out: VertexOutput;
    // Full-screen quad: position is already in clip space [-1, 1]
    out.clip_position = vec4<f32>(in.position, 0.0, 1.0);
    out.uv = in.tex_coord;
    return out;
}

// ─── Utilities ────────────────────────────────────────────────────────────────

// Smooth minimum – blends two SDF values with a given radius k
fn smin(a: f32, b: f32, k: f32) -> f32 {
    let h = max(k - abs(a - b), 0.0) / k;
    return min(a, b) - h * h * k * 0.25;
}

// 2-D rotation matrix
fn rot2(angle: f32) -> mat2x2<f32> {
    let c = cos(angle);
    let s = sin(angle);
    return mat2x2<f32>(vec2<f32>(c, -s), vec2<f32>(s, c));
}

// Band-limited cosine noise – avoids harsh aliasing on the blob contour
fn cos_noise(p: vec2<f32>) -> f32 {
    return cos(p.x) * cos(p.y);
}

// Layered noise used to perturb the blob radius
fn fbm(p: vec2<f32>) -> f32 {
    var v  = 0.0;
    var amp  = 0.5;
    var freq = 1.0;
    var pp   = p;
    for (var i = 0; i < 4; i++) {
        v   += cos_noise(pp * freq) * amp;
        pp   = pp * rot2(0.37 + f32(i) * 0.11);
        amp  *= 0.5;
        freq *= 2.1;
    }
    return v;
}

// ─── SDF primitives ───────────────────────────────────────────────────────────

// Smooth circle SDF
fn sdf_circle(p: vec2<f32>, r: f32) -> f32 {
    return length(p) - r;
}

// Organic blob SDF: circle perturbed by layered cosine noise
fn sdf_blob(p: vec2<f32>, r: f32, t: f32, speed: f32) -> f32 {
    // Low-frequency primary oscillation
    let angle     = atan2(p.y, p.x);
    let primary   = 0.08 * sin(3.0 * angle + t * speed * 0.7)
                  + 0.06 * sin(5.0 * angle - t * speed * 1.1)
                  + 0.04 * sin(7.0 * angle + t * speed * 0.4);

    // FBM-based surface noise (subtle, high-freq detail)
    let noise_coord = p * 2.5 + vec2<f32>(t * speed * 0.15, t * speed * 0.22);
    let surface     = fbm(noise_coord) * 0.05;

    let perturbed_r = r + primary + surface;
    return length(p) - perturbed_r;
}

// ─── Mode 0: Gradient Orb (simple animated circle) ───────────────────────────

fn mode_gradient_orb(uv: vec2<f32>) -> vec4<f32> {
    // Map UV to centred [-1, 1] space
    let p = (uv - vec2<f32>(0.5)) * 2.0;

    let t  = params.time;
    let r  = params.shape_scale * 0.55;

    // Slow breathing
    let breath = 1.0 + 0.06 * sin(t * 0.9);
    let d      = sdf_circle(p, r * breath);

    // Soft filled circle
    let fill   = smoothstep(params.edge_softness, -params.edge_softness, d);

    // Radial colour gradient from color_a (centre) to color_b (edge)
    let t_grad = clamp(length(p) / (r * breath), 0.0, 1.0);
    let color  = mix(params.color_a.rgb, params.color_b.rgb, t_grad * t_grad);

    // Outer glow halo
    let glow_d   = max(d, 0.0);
    let glow_val = exp(-glow_d * glow_d * 6.0) * params.glow_strength;
    let glow_col = params.glow_color.rgb * glow_val;

    // Subtle animated highlight
    let highlight_pos  = vec2<f32>(sin(t * 0.6) * 0.25, cos(t * 0.4) * 0.20) * r;
    let highlight_dist = length(p - highlight_pos);
    let highlight      = exp(-highlight_dist * highlight_dist * 8.0) * 0.18;

    let out_rgb   = color * fill + glow_col + highlight * fill;
    let out_alpha = clamp((fill + glow_val * 0.4) * params.opacity, 0.0, 1.0);

    return vec4<f32>(out_rgb, out_alpha);
}

// ─── Mode 1: Morphing Blob (organic animated shape) ──────────────────────────

fn mode_morphing_blob(uv: vec2<f32>) -> vec4<f32> {
    let p = (uv - vec2<f32>(0.5)) * 2.0;

    let t     = params.time;
    let speed = params.morph_speed;
    let r     = params.shape_scale * 0.48;

    // Primary blob SDF
    let d0 = sdf_blob(p, r, t, speed);

    // Add a secondary smaller blob that orbits the centre to make the
    // shape feel like it's "breathing" in a more complex way.
    let orbit_angle = t * speed * 0.35;
    let orbit_r     = r * 0.32;
    let orbit_pos   = vec2<f32>(cos(orbit_angle), sin(orbit_angle)) * r * 0.38;
    let d1          = sdf_blob(p - orbit_pos, orbit_r, t, speed * 1.4);

    // Smooth-union of the two blobs
    let d = smin(d0, d1, r * 0.35);

    // Main fill with soft edge
    let fill = smoothstep(params.edge_softness, -params.edge_softness, d);

    // Colour: interpolate along distance from origin
    let len      = length(p);
    let t_grad   = clamp(len / (r * 1.2), 0.0, 1.0);
    let color    = mix(params.color_a.rgb, params.color_b.rgb, pow(t_grad, 1.6));

    // Surface sheen – a moving specular-like highlight
    let sheen_uv   = p * rot2(t * speed * 0.22);
    let sheen      = smoothstep(0.6, 0.0, length(sheen_uv - vec2<f32>(0.15, -0.10))) * 0.22;

    // Outer glow
    let glow_d   = max(d, 0.0);
    let glow_val = exp(-glow_d * glow_d * 5.0) * params.glow_strength;
    let glow_col = params.glow_color.rgb * glow_val;

    // Fringe / edge rim – brighter ring at the silhouette
    let rim_width = params.edge_softness * 3.0;
    let rim       = smoothstep(rim_width, 0.0, abs(d)) * 0.35 * fill;
    let rim_col   = mix(params.color_b.rgb, vec3<f32>(1.0), 0.5) * rim;

    let out_rgb   = color * fill + sheen * fill + glow_col + rim_col;
    let out_alpha = clamp((fill + glow_val * 0.35) * params.opacity, 0.0, 1.0);

    return vec4<f32>(out_rgb, out_alpha);
}

// ─── Dispatch ─────────────────────────────────────────────────────────────────

@fragment
fn fs_main(in: VertexOutput) -> @location(0) vec4<f32> {
    let mode = i32(round(params.mode));
    switch mode {
        case 0:  { return mode_gradient_orb(in.uv);    }
        case 1:  { return mode_morphing_blob(in.uv);   }
        default: { return mode_gradient_orb(in.uv);    }
    }
}
