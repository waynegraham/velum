import type { ReactNode } from "react";
import type { CanvasModel } from "@velum/core";
import { ManifestImage } from "./ManifestImage";

export interface CanvasImageProps {
  /** The normalized canvas model */
  canvas: CanvasModel;
  /** Explicit caption. If omitted, falls back to the canvas label. Pass null to disable. */
  caption?: ReactNode;
  /** Optional class name to apply to the wrapper */
  className?: string;
}

export function CanvasImage({
  canvas,
  caption,
  className,
}: CanvasImageProps) {
  const image = canvas.items[0];

  if (!image) {
    return null;
  }
  
  // If no caption is explicitly provided, we default to the canvas label (if it exists).
  // If the consumer passes `null` explicitly, it will not render a caption.
  const displayCaption = caption !== undefined ? caption : canvas.label;

  return (
    <ManifestImage
      image={image}
      caption={displayCaption}
      alt={canvas.label}
      className={className}
    />
  );
}
