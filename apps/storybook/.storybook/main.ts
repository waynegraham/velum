import path, { dirname } from "node:path";
import { fileURLToPath } from "node:url";

import type { StorybookConfig } from "@storybook/react-vite";

const currentDir = path.dirname(fileURLToPath(import.meta.url));
const workspaceRoot = path.resolve(currentDir, "../../..");

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(ts|tsx)"],
  addons: [getAbsolutePath("@storybook/addon-docs")],

  framework: {
    name: getAbsolutePath("@storybook/react-vite"),
    options: {}
  },

  viteFinal: async (config) => {
    return {
      ...config,
      server: {
        ...config.server,
        fs: {
          ...(config.server?.fs ?? {}),
          allow: [
            ...(config.server?.fs?.allow ?? []),
            workspaceRoot
          ]
        }
      }
    };
  }
};

export default config;

function getAbsolutePath(value: string): any {
  return dirname(fileURLToPath(import.meta.resolve(`${value}/package.json`)));
}
