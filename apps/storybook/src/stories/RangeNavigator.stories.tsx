import type { Meta, StoryObj } from "@storybook/react-vite";

import { RangeNavigator } from "@velum/react";

import {
  ManifestStory,
  PLACEHOLDER_RANGE,
  STORY_MANIFEST_URLS
} from "./iiifStorySupport";

const meta = {
  title: "React/RangeNavigator",
  component: RangeNavigator,
  render: (args) => (
    <ManifestStory url={STORY_MANIFEST_URLS.ranges}>
      {(manifest) => {
        const selectedRange = manifest.ranges[0];

        return (
          <RangeNavigator
            {...args}
            ranges={manifest.ranges}
            {...(selectedRange ? { selectedRangeId: selectedRange.id } : {})}
          />
        );
      }}
    </ManifestStory>
  ),
  args: {
    ranges: [PLACEHOLDER_RANGE]
  }
} satisfies Meta<typeof RangeNavigator>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Unselected: Story = {
  args: {
    ranges: [PLACEHOLDER_RANGE]
  },
  render: () => (
    <ManifestStory url={STORY_MANIFEST_URLS.ranges}>
      {(manifest) => <RangeNavigator ranges={manifest.ranges} />}
    </ManifestStory>
  )
};
