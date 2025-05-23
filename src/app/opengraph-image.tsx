import OgImage from '../components/OgImage';
import { ogImagePresets } from '../lib/og-image-presets';

export const runtime = 'edge';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image() {
  // @ts-ignore
  return OgImage(ogImagePresets.top);
}
