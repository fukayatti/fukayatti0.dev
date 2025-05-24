import { generateOgImage, OgImageParams } from '../lib/og-utils';

export const runtime = 'edge';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

// propsで内容をカスタマイズ可能なOGP画像生成エンドポイント
export default async function OgImage(props: OgImageParams) {
  // ここでpropsを受け取り、generateOgImageに渡す
  return generateOgImage(
    {
      ...props,
      // ここでさらにオシャレなデフォルト値や装飾を追加してもOK
      bgFrom: props.bgFrom || '#0f2027',
      bgTo: props.bgTo || '#2c5364',
      accentColor: props.accentColor || '#00c3ff',
      icon: props.icon || '✨',
      textFrom: props.textFrom || '#fff',
      textTo: props.textTo || '#a8ff78',
    },
    size
  );
}
