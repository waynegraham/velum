"use client";

import type { CanvasModel } from "@velum/core";

export interface CanvasSequenceProps {
  canvases: CanvasModel[];
}

export function CanvasSequence({ canvases }: CanvasSequenceProps) {
  return (
    <div style={{ display: "grid", gap: "2rem" }}>
      {canvases.map((canvas) => {
        const image = canvas.items[0];

        return (
          <figure key={canvas.id} style={{ margin: 0 }}>
            {image ? (
              <img
                src={image.id}
                alt={canvas.label ?? ""}
                style={{ width: "100%", height: "auto", display: "block" }}
              />
            ) : null}
            {canvas.label ? (
              <figcaption style={{ marginTop: "0.75rem" }}>{canvas.label}</figcaption>
            ) : null}
          </figure>
        );
      })}
    </div>
  );
}