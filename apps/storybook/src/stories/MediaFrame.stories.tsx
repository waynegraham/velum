import type { Meta, StoryObj } from "@storybook/react-vite";

import { MediaFrame } from "@velum/react";

import {
  findCanvasByIndex,
  ManifestStory,
  STORY_MANIFEST_URLS
} from "./iiifStorySupport";

const meta = {
  title: "React/Layout/MediaFrame",
  component: MediaFrame,
  render: (args) => (
    <ManifestStory url={STORY_MANIFEST_URLS.singleImage}>
      {(manifest) => {
        const canvas = findCanvasByIndex(manifest);
        const image = canvas.items[0];

        if (!image) {
          throw new Error(`Missing image resource for canvas ${canvas.id}.`);
        }

        return (
          <MediaFrame
            {...args}
            {...(canvas.label ? { caption: canvas.label } : {})}
          >
            <img
              src={image.id}
              alt={canvas.label ?? ""}
              style={{ width: "100%", maxWidth: "40rem", display: "block" }}
            />
          </MediaFrame>
        );
      }}
    </ManifestStory>
  ),
  args: {
    children: null
  }
} satisfies Meta<typeof MediaFrame>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
