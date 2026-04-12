"use client";

import type { CSSProperties, ReactNode } from "react";
import type { AnnotationModel } from "@velum/core";

export interface AnnotationOverlayProps {
  /** The annotations to render overlays for */
  annotations: AnnotationModel[];
  /** Optional custom render function for each annotation */
  renderAnnotation?: (annotation: AnnotationModel) => ReactNode;
  /** Optional class name to apply to the overlay container */
  className?: string;
  /** Optional style to apply to the overlay container */
  style?: CSSProperties;
}

export function AnnotationOverlay({
  annotations,
  renderAnnotation,
  className,
  style
}: AnnotationOverlayProps) {
  if (!annotations || annotations.length === 0) {
    return null;
  }

  return (
    <div
      className={className}
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none", // Allows clicks to fall through un-annotated areas
        ...style
      }}
    >
      {annotations.map((annotation) => {
        const { region, id } = annotation;
        if (!region) return null;

        return (
          <div
            key={id}
            style={{
              position: "absolute",
              left: region.left,
              top: region.top,
              width: region.width,
              height: region.height,
              pointerEvents: "auto", // Re-enables pointer events directly on the region
              boxSizing: "border-box"
            }}
          >
            {renderAnnotation ? renderAnnotation(annotation) : null}
          </div>
        );
      })}
    </div>
  );
}
