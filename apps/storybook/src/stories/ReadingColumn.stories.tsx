import type { Meta, StoryObj } from "@storybook/react";

import { ReadingColumn } from "@velum/react";

const meta = {
  title: "React/Layout/ReadingColumn",
  component: ReadingColumn,
  args: {
    children:
      "ReadingColumn constrains copy to a readable measure without adding decorative structure."
  }
} satisfies Meta<typeof ReadingColumn>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Narrow: Story = {
  args: {
    variant: "narrow"
  }
};
