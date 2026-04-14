import type { Meta, StoryObj } from "@storybook/react-vite";

import { CanvasImage } from "@velum/react";

import {
  findCanvasByIndex,
  ManifestStory,
  PLACEHOLDER_CANVAS,
  STORY_MANIFEST_URLS
} from "./iiifStorySupport";

const meta = {
  title: "React/CanvasImage",
  component: CanvasImage,
  render: (args) => (
    <ManifestStory url={STORY_MANIFEST_URLS.singleImage}>
      {(manifest) => <CanvasImage {...args} canvas={findCanvasByIndex(manifest)} />}
    </ManifestStory>
  ),
  args: {
    canvas: PLACEHOLDER_CANVAS
  }
} satisfies Meta<typeof CanvasImage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithoutCaption: Story = {
  args: {
    caption: null
  }
};
