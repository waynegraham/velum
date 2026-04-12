"use client";

import type { CSSProperties, ReactNode } from "react";

import type { AnnotationModel, CanvasModel } from "@velum/core";
import { AnnotationOverlay } from "./AnnotationOverlay";

export interface AnnotatedCanvasProps {
  canvas: CanvasModel;
  renderAnnotation?: (annotation: AnnotationModel) => ReactNode;
}

const overlayStyle: CSSProperties = {
  position: "absolute",
  inset: 0,
  border: "2px solid currentColor",
  boxSizing: "border-box",
  color: "#d92d20",
  pointerEvents: "none"
};

const labelStyle: CSSProperties = {
  position: "absolute",
  top: 0,
  left: 0,
  transform: "translateY(-100%)",
  backgroundColor: "currentColor",
  color: "#ffffff",
  fontSize: "0.75rem",
  lineHeight: 1.2,
  padding: "0.25rem 0.375rem",
  whiteSpace: "nowrap",
  pointerEvents: "auto"
};

export function AnnotatedCanvas({
  canvas,
  renderAnnotation
}: AnnotatedCanvasProps) {
  const image = canvas.items[0];

  const defaultRenderAnnotation = (annotation: AnnotationModel) => {
    return (
      <div style={overlayStyle}>
        {annotation.label ? (
          <span style={labelStyle}>{annotation.label}</span>
        ) : null}
      </div>
    );
  };

  return (
    <figure style={{ margin: 0 }}>
      {image ? (
        <div
          style={{
            position: "relative",
            width: "100%",
            ...(canvas.width && canvas.height
              ? { aspectRatio: `${canvas.width} / ${canvas.height}` }
              : {})
          }}
        >
          <img
            src={image.id}
            alt={canvas.label ?? ""}
            style={{ width: "100%", height: "auto", display: "block" }}
          />
          <AnnotationOverlay
            annotations={canvas.annotations}
            renderAnnotation={renderAnnotation ?? defaultRenderAnnotation}
          />
        </div>
      ) : null}
      {canvas.label ? (
        <figcaption style={{ marginTop: "0.75rem" }}>{canvas.label}</figcaption>
      ) : null}
    </figure>
  );
}
