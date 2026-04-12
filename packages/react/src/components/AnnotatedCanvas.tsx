"use client";

import type { CSSProperties, ReactNode } from "react";

import type { AnnotationModel, CanvasModel } from "@velum/core";

export interface AnnotatedCanvasProps {
  canvas: CanvasModel;
  renderAnnotation?: (annotation: AnnotationModel) => ReactNode;
}

interface AnnotationRegion {
  left: string;
  top: string;
  width: string;
  height: string;
}

function formatPercent(value: number): string {
  return `${value}%`;
}

function parseAnnotationRegion(
  target: string,
  canvas: CanvasModel
): AnnotationRegion | null {
  const fragmentIndex = target.indexOf("#");
  if (fragmentIndex === -1) return null;

  const fragment = target.slice(fragmentIndex + 1);
  const match = /^xywh=(percent:)?([^,]+),([^,]+),([^,]+),([^,]+)$/.exec(fragment);
  if (!match) return null;

  const [, percentPrefix, rawX, rawY, rawWidth, rawHeight] = match;
  const x = Number(rawX);
  const y = Number(rawY);
  const width = Number(rawWidth);
  const height = Number(rawHeight);

  if ([x, y, width, height].some((value) => Number.isNaN(value))) {
    return null;
  }

  if (percentPrefix) {
    return {
      left: formatPercent(x),
      top: formatPercent(y),
      width: formatPercent(width),
      height: formatPercent(height)
    };
  }

  if (canvas.width && canvas.height) {
    return {
      left: formatPercent((x / canvas.width) * 100),
      top: formatPercent((y / canvas.height) * 100),
      width: formatPercent((width / canvas.width) * 100),
      height: formatPercent((height / canvas.height) * 100)
    };
  }

  return {
    left: `${x}px`,
    top: `${y}px`,
    width: `${width}px`,
    height: `${height}px`
  };
}

function readAnnotationLabel(body: AnnotationModel["body"]): string | null {
  if (typeof body === "string") return body;
  if (!body || typeof body !== "object") return null;

  const value = (body as Record<string, unknown>).value;
  return typeof value === "string" ? value : null;
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
              const region = parseAnnotationRegion(annotation.target, canvas);
              if (!region) return null;

              const label = readAnnotationLabel(annotation.body);

              return (
                <div
                  key={annotation.id}
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
