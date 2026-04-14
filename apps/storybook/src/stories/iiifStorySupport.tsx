import type { ReactNode } from "react";

import type { CanvasModel, ImageResourceModel, ManifestModel, RangeModel } from "@velum/core";
import { useManifest } from "@velum/react";

export const STORY_MANIFEST_URLS = {
  singleImage: "https://iiif.io/api/cookbook/recipe/0001-mvm-image/manifest.json",
  sequence: "https://iiif.io/api/cookbook/recipe/0009-book-1/manifest.json",
  ranges: "https://iiif.io/api/cookbook/recipe/0024-book-4-toc/manifest.json",
  annotation: "https://iiif.io/api/cookbook/recipe/0021-tagging/manifest.json"
} as const;

export const PLACEHOLDER_IMAGE: ImageResourceModel = {
  id: "about:blank"
};

export const PLACEHOLDER_CANVAS: CanvasModel = {
  id: "storybook-placeholder-canvas",
  items: [PLACEHOLDER_IMAGE],
  annotations: []
};

export const PLACEHOLDER_MANIFEST: ManifestModel = {
  id: "storybook-placeholder-manifest",
  label: "Placeholder Manifest",
  metadata: [],
  canvases: [PLACEHOLDER_CANVAS],
  ranges: []
};

export const PLACEHOLDER_RANGE: RangeModel = {
  id: "storybook-placeholder-range",
  items: []
};

interface ManifestStoryProps {
  url: string;
  children: (manifest: ManifestModel) => ReactNode;
}

export function ManifestStory({ url, children }: ManifestStoryProps) {
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

  return <>{children(manifest)}</>;
}

export function findCanvasByIndex(manifest: ManifestModel, index = 0): CanvasModel {
  const canvas = manifest.canvases[index];

  if (!canvas) {
    throw new Error(`Missing canvas at index ${index} for manifest ${manifest.id}.`);
  }

  return canvas;
}

export function findAnnotatedCanvas(manifest: ManifestModel): CanvasModel {
  const canvas = manifest.canvases.find((candidate) => candidate.annotations.length > 0);

  if (!canvas) {
    throw new Error(`No annotated canvas available for manifest ${manifest.id}.`);
  }

  return canvas;
}
