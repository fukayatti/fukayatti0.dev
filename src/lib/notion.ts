// Notion APIから受賞歴を取得するための型定義と関数

export interface NotionAward {
  id: string;
  title: string;
  date: string;
  organizer: string;
  details?: string;
  imageUrl?: string;
}

export interface NotionDatabaseResponse {
  results: Array<{
    id: string;
    properties: {
      受賞名: {
        title: Array<{
          plain_text: string;
        }>;
      };
      受賞日: {
        date: {
          start: string;
        } | null;
      };
      主催者: {
        rich_text: Array<{
          plain_text: string;
        }>;
      };
      詳細: {
        rich_text: Array<{
          plain_text: string;
        }>;
      };
      画像: {
        files: Array<{
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

// Notionデータベースから受賞歴を取得する関数
export async function getAwardsFromNotion(): Promise<NotionAward[]> {
  try {
    // 本来はここでMCPツールを使ってNotionAPIを呼び出す
    // 現在はサーバーサイドでないため、静的データを返す
    // 実際の実装では、API routeでMCPツールを使用する

    const mockData: NotionAward[] = [
      {
        id: '1',
        title: 'DCON2025　第5位',
        date: '2025-05-10',
        organizer: 'DCON事務局',
        details: 'https://www.ibaraki-ct.ac.jp/info/archives/75810',
        imageUrl:
          'https://www.ibaraki-ct.ac.jp/info/wp-content/uploads/2025/05/%E3%83%A1%E3%83%B3%E3%82%BF%E3%83%BC%E6%8A%98%E8%8C%82%E3%81%95%E3%82%93%E3%81%A8%EF%BC%91-2048x1536.jpg',
      },
    ];

    return mockData;
  } catch (error) {
    console.error('Error fetching awards from Notion:', error);
    return [];
  }
}

// Notionのレスポンスを我々の型に変換する関数
export function transformNotionResponse(
  response: NotionDatabaseResponse
): NotionAward[] {
  return response.results.map((item) => ({
    id: item.id,
    title: item.properties.受賞名.title[0]?.plain_text || '',
    date: item.properties.受賞日.date?.start || '',
    organizer: item.properties.主催者.rich_text[0]?.plain_text || '',
    details: item.properties.詳細.rich_text[0]?.plain_text || '',
    imageUrl:
      item.properties.画像.files[0]?.external?.url ||
      item.properties.画像.files[0]?.file?.url ||
      '',
  }));
}
