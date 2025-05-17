import { ImageResponse } from 'next/og';

export type OgImageParams = {
  title?: string;
  subtitle?: string;
  bgFrom?: string;
  bgTo?: string;
  textFrom?: string;
  textTo?: string;
};

const defaultParams: OgImageParams = {
  title: 'ポートフォリオ',
  subtitle: 'クリエイティブ開発者のためのウェブサイト',
  bgFrom: '#000000',
  bgTo: '#1a1a1a',
  textFrom: '#00c6ff',
  textTo: '#0072ff',
};

export const generateOgImage = async (
  params: OgImageParams = defaultParams,
  size = { width: 1200, height: 630 }
) => {
  const { title, subtitle, bgFrom, bgTo, textFrom, textTo } = {
    ...defaultParams,
    ...params,
  };

  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 48,
          background: `linear-gradient(to bottom, ${bgFrom}, ${bgTo})`,
          color: 'white',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '4rem',
          fontFamily: 'sans-serif',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: 'radial-gradient(circle at 25px 25px, #333 2px, transparent 0)',
            backgroundSize: '50px 50px',
            opacity: 0.2,
            zIndex: 0,
          }}
        />
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1,
          }}
        >
          <h1
            style={{
              fontSize: 72,
              margin: '0 0 2rem 0',
              background: `linear-gradient(to right, ${textFrom}, ${textTo})`,
              WebkitBackgroundClip: 'text',
              color: 'transparent',
              padding: '0',
            }}
          >
            {title}
          </h1>
          <p style={{ fontSize: 32, margin: 0, color: '#ccc', textAlign: 'center' }}>
            {subtitle}
          </p>
        </div>
      </div>
    ),
    size
  );
}; 