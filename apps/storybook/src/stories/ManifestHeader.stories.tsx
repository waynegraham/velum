import type { Meta, StoryObj } from "@storybook/react-vite";

import { ManifestHeader } from "@velum/react";

import {
  ManifestStory,
  PLACEHOLDER_MANIFEST,
  STORY_MANIFEST_URLS
} from "./iiifStorySupport";

const meta = {
  title: "React/ManifestHeader",
  component: ManifestHeader,
  render: (args) => (
    <ManifestStory url={STORY_MANIFEST_URLS.sequence}>
      {(manifest) => <ManifestHeader {...args} manifest={manifest} />}
    </ManifestStory>
  ),
  args: {
    manifest: PLACEHOLDER_MANIFEST
  }
} satisfies Meta<typeof ManifestHeader>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
