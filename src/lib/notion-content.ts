import { Client } from '@notionhq/client';

// Initialize Notion client
const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

// Database IDs
const CURRENT_FOCUS_DB_ID = '1fd3dbb2-f059-8102-b403-ffd658d0423e';
const GOALS_2025_DB_ID = '1fd3dbb2-f059-81de-9487-ffe50e290bec';

// Cache for server-side functions
let currentFocusCache: { data: CurrentFocusArea[]; timestamp: number } | null =
  null;
let goals2025Cache: { data: Goal2025[]; timestamp: number } | null = null;
const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes in milliseconds

// Types
export interface CurrentFocusArea {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  progress: number;
  status: string;
  stats: string;
  technologies: string[];
  color: string;
  icon: string;
  displayOrder: number;
  active: boolean;
}

export interface Goal2025 {
  id: string;
  title: string;
  description: string;
  progress: number;
  priority: 'high' | 'medium' | 'low';
  category: string;
  categoryIcon: string;
  categoryColor: string;
  displayOrder: number;
  active: boolean;
}

// Helper function to extract text from rich text
function getRichTextContent(richText: any[]): string {
  return richText?.map((text) => text.plain_text).join('') || '';
}

// Helper function to extract multi-select names
function getMultiSelectNames(multiSelect: any[]): string[] {
  return multiSelect?.map((item) => item.name) || [];
}

// Fetch Current Focus Areas from Notion
export async function getCurrentFocusAreas(): Promise<CurrentFocusArea[]> {
  try {
    const response = await notion.databases.query({
      database_id: CURRENT_FOCUS_DB_ID,
      filter: {
        property: 'Active',
        checkbox: {
          equals: true,
        },
      },
      sorts: [
        {
          property: 'Display Order',
          direction: 'ascending',
        },
      ],
    });

    return response.results.map((page: any) => {
      const properties = page.properties;
      return {
        id: page.id,
        title: getRichTextContent(properties.Title?.title || []),
        subtitle: getRichTextContent(properties.Subtitle?.rich_text || []),
        description: getRichTextContent(
          properties.Description?.rich_text || []
        ),
        progress: properties.Progress?.number || 0,
        status: properties.Status?.select?.name || '',
        stats: getRichTextContent(properties.Stats?.rich_text || []),
        technologies: getMultiSelectNames(
          properties.Technologies?.multi_select || []
        ),
        color: properties.Color?.select?.name || 'primary',
        icon: properties.Icon?.select?.name || 'Code2',
        displayOrder: properties['Display Order']?.number || 0,
        active: properties.Active?.checkbox || false,
      };
    });
  } catch (error) {
    console.error('Error fetching current focus areas:', error);
    return [];
  }
}

// Fetch Goals 2025 from Notion
export async function getGoals2025(): Promise<Goal2025[]> {
  try {
    const response = await notion.databases.query({
      database_id: GOALS_2025_DB_ID,
      filter: {
        property: 'Active',
        checkbox: {
          equals: true,
        },
      },
      sorts: [
        {
          property: 'Display Order',
          direction: 'ascending',
        },
      ],
    });

    return response.results.map((page: any) => {
      const properties = page.properties;
      return {
        id: page.id,
        title: getRichTextContent(properties.Title?.title || []),
        description: getRichTextContent(
          properties.Description?.rich_text || []
        ),
        progress: properties.Progress?.number || 0,
        priority: properties.Priority?.select?.name || 'medium',
        category: properties.Category?.select?.name || '',
        categoryIcon: properties['Category Icon']?.select?.name || '🎯',
        categoryColor: properties['Category Color']?.select?.name || 'primary',
        displayOrder: properties['Display Order']?.number || 0,
        active: properties.Active?.checkbox || false,
      };
    });
  } catch (error) {
    console.error('Error fetching goals 2025:', error);
    return [];
  }
}

// Organize Goals by Category
export async function getGoals2025ByCategory() {
  const goals = await getGoals2025();

  const categories = goals.reduce(
    (acc, goal) => {
      const categoryKey = goal.category;
      if (!acc[categoryKey]) {
        acc[categoryKey] = {
          title:
            categoryKey === 'Technical Objectives'
              ? '2025 Goals'
              : categoryKey === 'Knowledge Sharing'
                ? 'Content Creation'
                : 'Project Goals',
          subtitle: categoryKey,
          icon: goal.categoryIcon,
          color: goal.categoryColor,
          goals: [],
        };
      }
      acc[categoryKey].goals.push(goal);
      return acc;
    },
    {} as Record<string, any>
  );

  return Object.values(categories);
}

// Server-side cached functions for ISR
export async function getCachedCurrentFocusAreas(): Promise<
  CurrentFocusArea[]
> {
  const now = Date.now();

  // Check if cache is valid
  if (currentFocusCache && now - currentFocusCache.timestamp < CACHE_DURATION) {
    return currentFocusCache.data;
  }

  try {
    const data = await getCurrentFocusAreas();
    // Update cache
    currentFocusCache = {
      data,
      timestamp: now,
    };
    return data;
  } catch (error) {
    console.error('Error fetching cached current focus areas:', error);
    // Return cached data if available, even if expired
    if (currentFocusCache) {
      return currentFocusCache.data;
    }
    return [];
  }
}

export async function getCachedGoals2025ByCategory() {
  const now = Date.now();

  // Check if cache is valid
  if (goals2025Cache && now - goals2025Cache.timestamp < CACHE_DURATION) {
    const cachedGoals = goals2025Cache.data;
    // Organize cached goals by category
    const categories = cachedGoals.reduce(
      (acc, goal) => {
        const categoryKey = goal.category;
        if (!acc[categoryKey]) {
          acc[categoryKey] = {
            title:
              categoryKey === 'Technical Objectives'
                ? '2025 Goals'
                : categoryKey === 'Knowledge Sharing'
                  ? 'Content Creation'
                  : 'Project Goals',
            subtitle: categoryKey,
            icon: goal.categoryIcon,
            color: goal.categoryColor,
            goals: [],
          };
        }
        acc[categoryKey].goals.push(goal);
        return acc;
      },
      {} as Record<string, any>
    );
    return Object.values(categories);
  }

  try {
    const data = await getGoals2025();
    // Update cache
    goals2025Cache = {
      data,
      timestamp: now,
    };

    // Organize by category
    const categories = data.reduce(
      (acc, goal) => {
        const categoryKey = goal.category;
        if (!acc[categoryKey]) {
          acc[categoryKey] = {
            title:
              categoryKey === 'Technical Objectives'
                ? '2025 Goals'
                : categoryKey === 'Knowledge Sharing'
                  ? 'Content Creation'
                  : 'Project Goals',
            subtitle: categoryKey,
            icon: goal.categoryIcon,
            color: goal.categoryColor,
            goals: [],
          };
        }
        acc[categoryKey].goals.push(goal);
        return acc;
      },
      {} as Record<string, any>
    );

    return Object.values(categories);
  } catch (error) {
    console.error('Error fetching cached goals 2025:', error);
    // Return cached data if available, even if expired
    if (goals2025Cache) {
      const cachedGoals = goals2025Cache.data;
      const categories = cachedGoals.reduce(
        (acc, goal) => {
          const categoryKey = goal.category;
          if (!acc[categoryKey]) {
            acc[categoryKey] = {
              title:
                categoryKey === 'Technical Objectives'
                  ? '2025 Goals'
                  : categoryKey === 'Knowledge Sharing'
                    ? 'Content Creation'
                    : 'Project Goals',
              subtitle: categoryKey,
              icon: goal.categoryIcon,
              color: goal.categoryColor,
              goals: [],
            };
          }
          acc[categoryKey].goals.push(goal);
          return acc;
        },
        {} as Record<string, any>
      );
      return Object.values(categories);
    }
    return [];
  }
}
