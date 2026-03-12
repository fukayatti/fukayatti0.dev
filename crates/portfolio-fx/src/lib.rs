//! portfolio-fx — GPU visual effects compiled to WASM via wgpu
//!
//! Entry point for wasm-bindgen. Exports all effect renderers to JavaScript.

use wasm_bindgen::prelude::*;

mod renderer;
mod effects;

// Re-export all effect renderers so they are accessible from JS
pub use effects::matrix_rain::MatrixRainRenderer;
pub use effects::particles::ParticleRenderer;
pub use effects::rgb_split::RgbSplitRenderer;
pub use effects::gradient_orb::GradientOrbRenderer;

/// Called once when the WASM module is first loaded.
/// Sets up panic hook for better error messages in the browser console.
#[wasm_bindgen(start)]
pub fn wasm_init() {
    #[cfg(feature = "console_error_panic_hook")]
    console_error_panic_hook::set_once();

    log("portfolio-fx WASM initialized");
}

/// Thin wrapper around `web_sys::console::log_1` for internal use.
pub(crate) fn log(msg: &str) {
    web_sys::console::log_1(&JsValue::from_str(msg));
}

/// Thin wrapper around `web_sys::console::warn_1`.
#[allow(dead_code)]
pub(crate) fn warn(msg: &str) {
    web_sys::console::warn_1(&JsValue::from_str(msg));
}

/// Thin wrapper around `web_sys::console::error_1`.
#[allow(dead_code)]
pub(crate) fn error(msg: &str) {
    web_sys::console::error_1(&JsValue::from_str(msg));
}

/// Returns the current time in milliseconds from `performance.now()`.
pub(crate) fn now_ms() -> f64 {
    js_sys::Date::now()
}

/// Utility: convert an f64 millisecond timestamp to seconds as f32.
#[allow(dead_code)]
pub(crate) fn ms_to_secs(ms: f64) -> f32 {
    (ms / 1000.0) as f32
}
