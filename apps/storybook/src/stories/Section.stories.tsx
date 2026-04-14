import type { Meta, StoryObj } from "@storybook/react";

import { Section } from "@velum/react";

const meta = {
  title: "React/Layout/Section",
  component: Section,
  args: {
    variant: "default",
    children: "Section provides the outer width and vertical rhythm for editorial layouts."
  }
} satisfies Meta<typeof Section>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Wide: Story = {
  args: {
    variant: "wide"
  }
};

export const Hero: Story = {
  args: {
    variant: "hero"
  }
};
