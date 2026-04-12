import type { CSSProperties } from "react";
import type { CanvasModel } from "@velum/core";
import { CanvasImage } from "./CanvasImage";

export interface CanvasSequenceProps {
  canvases: CanvasModel[];
  variant?: "stack" | "spaced" | "full-bleed";
  showCaptions?: boolean;
  className?: string;
  style?: CSSProperties;
}

const VARIANTS = {
  stack: { gap: "1.5rem" },
  spaced: { gap: "6rem" },
  "full-bleed": { gap: "0" }
};

export function CanvasSequence({
  canvases,
  variant = "stack",
  showCaptions = true,
  className,
  style
}: CanvasSequenceProps) {
  const containerStyle: CSSProperties = {
    display: "grid",
    gap: VARIANTS[variant].gap,
    ...style
  };

  return (
    <div className={className} style={containerStyle}>
      {canvases.map((canvas) => (
        <CanvasImage
          key={canvas.id}
          canvas={canvas}
          caption={showCaptions ? undefined : null}
        />
      ))}
    </div>
  );
}