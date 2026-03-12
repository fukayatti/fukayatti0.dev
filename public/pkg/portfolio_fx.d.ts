/* tslint:disable */
/* eslint-disable */

export class GradientOrbRenderer {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    /**
     * Create a new renderer.
     * `mode_value`: 0 = GradientOrb, 1 = MorphingBlob
     */
    static new(canvas: HTMLCanvasElement, mode_value: number): GradientOrbRenderer;
    /**
     * Notify the renderer that the canvas has been resized.
     */
    resize(width: number, height: number): void;
    /**
     * Set the inner colour from a hex string, e.g. `"#00ffff"`.
     */
    set_color_a(hex: string): void;
    /**
     * Set the outer/edge colour from a hex string.
     */
    set_color_b(hex: string): void;
    set_edge_softness(v: number): void;
    /**
     * Set the glow halo colour from a hex string.
     */
    set_glow_color(hex: string): void;
    set_glow_strength(v: number): void;
    set_morph_speed(v: number): void;
    set_opacity(v: number): void;
    set_shape_scale(v: number): void;
    start(): void;
    stop(): void;
}

export class MatrixRainRenderer {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    /**
     * Create and initialise the renderer for the given canvas.
     */
    static new(canvas: HTMLCanvasElement): MatrixRainRenderer;
    /**
     * Notify on canvas resize.
     */
    resize(width: number, height: number): void;
    /**
     * Start the animation loop.
     */
    start(): void;
    /**
     * Stop the animation loop.
     */
    stop(): void;
}

/**
 * `0` = CyberGrid (upward-drifting dots), `1` = Network (mouse-attracted + lines).
 */
export enum ParticleMode {
    CyberGrid = 0,
    Network = 1,
}

export class ParticleRenderer {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    /**
     * `mode_value`: 0 = CyberGrid, 1 = Network
     */
    static new(canvas: HTMLCanvasElement, mode_value: number): ParticleRenderer;
    resize(width: number, height: number): void;
    set_mouse(x: number, y: number): void;
    start(): void;
    stop(): void;
}

export class RgbSplitRenderer {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    /**
     * Create a new renderer.
     * `mode_value`: 0=DistortedProfile, 1=DistortedImage, 2=GlitchImage
     */
    static new(canvas: HTMLCanvasElement, image: HTMLImageElement, mode_value: number): RgbSplitRenderer;
    /**
     * Draw a single frame immediately (without starting the loop).
     */
    render_once(): void;
    reset_mouse(): void;
    resize(width: number, height: number): void;
    set_color_strength(v: number): void;
    set_glitch_amount(v: number): void;
    set_mouse_uv(x: number, y: number): void;
    set_opacity(v: number): void;
    set_split_intensity(v: number): void;
    start(): void;
    stop(): void;
}

/**
 * Called once when the WASM module is first loaded.
 * Sets up panic hook for better error messages in the browser console.
 */
export function wasm_init(): void;

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
    readonly memory: WebAssembly.Memory;
    readonly __wbg_matrixrainrenderer_free: (a: number, b: number) => void;
    readonly matrixrainrenderer_new: (a: any) => [number, number, number];
    readonly matrixrainrenderer_resize: (a: number, b: number, c: number) => void;
    readonly matrixrainrenderer_start: (a: number) => void;
    readonly matrixrainrenderer_stop: (a: number) => void;
    readonly __wbg_particlerenderer_free: (a: number, b: number) => void;
    readonly particlerenderer_new: (a: any, b: number) => [number, number, number];
    readonly particlerenderer_resize: (a: number, b: number, c: number) => void;
    readonly particlerenderer_set_mouse: (a: number, b: number, c: number) => void;
    readonly particlerenderer_start: (a: number) => void;
    readonly particlerenderer_stop: (a: number) => void;
    readonly __wbg_gradientorbrenderer_free: (a: number, b: number) => void;
    readonly gradientorbrenderer_new: (a: any, b: number) => [number, number, number];
    readonly gradientorbrenderer_resize: (a: number, b: number, c: number) => void;
    readonly gradientorbrenderer_set_color_a: (a: number, b: number, c: number) => void;
    readonly gradientorbrenderer_set_color_b: (a: number, b: number, c: number) => void;
    readonly gradientorbrenderer_set_edge_softness: (a: number, b: number) => void;
    readonly gradientorbrenderer_set_glow_color: (a: number, b: number, c: number) => void;
    readonly gradientorbrenderer_set_glow_strength: (a: number, b: number) => void;
    readonly gradientorbrenderer_set_morph_speed: (a: number, b: number) => void;
    readonly gradientorbrenderer_set_opacity: (a: number, b: number) => void;
    readonly gradientorbrenderer_set_shape_scale: (a: number, b: number) => void;
    readonly gradientorbrenderer_start: (a: number) => void;
    readonly gradientorbrenderer_stop: (a: number) => void;
    readonly __wbg_rgbsplitrenderer_free: (a: number, b: number) => void;
    readonly rgbsplitrenderer_new: (a: any, b: any, c: number) => [number, number, number];
    readonly rgbsplitrenderer_render_once: (a: number) => void;
    readonly rgbsplitrenderer_reset_mouse: (a: number) => void;
    readonly rgbsplitrenderer_resize: (a: number, b: number, c: number) => void;
    readonly rgbsplitrenderer_set_color_strength: (a: number, b: number) => void;
    readonly rgbsplitrenderer_set_glitch_amount: (a: number, b: number) => void;
    readonly rgbsplitrenderer_set_mouse_uv: (a: number, b: number, c: number) => void;
    readonly rgbsplitrenderer_set_opacity: (a: number, b: number) => void;
    readonly rgbsplitrenderer_set_split_intensity: (a: number, b: number) => void;
    readonly rgbsplitrenderer_start: (a: number) => void;
    readonly rgbsplitrenderer_stop: (a: number) => void;
    readonly wasm_init: () => void;
    readonly wasm_bindgen_7065c7a8bc170bdd___closure__destroy___dyn_core_d04e9ef8384c16b2___ops__function__FnMut_____Output_______: (a: number, b: number) => void;
    readonly wasm_bindgen_7065c7a8bc170bdd___convert__closures_____invoke_______true_: (a: number, b: number) => void;
    readonly __wbindgen_malloc: (a: number, b: number) => number;
    readonly __wbindgen_realloc: (a: number, b: number, c: number, d: number) => number;
    readonly __wbindgen_exn_store: (a: number) => void;
    readonly __externref_table_alloc: () => number;
    readonly __wbindgen_externrefs: WebAssembly.Table;
    readonly __wbindgen_free: (a: number, b: number, c: number) => void;
    readonly __externref_table_dealloc: (a: number) => void;
    readonly __wbindgen_start: () => void;
}

export type SyncInitInput = BufferSource | WebAssembly.Module;

/**
 * Instantiates the given `module`, which can either be bytes or
 * a precompiled `WebAssembly.Module`.
 *
 * @param {{ module: SyncInitInput }} module - Passing `SyncInitInput` directly is deprecated.
 *
 * @returns {InitOutput}
 */
export function initSync(module: { module: SyncInitInput } | SyncInitInput): InitOutput;

/**
 * If `module_or_path` is {RequestInfo} or {URL}, makes a request and
 * for everything else, calls `WebAssembly.instantiate` directly.
 *
 * @param {{ module_or_path: InitInput | Promise<InitInput> }} module_or_path - Passing `InitInput` directly is deprecated.
 *
 * @returns {Promise<InitOutput>}
 */
export default function __wbg_init (module_or_path?: { module_or_path: InitInput | Promise<InitInput> } | InitInput | Promise<InitInput>): Promise<InitOutput>;
