"use client";

import type { CSSProperties, ReactNode } from "react";

import type { AnnotationModel, CanvasModel } from "@velum/core";

export interface AnnotatedCanvasProps {
  canvas: CanvasModel;
  renderAnnotation?: (annotation: AnnotationModel) => ReactNode;
}

const overlayStyle: CSSProperties = {
  position: "absolute",
  border: "2px solid currentColor",
  boxSizing: "border-box",
  color: "#d92d20"
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
  whiteSpace: "nowrap"
};

export function AnnotatedCanvas({
  canvas,
  renderAnnotation
}: AnnotatedCanvasProps) {
  const image = canvas.items[0];

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
          <div style={{ position: "absolute", inset: 0 }}>
            {canvas.annotations.map((annotation) => {
              const { region, label, id } = annotation;
              if (!region) return null;

              return (
                <div
                  key={id}
                  style={{
                    ...overlayStyle,
                    left: region.left,
                    top: region.top,
                    width: region.width,
                    height: region.height
                  }}
                >
                  {renderAnnotation ? renderAnnotation(annotation) : null}
                  {!renderAnnotation && label ? (
                    <span style={labelStyle}>{label}</span>
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>
      ) : null}
      {canvas.label ? (
        <figcaption style={{ marginTop: "0.75rem" }}>{canvas.label}</figcaption>
      ) : null}
    </figure>
  );
}
