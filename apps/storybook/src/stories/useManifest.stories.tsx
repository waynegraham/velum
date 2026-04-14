import type { Meta, StoryObj } from "@storybook/react-vite";

import { CanvasSequence, ManifestHeader, useManifest } from "@velum/react";

import { STORY_MANIFEST_URLS } from "./iiifStorySupport";

function UseManifestDemo({ url }: { url: string }) {
  const { manifest, isLoading, error } = useManifest(url);

  if (isLoading) {
    return <p>Loading manifest...</p>;
  }

  if (error) {
    return <p>{error.message}</p>;
  }

  if (!manifest) {
    return <p>No manifest loaded.</p>;
  }

  return (
    <div className="stack-4">
      <ManifestHeader
        manifest={manifest}
        style={{ paddingTop: 0, paddingBottom: "2rem" }}
      />
      <CanvasSequence canvases={manifest.canvases} />
    </div>
  );
}

const meta = {
  title: "React/Hooks/useManifest",
  component: UseManifestDemo,
  args: {
    url: STORY_MANIFEST_URLS.sequence
  }
} satisfies Meta<typeof UseManifestDemo>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
