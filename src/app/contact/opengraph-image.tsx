import { ogImagePresets } from '../../lib/og-image-presets';
import { generateOgImage } from '../../lib/og-utils';

export const runtime = 'edge';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return generateOgImage(ogImagePresets.contact, size);
}
