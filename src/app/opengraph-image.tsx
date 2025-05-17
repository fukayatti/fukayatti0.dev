import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 48,
          background: 'radial-gradient(circle at 30% 30%, #4F46E5, #1E1B4B 80%)',
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
          fontFamily: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
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
            background: 'conic-gradient(from 90deg at 40% 40%, #3b82f6, #8b5cf6, #ec4899, #3b82f6)',
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
            background: 'conic-gradient(from 270deg at 60% 60%, #3b82f6, #8b5cf6, #ec4899, #3b82f6)',
            opacity: 0.1,
            transform: 'rotate(15deg)',
            borderRadius: '50%',
          }}
        />
        
        {/* 幾何学模様の装飾 */}
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 40 + 20}px`,
              height: `${Math.random() * 40 + 20}px`,
              background: 'rgba(255, 255, 255, 0.05)',
              borderRadius: Math.random() > 0.5 ? '50%' : `${Math.random() * 10 + 5}px`,
              boxShadow: '0 0 20px rgba(99, 102, 241, 0.15)',
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
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1) inset',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            maxWidth: '80%',
            zIndex: 10,
          }}
        >
          {/* ロゴや象徴的なアイコン */}
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
                background: 'linear-gradient(135deg, #4F46E5, #8B5CF6)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 10px 25px rgba(79, 70, 229, 0.5)',
              }}
            >
              <span style={{ fontSize: '32px', fontWeight: 'bold' }}>P</span>
            </div>
          </div>
          
          <h1
            style={{
              fontSize: '60px',
              margin: '0 0 1rem 0',
              background: 'linear-gradient(to right, #ffffff, #c7d2fe)',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
              fontWeight: '900',
              letterSpacing: '-0.03em',
              textAlign: 'center',
              lineHeight: 1.2,
            }}
          >
            ポートフォリオ
          </h1>
          
          <div
            style={{
              width: '80px',
              height: '4px',
              background: 'linear-gradient(to right, #4F46E5, #8B5CF6)',
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
            クリエイティブ開発者のためのウェブサイト
          </p>
        </div>
        
        {/* 右下のタグ */}
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
          fukayatti0.dev
        </div>
      </div>
    ),
    { ...size }
  );
} 