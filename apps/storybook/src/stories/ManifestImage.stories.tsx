import type { Meta, StoryObj } from "@storybook/react-vite";

import { ManifestImage } from "@velum/react";

import {
  findCanvasByIndex,
  ManifestStory,
  PLACEHOLDER_IMAGE,
  STORY_MANIFEST_URLS
} from "./iiifStorySupport";

const meta = {
  title: "React/ManifestImage",
  component: ManifestImage,
  render: (args) => (
    <ManifestStory url={STORY_MANIFEST_URLS.singleImage}>
      {(manifest) => {
        const canvas = findCanvasByIndex(manifest);
        const image = canvas.items[0];

        if (!image) {
          throw new Error(`Missing image resource for canvas ${canvas.id}.`);
        }

        return (
          <ManifestImage
            {...args}
            image={image}
            {...(canvas.label ? { alt: canvas.label, caption: canvas.label } : {})}
          />
        );
      }}
    </ManifestStory>
  ),
  args: {
    image: PLACEHOLDER_IMAGE
  }
} satisfies Meta<typeof ManifestImage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
