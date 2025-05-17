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
          background: 'radial-gradient(circle at 70% 30%, #8B5CF6, #1E1B4B 80%)',
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
            right: '-20%',
            width: '100%',
            height: '250%',
            background: 'conic-gradient(from 45deg at 60% 40%, #3b82f6, #8b5cf6, #ec4899, #3b82f6)',
            opacity: 0.1,
            transform: 'rotate(15deg)',
            borderRadius: '50%',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-50%',
            left: '-20%',
            width: '100%',
            height: '250%',
            background: 'conic-gradient(from 225deg at 40% 60%, #3b82f6, #8b5cf6, #ec4899, #3b82f6)',
            opacity: 0.1,
            transform: 'rotate(-15deg)',
            borderRadius: '50%',
          }}
        />
        
        {/* 波紋アニメーション風の装飾 */}
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
        
        {/* 幾何学的な装飾 */}
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={`shape-${i}`}
            style={{
              position: 'absolute',
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 40 + 20}px`,
              height: `${Math.random() * 40 + 20}px`,
              background: 'rgba(255, 255, 255, 0.03)',
              borderRadius: Math.random() > 0.5 ? '50%' : `${Math.random() * 10 + 5}px`,
              boxShadow: '0 0 20px rgba(139, 92, 246, 0.15)',
              transform: `rotate(${Math.random() * 360}deg)`,
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
                background: 'linear-gradient(135deg, #8B5CF6, #EC4899)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 10px 25px rgba(139, 92, 246, 0.5)',
              }}
            >
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                style={{ color: 'white' }}
              >
                <path
                  d="M21 12.7V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V4C3 3.46957 3.21071 2.96086 3.58579 2.58579C3.96086 2.21071 4.46957 2 5 2H15.3C15.5545 2.00001 15.8043 2.07724 16.01 2.22L20.8 6.23C20.9231 6.33381 21.0218 6.46193 21.0897 6.60551C21.1575 6.74909 21.1928 6.90435 21.193 7.061V7.061C21.1929 7.2181 21.1574 7.37349 21.0894 7.51716C21.0213 7.66084 20.9225 7.78901 20.799 7.893L12.193 15.207C12.0703 15.3105 11.9714 15.4382 11.903 15.5817C11.8345 15.7253 11.7985 15.8809 11.798 16.039V16.039C11.7979 16.1974 11.8333 16.3534 11.9015 16.4974C11.9696 16.6414 12.0684 16.7697 12.191 16.873L18.191 21.873C18.3325 21.9927 18.5045 22.0647 18.686 22.0794C18.8675 22.0941 19.0497 22.0508 19.209 21.955L19.245 21.934"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
          
          <h1
            style={{
              fontSize: '60px',
              margin: '0 0 1rem 0',
              background: 'linear-gradient(to right, #ffffff, #ddd6fe)',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
              fontWeight: '900',
              letterSpacing: '-0.03em',
              textAlign: 'center',
              lineHeight: 1.2,
            }}
          >
            お問い合わせ
          </h1>
          
          <div
            style={{
              width: '80px',
              height: '4px',
              background: 'linear-gradient(to right, #8B5CF6, #EC4899)',
              margin: '1rem 0',
              borderRadius: '2px',
            }}
          />
          
          <p
            style={{
              fontSize: '28px',
              margin: '0',
              color: '#c4b5fd',
              textAlign: 'center',
              fontWeight: '500',
            }}
          >
            ご質問やお仕事のご依頼はこちらから
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
          fukayatti0.dev/contact
        </div>
      </div>
    ),
    { ...size }
  );
} 