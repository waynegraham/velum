import type { Meta, StoryObj } from "@storybook/react-vite";

import { CanvasImage, useCanvas, useManifest } from "@velum/react";

import { STORY_MANIFEST_URLS } from "./iiifStorySupport";

function UseCanvasDemo({ url, canvasIndex }: { url: string; canvasIndex: number }) {
  const { manifest, isLoading, error } = useManifest(url);

  if (isLoading) {
    return <p>Loading manifest...</p>;
  }

  if (error) {
    return <p>Unable to load manifest: {error.message}</p>;
  }

  if (!manifest) {
    return <p>No manifest loaded.</p>;
  }

  const canvasId = manifest.canvases[canvasIndex]?.id;
  const canvas = useCanvas(manifest, canvasId ?? "");

  if (!canvas) {
    return <p>Canvas not found.</p>;
  }

  return <CanvasImage canvas={canvas} />;
}

const meta = {
  title: "React/Hooks/useCanvas",
  component: UseCanvasDemo
} satisfies Meta<typeof UseCanvasDemo>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    url: STORY_MANIFEST_URLS.sequence,
    canvasIndex: 1
  }
};
