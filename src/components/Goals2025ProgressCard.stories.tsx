import type { Meta, StoryObj } from '@storybook/react';
import { ThemeProvider } from 'next-themes';
import Goals2025ProgressCard from './Goals2025ProgressCard';

// モックデータの型定義
interface MockGoal {
  id: string;
  title: string;
  priority: 'high' | 'medium' | 'low';
  progress: number;
  status: string;
}

interface MockCategory {
  id: string;
  name: string;
  goals: MockGoal[];
}

// モックデータ
const sampleGoalCategories: MockCategory[] = [
  {
    id: '1',
    name: 'Development',
    goals: [
      {
        id: '1',
        title: 'Next.js マスター',
        priority: 'high',
        progress: 75,
        status: 'in-progress',
      },
      {
        id: '2',
        title: 'TypeScript 完全理解',
        priority: 'high',
        progress: 90,
        status: 'in-progress',
      },
      {
        id: '3',
        title: 'GraphQL 学習',
        priority: 'medium',
        progress: 30,
        status: 'in-progress',
      },
    ],
  },
  {
    id: '2',
    name: 'Design',
    goals: [
      {
        id: '4',
        title: 'UI/UX デザイン改善',
        priority: 'medium',
        progress: 60,
        status: 'in-progress',
      },
      {
        id: '5',
        title: 'Figma スキル向上',
        priority: 'low',
        progress: 40,
        status: 'in-progress',
      },
    ],
  },
  {
    id: '3',
    name: 'Career',
    goals: [
      {
        id: '6',
        title: 'オープンソース貢献',
        priority: 'high',
        progress: 85,
        status: 'in-progress',
      },
      {
        id: '7',
        title: 'ブログ記事執筆',
        priority: 'medium',
        progress: 50,
        status: 'in-progress',
      },
    ],
  },
];

const meta = {
  title: 'Components/Goals2025ProgressCard',
  component: Goals2025ProgressCard,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '2025年の目標進捗を表示するカードコンポーネント。統計情報を視覚的に表示します。',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    goalCategories: {
      description: '目標カテゴリーの配列',
      control: false,
    },
  },
  decorators: [
    (Story) => (
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
        <div className="bg-background text-foreground p-8 min-w-[600px]">
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
} satisfies Meta<typeof Goals2025ProgressCard>;

export default meta;
type Story = StoryObj<typeof meta>;

// 標準的なデータでの表示
export const Default: Story = {
  args: {
    goalCategories: sampleGoalCategories,
  },
};

// 高進捗データ
export const HighProgress: Story = {
  args: {
    goalCategories: sampleGoalCategories.map((category) => ({
      ...category,
      goals: category.goals.map((goal) => ({
        ...goal,
        progress: Math.max(80, goal.progress),
      })),
    })),
  },
};

// 低進捗データ
export const LowProgress: Story = {
  args: {
    goalCategories: sampleGoalCategories.map((category) => ({
      ...category,
      goals: category.goals.map((goal) => ({
        ...goal,
        progress: Math.min(25, goal.progress),
      })),
    })),
  },
};

// 空のデータ
export const EmptyData: Story = {
  args: {
    goalCategories: [],
  },
};

// 単一カテゴリー
export const SingleCategory: Story = {
  args: {
    goalCategories: [sampleGoalCategories[0]],
  },
};

// 多数の目標を含むデータ
export const ManyGoals: Story = {
  args: {
    goalCategories: [
      {
        id: '1',
        name: 'Development',
        goals: Array.from({ length: 10 }, (_, i) => ({
          id: `goal-${i}`,
          title: `目標 ${i + 1}`,
          priority: ['high', 'medium', 'low'][i % 3] as
            | 'high'
            | 'medium'
            | 'low',
          progress: Math.floor(Math.random() * 100),
          status: 'in-progress',
        })),
      },
      {
        id: '2',
        name: 'Personal',
        goals: Array.from({ length: 8 }, (_, i) => ({
          id: `personal-${i}`,
          title: `個人目標 ${i + 1}`,
          priority: ['high', 'medium', 'low'][i % 3] as
            | 'high'
            | 'medium'
            | 'low',
          progress: Math.floor(Math.random() * 100),
          status: 'in-progress',
        })),
      },
    ],
  },
};

// ライトテーマ
export const LightTheme: Story = {
  args: {
    goalCategories: sampleGoalCategories,
  },
  decorators: [
    (Story) => (
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
        <div className="bg-background text-foreground p-8 min-w-[600px]">
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
};

// 完了した目標のみ
export const CompletedGoals: Story = {
  args: {
    goalCategories: sampleGoalCategories.map((category) => ({
      ...category,
      goals: category.goals.map((goal) => ({
        ...goal,
        progress: 100,
        status: 'completed',
      })),
    })),
  },
};

// 高優先度の目標のみ
export const HighPriorityOnly: Story = {
  args: {
    goalCategories: sampleGoalCategories
      .map((category) => ({
        ...category,
        goals: category.goals
          .filter((goal) => goal.priority === 'high')
          .map((goal) => ({
            ...goal,
            progress: Math.floor(Math.random() * 100),
          })),
      }))
      .filter((category) => category.goals.length > 0),
  },
};
