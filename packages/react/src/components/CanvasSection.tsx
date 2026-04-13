"use client";

import type { ReactNode, CSSProperties } from "react";
import type { AnnotationModel, CanvasModel } from "@velum/core";
import { Section, type SectionProps } from "./Section";
import { CanvasImage } from "./CanvasImage";
import { AnnotationOverlay } from "./AnnotationOverlay";

export interface CanvasSectionProps {
  /** The normalized canvas model to represent */
  canvas: CanvasModel;
  /** Optional editorial text or children content */
  children?: ReactNode;
  /** The Section variant (default, narrow, wide, hero) */
  variant?: SectionProps["variant"];
  /** Layout strategy for media vs children (stack or split) */
  layout?: "stack" | "split";
  /** Optional custom render function for annotations */
  renderAnnotation?: (annotation: AnnotationModel) => ReactNode;
  /** Optional class name to apply to the section */
  className?: string;
  /** Optional style to apply to the section */
  style?: CSSProperties;
}

/**
 * CanvasSection is a high-level representation of a single IIIF Canvas
 * used within a page section. It integrates media, optional annotations,
 * and editorial content.
 */
export function CanvasSection({
  canvas,
  children,
  variant = "default",
  layout = "stack",
  renderAnnotation,
  className,
  style
}: CanvasSectionProps) {
  const isSplit = layout === "split";
  
  // Outer container layout styles
  const layoutStyle: CSSProperties = {
    display: isSplit ? "grid" : "flex",
    flexDirection: isSplit ? undefined : "column",
    gridTemplateColumns: isSplit && children ? "repeat(auto-fit, minmax(400px, 1fr))" : undefined,
    gap: isSplit ? "var(--velum-space-split, 4rem)" : "var(--velum-space-stack, 2rem)",
    alignItems: "start",
    ...style
  };

  const mediaContent = (
    <div style={{ position: "relative", width: "100%" }}>
      {/* We use CanvasImage for the primary media display */}
      <CanvasImage 
        canvas={canvas} 
        // We handle the caption separately at the section level if preferred
        // but for minimal UI we let CanvasImage do its work.
      />
      {/* Overlay annotations if present */}
      {canvas.annotations.length > 0 && (
        <AnnotationOverlay
          annotations={canvas.annotations}
          {...(renderAnnotation !== undefined ? { renderAnnotation } : {})}
        />
      )}
    </div>
  );

  return (
    <Section 
      variant={variant} 
      className={className} 
      style={layoutStyle}
    >
      {mediaContent}
      {children && (
        <div 
          className="velum-canvas-section-content"
          style={{ 
            marginTop: isSplit ? 0 : "1.5rem",
            maxWidth: isSplit ? undefined : "45rem" 
          }}
        >
          {children}
        </div>
      )}
    </Section>
  );
}
