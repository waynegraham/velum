import type { Meta, StoryObj } from "@storybook/react-vite";

import { AnnotatedCanvas } from "@velum/react";

import {
  findAnnotatedCanvas,
  ManifestStory,
  PLACEHOLDER_CANVAS,
  STORY_MANIFEST_URLS
} from "./iiifStorySupport";

const meta = {
  title: "React/AnnotatedCanvas",
  component: AnnotatedCanvas,
  render: (args) => (
    <ManifestStory url={STORY_MANIFEST_URLS.annotation}>
      {(manifest) => <AnnotatedCanvas {...args} canvas={findAnnotatedCanvas(manifest)} />}
    </ManifestStory>
  ),
  args: {
    canvas: PLACEHOLDER_CANVAS
  }
} satisfies Meta<typeof AnnotatedCanvas>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const CustomAnnotation: Story = {
  args: {
    renderAnnotation: (annotation) => (
      <div
        style={{
          width: "100%",
          height: "100%",
          border: "3px solid #8f6f4f",
          boxSizing: "border-box",
          background: "color-mix(in srgb, #8f6f4f 14%, transparent 86%)",
          position: "relative"
        }}
      >
        {annotation.label ? (
          <span
            style={{
              position: "absolute",
              left: 0,
              bottom: 0,
              background: "#8f6f4f",
              color: "#fff",
              fontSize: "0.75rem",
              lineHeight: 1.2,
              padding: "0.25rem 0.375rem"
            }}
          >
            {annotation.label}
          </span>
        ) : null}
      </div>
    )
  }
};
