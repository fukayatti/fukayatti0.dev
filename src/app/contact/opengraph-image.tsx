import OgImage from '../../components/OgImage';

const ogParams = {
  title: 'お問い合わせ',
  subtitle: 'ご質問やお仕事のご依頼はこちらから',
  icon: '✉️',
  accentColor: '#00c3ff',
  bgFrom: '#232526',
  bgTo: '#414345',
  textFrom: '#fff',
  textTo: '#43cea2',
  path: 'contact',
};

export const runtime = 'edge';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image() {
  // @ts-ignore
  return OgImage(ogParams);
}
