import { ogImagePresets } from '../lib/og-image-presets';
import { generateOgImage } from '../lib/og-utils';

export const runtime = 'edge';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

interface OpenGraphImageProps {
  preset: keyof typeof ogImagePresets;
}

export function createOpenGraphImage(preset: keyof typeof ogImagePresets) {
  return async function Image() {
    return generateOgImage(ogImagePresets[preset], size);
  };
}
