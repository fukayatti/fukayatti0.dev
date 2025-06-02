import type { Meta, StoryObj } from '@storybook/react';
import { ThemeProvider } from 'next-themes';
import CurrentFocusSection from './CurrentFocusSection';
import type { CurrentFocusArea } from '@/lib/notion-content';

// モックデータの作成
const mockFocusAreas: CurrentFocusArea[] = [
  {
    id: '1',
    title: 'Web Development',
    subtitle: 'Full-Stack Applications',
    description:
      'Building scalable web applications using modern technologies like React, Next.js, and TypeScript. Focusing on performance optimization and user experience.',
    progress: 85,
    status: 'Active',
    color: 'primary',
    icon: 'Code2',
    stats: '12 projects',
    technologies: ['React', 'Next.js', 'TypeScript', 'TailwindCSS', 'Prisma'],
    displayOrder: 1,
    active: true,
  },
  {
    id: '2',
    title: 'Mobile Development',
    subtitle: 'Cross-Platform Apps',
    description:
      'Exploring React Native and Flutter for cross-platform mobile application development. Learning native iOS and Android development patterns.',
    progress: 60,
    status: 'Learning',
    color: 'accent',
    icon: 'Smartphone',
    stats: '5 apps',
    technologies: ['React Native', 'Flutter', 'Dart', 'Swift', 'Kotlin'],
    displayOrder: 2,
    active: true,
  },
  {
    id: '3',
    title: 'Embedded Systems',
    subtitle: 'IoT & Hardware',
    description:
      'Working with microcontrollers and IoT devices. Building connected systems that bridge the physical and digital worlds.',
    progress: 70,
    status: 'Active',
    color: 'secondary',
    icon: 'Cpu',
    stats: '8 circuits',
    technologies: ['Arduino', 'ESP32', 'C++', 'Python', 'MQTT'],
    displayOrder: 3,
    active: true,
  },
  {
    id: '4',
    title: 'Competitive Programming',
    subtitle: 'Algorithm & Data Structures',
    description:
      'Participating in coding competitions and improving problem-solving skills. Focus on algorithmic thinking and optimization.',
    progress: 45,
    status: 'Competing',
    color: 'warning',
    icon: 'Trophy',
    stats: '150+ problems',
    technologies: ['C++', 'Python', 'Algorithms', 'Data Structures'],
    displayOrder: 4,
    active: true,
  },
];

const meta = {
  title: 'Sections/CurrentFocusSection',
  component: CurrentFocusSection,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          '現在のフォーカス領域を表示するセクション。プロジェクトの進捗、技術スタック、ステータスを含む包括的なビューを提供します。',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    focusAreas: {
      description: '現在フォーカスしている領域のデータ配列',
      control: false,
    },
  },
  decorators: [
    (Story) => (
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
        <div className="bg-background text-foreground min-h-screen p-8">
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
} satisfies Meta<typeof CurrentFocusSection>;

export default meta;
type Story = StoryObj<typeof meta>;

// 基本的な表示（全フォーカス領域）
export const Default: Story = {
  args: {
    focusAreas: mockFocusAreas,
  },
};

// ライトテーマでの表示
export const LightTheme: Story = {
  args: {
    focusAreas: mockFocusAreas,
  },
  decorators: [
    (Story) => (
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
        <div className="bg-background text-foreground min-h-screen p-8">
          <div className="max-w-6xl mx-auto">
            <div className="mb-8 p-6 bg-card rounded-lg border border-border">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                ライトテーマでのCurrent Focus
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <h3 className="font-semibold text-primary">
                    プロジェクト管理
                  </h3>
                  <ul className="text-sm text-foreground/70 space-y-1">
                    <li>• 進捗トラッキング</li>
                    <li>• ステータス表示</li>
                    <li>• 技術スタック管理</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-primary">ビジュアル要素</h3>
                  <ul className="text-sm text-foreground/70 space-y-1">
                    <li>• カラーコード化</li>
                    <li>• プログレスバー</li>
                    <li>• ガラスエフェクト</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-primary">
                    インタラクション
                  </h3>
                  <ul className="text-sm text-foreground/70 space-y-1">
                    <li>• ホバーエフェクト</li>
                    <li>• スケールアニメーション</li>
                    <li>• アクションボタン</li>
                  </ul>
                </div>
              </div>
            </div>
            <Story />
          </div>
        </div>
      </ThemeProvider>
    ),
  ],
};

// モバイルビューでの表示
export const Mobile: Story = {
  args: {
    focusAreas: mockFocusAreas,
  },
  parameters: {
    viewport: {
      defaultViewport: 'iphone12',
    },
  },
  decorators: [
    (Story) => (
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
        <div className="bg-background text-foreground min-h-screen p-4">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-foreground mb-3">
              モバイル表示
            </h2>
            <div className="bg-card p-4 rounded-lg border border-border">
              <h3 className="text-lg font-semibold mb-2">レスポンシブ機能</h3>
              <ul className="text-sm text-foreground/70 space-y-1">
                <li>• 1カラムレイアウト</li>
                <li>• タッチフレンドリーなボタン</li>
                <li>• 最適化されたカードサイズ</li>
                <li>• スクロール可能なコンテンツ</li>
              </ul>
            </div>
          </div>
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
};

// 高進捗プロジェクト
export const HighProgress: Story = {
  args: {
    focusAreas: mockFocusAreas.map((area) => ({
      ...area,
      progress: Math.max(80, area.progress),
      status: 'Active',
    })),
  },
  decorators: [
    (Story) => (
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
        <div className="bg-background text-foreground min-h-screen p-8">
          <div className="max-w-6xl mx-auto">
            <div className="mb-8 p-6 bg-green-500/20 border border-green-500/30 rounded-lg">
              <h3 className="text-lg font-semibold text-green-400 mb-2">
                高進捗プロジェクト
              </h3>
              <p className="text-green-300/80">
                すべてのプロジェクトが80%以上の進捗率で、アクティブステータスになっています。
              </p>
            </div>
            <Story />
          </div>
        </div>
      </ThemeProvider>
    ),
  ],
};

// 学習中プロジェクト
export const LearningProjects: Story = {
  args: {
    focusAreas: mockFocusAreas.map((area) => ({
      ...area,
      progress: Math.min(50, area.progress),
      status: 'Learning',
    })),
  },
  decorators: [
    (Story) => (
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
        <div className="bg-background text-foreground min-h-screen p-8">
          <div className="max-w-6xl mx-auto">
            <div className="mb-8 p-6 bg-blue-500/20 border border-blue-500/30 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-400 mb-2">
                学習中プロジェクト
              </h3>
              <p className="text-blue-300/80">
                すべてのプロジェクトが学習段階で、進捗率は50%以下に設定されています。
              </p>
            </div>
            <Story />
          </div>
        </div>
      </ThemeProvider>
    ),
  ],
};

// 単一プロジェクト
export const SingleProject: Story = {
  args: {
    focusAreas: [mockFocusAreas[0]],
  },
  decorators: [
    (Story) => (
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
        <div className="bg-background text-foreground min-h-screen p-8">
          <div className="max-w-6xl mx-auto">
            <div className="mb-8 p-6 bg-card rounded-lg border border-border">
              <h3 className="text-lg font-semibold text-foreground mb-2">
                単一プロジェクト表示
              </h3>
              <p className="text-foreground/70">
                1つのフォーカス領域のみを表示する場合のレイアウトです。
              </p>
            </div>
            <Story />
          </div>
        </div>
      </ThemeProvider>
    ),
  ],
};

// 多数のプロジェクト
export const ManyProjects: Story = {
  args: {
    focusAreas: [
      ...mockFocusAreas,
      {
        id: '5',
        title: 'Machine Learning',
        subtitle: 'AI & Data Science',
        description:
          'Exploring machine learning algorithms and neural networks. Working with TensorFlow and PyTorch for various AI applications.',
        progress: 35,
        status: 'Exploring',
        color: 'primary',
        icon: 'TrendingUp',
        stats: '3 models',
        technologies: ['Python', 'TensorFlow', 'PyTorch', 'Pandas', 'NumPy'],
        displayOrder: 5,
        active: true,
      },
      {
        id: '6',
        title: 'DevOps & Cloud',
        subtitle: 'Infrastructure & Deployment',
        description:
          'Learning cloud platforms and DevOps practices. Setting up CI/CD pipelines and container orchestration.',
        progress: 55,
        status: 'Learning',
        color: 'accent',
        icon: 'Target',
        stats: '7 deployments',
        technologies: [
          'Docker',
          'Kubernetes',
          'AWS',
          'GitHub Actions',
          'Terraform',
        ],
        displayOrder: 6,
        active: true,
      },
    ],
  },
  decorators: [
    (Story) => (
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
        <div className="bg-background text-foreground min-h-screen p-8">
          <div className="max-w-6xl mx-auto">
            <div className="mb-8 p-6 bg-card rounded-lg border border-border">
              <h3 className="text-lg font-semibold text-foreground mb-2">
                多数のプロジェクト
              </h3>
              <p className="text-foreground/70">
                6つのフォーカス領域を表示した場合のレイアウトとグリッドの動作を確認できます。
              </p>
            </div>
            <Story />
          </div>
        </div>
      </ThemeProvider>
    ),
  ],
};

// ステータス別表示
export const StatusVariations: Story = {
  args: {
    focusAreas: [
      { ...mockFocusAreas[0], status: 'Active' },
      { ...mockFocusAreas[1], status: 'Learning' },
      { ...mockFocusAreas[2], status: 'Exploring' },
      { ...mockFocusAreas[3], status: 'Competing' },
    ],
  },
  decorators: [
    (Story) => (
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
        <div className="bg-background text-foreground min-h-screen p-8">
          <div className="max-w-6xl mx-auto">
            <div className="mb-8 space-y-6">
              <h2 className="text-3xl font-bold text-foreground">
                ステータス別プロジェクト表示
              </h2>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-card p-4 rounded-lg border border-border text-center">
                  <div className="text-2xl mb-2">📈</div>
                  <div className="font-semibold text-green-400">Active</div>
                  <div className="text-sm text-foreground/60">
                    進行中プロジェクト
                  </div>
                </div>
                <div className="bg-card p-4 rounded-lg border border-border text-center">
                  <div className="text-2xl mb-2">🎯</div>
                  <div className="font-semibold text-blue-400">Learning</div>
                  <div className="text-sm text-foreground/60">学習中の技術</div>
                </div>
                <div className="bg-card p-4 rounded-lg border border-border text-center">
                  <div className="text-2xl mb-2">⏰</div>
                  <div className="font-semibold text-purple-400">Exploring</div>
                  <div className="text-sm text-foreground/60">探索段階</div>
                </div>
                <div className="bg-card p-4 rounded-lg border border-border text-center">
                  <div className="text-2xl mb-2">👥</div>
                  <div className="font-semibold text-orange-400">Competing</div>
                  <div className="text-sm text-foreground/60">
                    競技プログラミング
                  </div>
                </div>
              </div>

              <div className="bg-purple-500/20 border border-purple-500/30 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-purple-400 mb-2">
                  🏷️ ステータス表示システム
                </h3>
                <p className="text-purple-300/80">
                  各プロジェクトには適切なアイコンとステータスが表示され、
                  現在の取り組み状況を視覚的に理解できます。
                </p>
              </div>
            </div>

            <Story />
          </div>
        </div>
      </ThemeProvider>
    ),
  ],
};

// カラーバリエーション
export const ColorVariations: Story = {
  args: {
    focusAreas: [
      { ...mockFocusAreas[0], color: 'primary' },
      { ...mockFocusAreas[1], color: 'accent' },
      { ...mockFocusAreas[2], color: 'secondary' },
      { ...mockFocusAreas[3], color: 'warning' },
    ],
  },
  decorators: [
    (Story) => (
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
        <div className="bg-background text-foreground min-h-screen p-8">
          <div className="max-w-6xl mx-auto">
            <div className="mb-8 space-y-6">
              <h2 className="text-3xl font-bold text-foreground">
                カラーバリエーション
              </h2>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-card p-4 rounded-lg border border-border text-center">
                  <div className="w-8 h-8 bg-primary rounded-full mx-auto mb-2"></div>
                  <div className="font-semibold text-primary">Primary</div>
                  <div className="text-sm text-foreground/60">メインカラー</div>
                </div>
                <div className="bg-card p-4 rounded-lg border border-border text-center">
                  <div className="w-8 h-8 bg-accent rounded-full mx-auto mb-2"></div>
                  <div className="font-semibold text-accent">Accent</div>
                  <div className="text-sm text-foreground/60">
                    アクセントカラー
                  </div>
                </div>
                <div className="bg-card p-4 rounded-lg border border-border text-center">
                  <div className="w-8 h-8 bg-purple-500 rounded-full mx-auto mb-2"></div>
                  <div className="font-semibold text-purple-400">Secondary</div>
                  <div className="text-sm text-foreground/60">
                    セカンダリカラー
                  </div>
                </div>
                <div className="bg-card p-4 rounded-lg border border-border text-center">
                  <div className="w-8 h-8 bg-orange-500 rounded-full mx-auto mb-2"></div>
                  <div className="font-semibold text-orange-400">Warning</div>
                  <div className="text-sm text-foreground/60">警告カラー</div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-primary-500/20 to-accent-500/20 border border-primary-500/30 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-primary-400 mb-2">
                  🎨 カラーシステム
                </h3>
                <p className="text-primary-300/80">
                  各プロジェクトには専用の色が割り当てられ、
                  アイコン、プログレスバー、ボタンに一貫して適用されます。
                </p>
              </div>
            </div>

            <Story />
          </div>
        </div>
      </ThemeProvider>
    ),
  ],
};

// 空のデータ
export const EmptyData: Story = {
  args: {
    focusAreas: [],
  },
  decorators: [
    (Story) => (
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
        <div className="bg-background text-foreground min-h-screen p-8">
          <div className="max-w-6xl mx-auto">
            <div className="mb-8 p-6 bg-yellow-500/20 border border-yellow-500/30 rounded-lg">
              <h3 className="text-lg font-semibold text-yellow-400 mb-2">
                空のデータ表示
              </h3>
              <p className="text-yellow-300/80">
                フォーカス領域がない場合の表示です。ヘッダーとサマリーカードのみが表示されます。
              </p>
            </div>
            <Story />
          </div>
        </div>
      </ThemeProvider>
    ),
  ],
};

// アニメーション無効化
export const ReducedMotion: Story = {
  args: {
    focusAreas: mockFocusAreas,
  },
  decorators: [
    (Story) => (
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
        <div
          className="bg-background text-foreground min-h-screen p-8"
          style={
            {
              '--motion-duration': '0s',
            } as React.CSSProperties
          }
        >
          <style>{`
            *, *::before, *::after {
              animation-duration: 0.01ms !important;
              animation-iteration-count: 1 !important;
              transition-duration: 0.01ms !important;
            }
          `}</style>
          <div className="max-w-6xl mx-auto">
            <div className="mb-8 p-6 bg-yellow-500/20 border border-yellow-500/30 rounded-lg">
              <h3 className="text-lg font-semibold text-yellow-400 mb-2">
                アクセシビリティ: アニメーション無効化
              </h3>
              <p className="text-yellow-300/80">
                アニメーションが無効化されており、動きに敏感なユーザーでも快適に利用できます。
                すべての機能は正常に動作します。
              </p>
            </div>
            <Story />
          </div>
        </div>
      </ThemeProvider>
    ),
  ],
};
