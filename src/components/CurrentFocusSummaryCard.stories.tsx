import type { Meta, StoryObj } from '@storybook/react';
import CurrentFocusSummaryCard from './CurrentFocusSummaryCard';

const meta = {
  title: 'Components/CurrentFocusSummaryCard',
  component: CurrentFocusSummaryCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof CurrentFocusSummaryCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const InDarkBackground: Story = {
  decorators: [
    (Story) => (
      <div className="bg-black p-8 rounded-lg">
        <Story />
      </div>
    ),
  ],
};
