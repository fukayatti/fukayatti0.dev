// Matrix Rain - Compute Shader
// Updates all column states in parallel on the GPU

struct Column {
    y: f32,
    speed: f32,
    char_count: u32,
    char_offset: u32,
}

struct Params {
    column_count: u32,
    screen_width: f32,
    screen_height: f32,
    font_size: f32,
    delta_time: f32,
    time: f32,
    frame: u32,
    _pad: u32,
}

@group(0) @binding(0) var<storage, read_write> columns: array<Column>;
@group(0) @binding(1) var<storage, read_write> char_buffer: array<u32>;
@group(0) @binding(2) var<uniform> params: Params;

// PCG hash for fast GPU-side random numbers
fn pcg(v: u32) -> u32 {
    var state = v * 747796405u + 2891336453u;
    var word = ((state >> ((state >> 28u) + 4u)) ^ state) * 277803737u;
    return (word >> 22u) ^ word;
}

fn rand_f32(seed: u32) -> f32 {
    return f32(pcg(seed)) / f32(0xffffffffu);
}

fn rand_char(seed: u32) -> u32 {
    // Katakana range U+30A0–U+30FF (96 chars) + digits + latin
    // We encode as index 0..159
    let r = pcg(seed) % 160u;
    return r;
}

@compute @workgroup_size(64)
fn update_columns(@builtin(global_invocation_id) id: vec3<u32>) {
    let i = id.x;
    if i >= params.column_count {
        return;
    }

    var col = columns[i];

    // Advance column downward
    col.y += col.speed * params.delta_time * 60.0;

    // Reset when column falls off screen
    if col.y > params.screen_height + f32(col.char_count) * params.font_size {
        col.y = -f32(col.char_count) * params.font_size;
        // Randomize speed in [1.0, 3.5]
        col.speed = 1.0 + rand_f32(pcg(i + params.frame * 1000u)) * 2.5;

        // Re-randomize all chars in this column
        for (var c = 0u; c < col.char_count; c++) {
            let seed = pcg(i * 997u + c * 31u + params.frame);
            char_buffer[col.char_offset + c] = rand_char(seed);
        }
    }

    // Occasionally flicker a random character (~2% chance per frame per column)
    let flicker_seed = pcg(i * 1234u + params.frame * 5678u);
    if rand_f32(flicker_seed) > 0.98 {
        let char_idx = pcg(flicker_seed + 1u) % col.char_count;
        char_buffer[col.char_offset + char_idx] = rand_char(pcg(flicker_seed + 2u));
    }

    columns[i] = col;
}
