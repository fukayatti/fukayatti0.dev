/**
 * useWasmFx.ts
 *
 * Lazy-loads the portfolio-fx WASM module exactly once per page load
 * and exposes its exports to any React component that calls this hook.
 */

'use client';

import type * as PortfolioFx from 'portfolio-fx';

import { useEffect, useState } from 'react';

type WasmModule = typeof PortfolioFx;

let cachedModule: WasmModule | null = null;
let loadingPromise: Promise<WasmModule> | null = null;

async function loadWasm(): Promise<WasmModule> {
  if (cachedModule) return cachedModule;

  if (!loadingPromise) {
    loadingPromise = (async () => {
      // Use an indirect import so TypeScript does not try to resolve the
      // absolute URL at compile time.
      // eslint-disable-next-line @typescript-eslint/no-implied-eval
      const dynamicImport = new Function('url', 'return import(url)') as (
        url: string,
      ) => Promise<unknown>;

      const mod = (await dynamicImport('/pkg/portfolio_fx.js')) as WasmModule & {
        default?: (
          input?: RequestInfo | URL | Response | BufferSource | WebAssembly.Module,
        ) => Promise<unknown>;
      };

      if (typeof mod.default === 'function') {
        await mod.default();
      }

      cachedModule = mod;
      return mod;
    })();
  }

  return loadingPromise;
}

interface UseWasmFxResult {
  wasm: WasmModule | null;
  ready: boolean;
  error: Error | null;
}

export function useWasmFx(): UseWasmFxResult {
  const [wasm, setWasm] = useState<WasmModule | null>(cachedModule);
  const [ready, setReady] = useState<boolean>(cachedModule !== null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (cachedModule) {
      setWasm(cachedModule);
      setReady(true);
      return;
    }

    let cancelled = false;

    loadWasm()
      .then((mod) => {
        if (!cancelled) {
          setWasm(mod);
          setReady(true);
        }
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          console.error('[useWasmFx] Failed to load portfolio-fx WASM:', err);
          setError(err instanceof Error ? err : new Error(String(err)));
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return { wasm, ready, error };
}
