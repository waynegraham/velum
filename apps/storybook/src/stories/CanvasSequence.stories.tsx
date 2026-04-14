import type { Meta, StoryObj } from "@storybook/react-vite";

import { CanvasSequence } from "@velum/react";

import { ManifestStory, STORY_MANIFEST_URLS } from "./iiifStorySupport";

const meta = {
  title: "React/CanvasSequence",
  component: CanvasSequence,
  render: (args) => (
    <ManifestStory url={STORY_MANIFEST_URLS.sequence}>
      {(manifest) => <CanvasSequence {...args} canvases={manifest.canvases.slice(0, 5)} />}
    </ManifestStory>
  ),
  args: {
    canvases: [],
    variant: "stack",
    showCaptions: true
  }
} satisfies Meta<typeof CanvasSequence>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Spaced: Story = {
  args: {
    variant: "spaced"
  }
};

export const FullBleed: Story = {
  args: {
    variant: "full-bleed"
  }
};

export const WithoutCaptions: Story = {
  args: {
    showCaptions: false
  }
};
