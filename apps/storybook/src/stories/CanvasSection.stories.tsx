import type { Meta, StoryObj } from "@storybook/react-vite";

import { CanvasSection } from "@velum/react";

import {
  findCanvasByIndex,
  ManifestStory,
  PLACEHOLDER_CANVAS,
  STORY_MANIFEST_URLS
} from "./iiifStorySupport";

const meta = {
  title: "React/CanvasSection",
  component: CanvasSection,
  render: (args) => (
    <ManifestStory url={STORY_MANIFEST_URLS.annotation}>
      {(manifest) => <CanvasSection {...args} canvas={findCanvasByIndex(manifest)} />}
    </ManifestStory>
  ),
  args: {
    canvas: PLACEHOLDER_CANVAS,
    layout: "split",
    children: "Contextual interpretation for the selected canvas."
  }
} satisfies Meta<typeof CanvasSection>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Stack: Story = {
  args: {
    layout: "stack"
  }
};
