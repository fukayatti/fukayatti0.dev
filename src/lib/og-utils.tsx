import { ImageResponse } from 'next/og';

export type OgImageParams = {
  title?: string;
  subtitle?: string;
  bgFrom?: string;
  bgTo?: string;
  textFrom?: string;
  textTo?: string;
  icon?: string; // アイコン表示用のテキスト（1文字）
  path?: string; // URLパス
  accentColor?: string; // アクセントカラー
};

const defaultParams: OgImageParams = {
  title: 'ポートフォリオ',
  subtitle: 'クリエイティブ開発者のためのウェブサイト',
  bgFrom: '#4F46E5',
  bgTo: '#1E1B4B',
  textFrom: '#ffffff',
  textTo: '#c7d2fe',
  icon: 'P',
  path: '',
  accentColor: '#4F46E5',
};

export const generateOgImage = async (
  params: OgImageParams = defaultParams,
  size = { width: 1200, height: 630 }
) => {
  const {
    title,
    subtitle,
    bgFrom,
    bgTo,
    textFrom,
    textTo,
    icon,
    path,
    accentColor,
  } = {
    ...defaultParams,
    ...params,
  };

  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 48,
          background: `radial-gradient(circle at 30% 30%, ${bgFrom}, ${bgTo} 80%)`,
          color: 'white',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '4rem',
          position: 'relative',
          overflow: 'hidden',
          fontFamily:
            'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        }}
      >
        {/* 装飾的な背景要素 */}
        <div
          style={{
            position: 'absolute',
            top: '-50%',
            left: '-20%',
            width: '100%',
            height: '250%',
            background: `conic-gradient(from 90deg at 40% 40%, #3b82f6, #8b5cf6, ${accentColor}, #3b82f6)`,
            opacity: 0.1,
            transform: 'rotate(-15deg)',
            borderRadius: '50%',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-50%',
            right: '-20%',
            width: '100%',
            height: '250%',
            background: `conic-gradient(from 270deg at 60% 60%, #3b82f6, #8b5cf6, ${accentColor}, #3b82f6)`,
            opacity: 0.1,
            transform: 'rotate(15deg)',
            borderRadius: '50%',
          }}
        />

        {/* 波紋装飾 */}
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: `${(i + 1) * 300}px`,
              height: `${(i + 1) * 300}px`,
              borderRadius: '50%',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              transform: 'translate(-50%, -50%)',
            }}
          />
        ))}

        {/* ランダム幾何学模様の装飾 - 実行時に生成 */}
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={`shape-${i}`}
            style={{
              position: 'absolute',
              top: `${i * 10 + 5}%`,
              left: `${i * 10 + 5}%`,
              width: `${20 + i * 5}px`,
              height: `${20 + i * 5}px`,
              background: 'rgba(255, 255, 255, 0.05)',
              borderRadius: i % 2 === 0 ? '50%' : '8px',
              boxShadow: '0 0 20px rgba(99, 102, 241, 0.15)',
              transform: `rotate(${i * 45}deg)`,
            }}
          />
        ))}

        {/* カード風のコンテンツコンテナ */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(30, 30, 60, 0.7)',
            backdropFilter: 'blur(20px)',
            borderRadius: '24px',
            padding: '3rem 4rem',
            boxShadow:
              '0 20px 60px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1) inset',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            maxWidth: '80%',
            zIndex: 10,
          }}
        >
          {/* アイコン */}
          <div
            style={{
              position: 'relative',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: '1.5rem',
            }}
          >
            <div
              style={{
                width: '60px',
                height: '60px',
                borderRadius: '16px',
                background: `linear-gradient(135deg, ${accentColor}, #8B5CF6)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: `0 10px 25px rgba(79, 70, 229, 0.5)`,
                color: 'white',
                fontWeight: 'bold',
                fontSize: '32px',
              }}
            >
              {icon}
            </div>
          </div>

          <h1
            style={{
              fontSize: '60px',
              margin: '0 0 1rem 0',
              background: `linear-gradient(to right, ${textFrom}, ${textTo})`,
              WebkitBackgroundClip: 'text',
              color: 'transparent',
              fontWeight: '900',
              letterSpacing: '-0.03em',
              textAlign: 'center',
              lineHeight: 1.2,
            }}
          >
            {title}
          </h1>

          <div
            style={{
              width: '80px',
              height: '4px',
              background: `linear-gradient(to right, ${accentColor}, #8B5CF6)`,
              margin: '1rem 0',
              borderRadius: '2px',
            }}
          />

          <p
            style={{
              fontSize: '28px',
              margin: '0',
              color: '#a5b4fc',
              textAlign: 'center',
              fontWeight: '500',
            }}
          >
            {subtitle}
          </p>
        </div>

        {/* 右下のタグ */}
        {path && (
          <div
            style={{
              position: 'absolute',
              bottom: '30px',
              right: '40px',
              fontSize: '18px',
              color: 'rgba(255, 255, 255, 0.6)',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <div
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: '#4ade80',
                marginRight: '4px',
              }}
            />
            fukayatti0.com{path ? `/${path}` : ''}
          </div>
        )}
      </div>
    ),
    size
  );
};
