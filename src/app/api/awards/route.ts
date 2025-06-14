import { NextResponse } from 'next/server';

import { clearAwardsCache, getCachedAwards } from '@/lib/notion-server';

// Notionデータベースから受賞歴を取得するAPI route
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const clearCache = searchParams.get('clearCache') === 'true';

    // キャッシュクリアが要求された場合
    if (clearCache) {
      clearAwardsCache();
      console.log('Cache cleared via API request');
    }

    // サーバーサイド関数を使ってNotionからデータを取得
    const awards = await getCachedAwards();

    return NextResponse.json({
      awards,
      timestamp: new Date().toISOString(),
      cached: !clearCache,
    });
  } catch (error) {
    console.error('Error fetching awards from Notion:', error);
    return NextResponse.json(
      {
        error: 'Failed to fetch awards',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

// POSTメソッドでキャッシュクリア専用エンドポイント
export async function POST() {
  try {
    clearAwardsCache();
    const awards = await getCachedAwards();

    return NextResponse.json({
      message: 'Cache cleared and data refreshed',
      awards,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error refreshing awards cache:', error);
    return NextResponse.json(
      {
        error: 'Failed to refresh cache',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

// キャッシュを無効化して常に最新のデータを取得
export const revalidate = 0;
