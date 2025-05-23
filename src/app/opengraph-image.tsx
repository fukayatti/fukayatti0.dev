import OgImage from '../components/OgImage';

const ogParams = {
  title: 'ポートフォリオ',
  subtitle: 'クリエイティブ開発者のためのウェブサイト',
  icon: '🦄',
  accentColor: '#ff6ec4',
  bgFrom: '#0f2027',
  bgTo: '#2c5364',
  textFrom: '#fff',
  textTo: '#ffb347',
  path: '',
};

export const runtime = 'edge';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image() {
  // propsをOgImageに渡す
  // @ts-ignore
  return OgImage(ogParams);
}
