import type { Meta, StoryObj } from "@storybook/react-vite";

import { AnnotationOverlay } from "@velum/react";

import {
  findAnnotatedCanvas,
  ManifestStory,
  PLACEHOLDER_CANVAS,
  STORY_MANIFEST_URLS
} from "./iiifStorySupport";

const meta = {
  title: "React/AnnotationOverlay",
  component: AnnotationOverlay,
  args: {
    annotations: PLACEHOLDER_CANVAS.annotations,
    renderAnnotation: (annotation) => (
      <div
        style={{
          width: "100%",
          height: "100%",
          border: "2px solid currentColor",
          boxSizing: "border-box",
          color: "#d92d20"
        }}
        title={annotation.label ?? undefined}
      />
    )
  },
  render: (args) => (
    <ManifestStory url={STORY_MANIFEST_URLS.annotation}>
      {(manifest) => {
        const canvas = findAnnotatedCanvas(manifest);
        const image = canvas.items[0];

        if (!image) {
          throw new Error(`Missing image resource for canvas ${canvas.id}.`);
        }

        return (
          <div
            style={{
              position: "relative",
              width: "100%",
              maxWidth: "40rem",
              aspectRatio:
                canvas.width && canvas.height
                  ? `${canvas.width} / ${canvas.height}`
                  : undefined
            }}
          >
            <img
              src={image.id}
              alt={canvas.label ?? ""}
              style={{ width: "100%", height: "100%", display: "block", objectFit: "cover" }}
            />
            <AnnotationOverlay {...args} annotations={canvas.annotations} />
          </div>
        );
      }}
    </ManifestStory>
  )
} satisfies Meta<typeof AnnotationOverlay>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
