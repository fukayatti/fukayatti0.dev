import type { Meta, StoryObj } from '@storybook/react';
import BackToTopButton from './BackToTopButton';

const meta = {
  title: 'Components/BackToTopButton',
  component: BackToTopButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof BackToTopButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithScrolledPage: Story = {
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <div style={{ height: '200vh', padding: '20px' }}>
        <div style={{ marginTop: '100vh' }}>
          <p>ページをスクロールしてボタンの動作を確認してください</p>
          <Story />
        </div>
      </div>
    ),
  ],
};
