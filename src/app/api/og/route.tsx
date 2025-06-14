import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    // クエリパラメータから情報を取得
    const title = searchParams.get('title') || 'Fukayatti0 Portfolio';
    const subtitle = searchParams.get('subtitle') || 'フロントエンド開発者';
    const description =
      searchParams.get('description') ||
      'Next.js, React, TypeScriptで現代的なWebアプリケーションを構築';

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#0f172a',
            backgroundImage: `
              radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%),
              radial-gradient(circle at 40% 80%, rgba(99, 102, 241, 0.2) 0%, transparent 50%)
            `,
            padding: '40px 80px',
            fontFamily: '"Inter", system-ui, sans-serif',
          }}
        >
          {/* Main content container */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              background: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '24px',
              padding: '60px 80px',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              maxWidth: '90%',
            }}
          >
            {/* Title */}
            <div
              style={{
                fontSize: '72px',
                fontWeight: 800,
                background: 'linear-gradient(90deg, #a78bfa, #f472b6, #38bdf8)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
                marginBottom: '20px',
                lineHeight: '1.1',
              }}
            >
              {title}
            </div>

            {/* Subtitle */}
            <div
              style={{
                fontSize: '32px',
                fontWeight: 600,
                color: '#e2e8f0',
                marginBottom: '24px',
                opacity: 0.9,
              }}
            >
              {subtitle}
            </div>

            {/* Description */}
            <div
              style={{
                fontSize: '24px',
                fontWeight: 400,
                color: '#94a3b8',
                lineHeight: '1.4',
                maxWidth: '800px',
              }}
            >
              {description}
            </div>

            {/* Bottom accent */}
            <div
              style={{
                marginTop: '40px',
                width: '120px',
                height: '4px',
                background: 'linear-gradient(90deg, #6366f1, #ec4899, #06b6d4)',
                borderRadius: '2px',
              }}
            />
          </div>

          {/* Floating decoration elements */}
          <div
            style={{
              position: 'absolute',
              top: '100px',
              left: '100px',
              width: '80px',
              height: '80px',
              background:
                'linear-gradient(135deg, rgba(99, 102, 241, 0.3), rgba(236, 72, 153, 0.3))',
              borderRadius: '50%',
              filter: 'blur(20px)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: '120px',
              right: '120px',
              width: '120px',
              height: '120px',
              background:
                'linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(6, 182, 212, 0.2))',
              borderRadius: '50%',
              filter: 'blur(30px)',
            }}
          />
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (error) {
    console.error('Error generating OG image:', error);
    return new Response('Error generating image', { status: 500 });
  }
}
