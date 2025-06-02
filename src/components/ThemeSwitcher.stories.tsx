import type { Meta, StoryObj } from '@storybook/react';
import { ThemeProvider } from 'next-themes';
import ColorThemeSelector from './ThemeSwitcher';

const meta = {
  title: 'Components/ColorThemeSelector',
  component: ColorThemeSelector,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <Story />
      </ThemeProvider>
    ),
  ],
} satisfies Meta<typeof ColorThemeSelector>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const InHeader: Story = {
  decorators: [
    (Story) => (
      <div className="bg-background/50 backdrop-blur-md p-4 rounded-lg border border-white/10">
        <Story />
      </div>
    ),
  ],
};
