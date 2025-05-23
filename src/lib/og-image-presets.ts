import { OgImageParams } from './og-utils';

export const ogImagePresets: Record<string, OgImageParams> = {
  top: {
    title: 'ポートフォリオ',
    subtitle: 'クリエイティブ開発者のためのウェブサイト',
    icon: '🦄',
    accentColor: '#ff6ec4',
    bgFrom: '#0f2027',
    bgTo: '#2c5364',
    textFrom: '#fff',
    textTo: '#ffb347',
    path: '',
  },
  contact: {
    title: 'お問い合わせ',
    subtitle: 'ご質問やお仕事のご依頼はこちらから',
    icon: '✉️',
    accentColor: '#00c3ff',
    bgFrom: '#232526',
    bgTo: '#414345',
    textFrom: '#fff',
    textTo: '#43cea2',
    path: 'contact',
  },
};
