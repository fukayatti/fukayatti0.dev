// サーバーサイドでNotion APIを直接叩いてデータを取得する関数

import { Client } from '@notionhq/client';
import type { NotionAward } from './notion';

// Notion クライアントの初期化
const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

// 環境変数からデータベースIDを取得
const DATABASE_ID = process.env.NOTION_DATABASE_ID!;

// Notion APIレスポンスの型定義
interface NotionDatabaseQueryResponse {
  results: Array<{
    id: string;
    properties: {
      受賞名: {
        type: 'title';
        title: Array<{
          plain_text: string;
        }>;
      };
      受賞日: {
        type: 'date';
        date: {
          start: string;
        } | null;
      };
      主催者: {
        type: 'rich_text';
        rich_text: Array<{
          plain_text: string;
        }>;
      };
      詳細: {
        type: 'rich_text';
        rich_text: Array<{
          plain_text: string;
        }>;
      };
      画像: {
        type: 'files';
        files: Array<{
          type: 'external' | 'file';
          external?: {
            url: string;
          };
          file?: {
            url: string;
          };
        }>;
      };
    };
  }>;
}

// Notion APIを使ってデータベースから受賞歴を取得する関数
export async function fetchAwardsFromNotion(): Promise<NotionAward[]> {
  try {
    console.log('Fetching awards from Notion database:', DATABASE_ID);

    // Notion APIでデータベースをクエリ
    const response = await notion.databases.query({
      database_id: DATABASE_ID,
      sorts: [
        {
          property: '受賞日',
          direction: 'descending',
        },
      ],
    });

    console.log(
      'Notion API response received:',
      response.results.length,
      'items'
    );

    // レスポンスをNotionAward形式に変換
    const awards: NotionAward[] = response.results.map((page: any) => {
      const properties = page.properties;

      return {
        id: page.id,
        title: properties.受賞名?.title?.[0]?.plain_text || '',
        date: properties.受賞日?.date?.start || '',
        organizer: properties.主催者?.rich_text?.[0]?.plain_text || '',
        details: properties.詳細?.rich_text?.[0]?.plain_text || '',
        imageUrl:
          properties.画像?.files?.[0]?.external?.url ||
          properties.画像?.files?.[0]?.file?.url ||
          '',
      };
    });

    console.log('Converted awards:', awards);
    return awards;
  } catch (error) {
    console.error('Error fetching awards from Notion:', error);

    // エラー時はモックデータを返す（開発時用）
    return [
      {
        id: 'mock-1',
        title: 'DCON2025　第5位',
        date: '2025-05-10',
        organizer: 'DCON事務局',
        details: 'https://www.ibaraki-ct.ac.jp/info/archives/75810',
        imageUrl:
          'https://www.ibaraki-ct.ac.jp/info/wp-content/uploads/2025/05/%E3%83%A1%E3%83%B3%E3%82%BF%E3%83%BC%E6%8A%98%E8%8C%82%E3%81%95%E3%82%93%E3%81%A8%EF%BC%91-2048x1536.jpg',
      },
    ];
  }
}

// キャッシュ機能付きの取得関数
let awardsCache: NotionAward[] | null = null;
let lastFetchTime = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5分

export async function getCachedAwards(): Promise<NotionAward[]> {
  const now = Date.now();

  // キャッシュが有効な場合はキャッシュを返す
  if (awardsCache && now - lastFetchTime < CACHE_DURATION) {
    console.log('Returning cached awards');
    return awardsCache;
  }

  console.log('Cache expired or empty, fetching fresh data');

  // 新しいデータを取得してキャッシュを更新
  awardsCache = await fetchAwardsFromNotion();
  lastFetchTime = now;

  return awardsCache;
}

// キャッシュを手動でクリアする関数
export function clearAwardsCache(): void {
  awardsCache = null;
  lastFetchTime = 0;
  console.log('Awards cache cleared');
}
