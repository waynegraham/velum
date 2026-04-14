import "@velum/styles";

import "./preview.css";

import type { Preview } from "@storybook/react-vite";

const preview: Preview = {
  parameters: {
    layout: "fullscreen",
    controls: {
      expanded: false
    }
  }
};

export default preview;
