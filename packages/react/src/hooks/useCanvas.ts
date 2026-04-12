"use client";

import { useMemo } from "react";
import type { CanvasModel, ManifestModel } from "@velum/core";

export function useCanvas(
  manifest: ManifestModel,
  canvasId: string
): CanvasModel | null {
  return useMemo(
    () => manifest.canvases.find((canvas) => canvas.id === canvasId) ?? null,
    [manifest, canvasId]
  );
}
