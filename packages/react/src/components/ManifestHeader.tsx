"use client";

import type { CSSProperties } from "react";
import type { ManifestModel } from "@velum/core";
import { ReadingColumn } from "./layout/ReadingColumn";

export interface ManifestHeaderProps {
  /** The normalized manifest model to display */
  manifest: ManifestModel;
  /** Optional class name to apply to the header */
  className?: string;
  /** Optional style to apply to the header */
  style?: CSSProperties;
}

const headerStyle: CSSProperties = {
  paddingTop: "var(--velum-space-header-top, 8rem)",
  paddingBottom: "var(--velum-space-header-bottom, 4rem)",
};

const titleStyle: CSSProperties = {
  fontSize: "var(--velum-font-size-title, 3rem)",
  fontWeight: 400,
  letterSpacing: "-0.02em",
  margin: 0,
};

const summaryStyle: CSSProperties = {
  fontSize: "var(--velum-font-size-summary, 1.25rem)",
  marginTop: "1.5rem",
  opacity: 0.8,
};

const metadataListStyle: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "120px 1fr",
  gap: "0.5rem 1.5rem",
  marginTop: "3rem",
  fontSize: "0.875rem",
  lineHeight: 1.5,
};

const metaLabelStyle: CSSProperties = {
  fontWeight: 600,
  opacity: 0.6,
  textTransform: "uppercase",
  letterSpacing: "0.05em",
};

/**
 * ManifestHeader displays the primary metadata for a IIIF Manifest.
 * It is designed for editorial clarity and uses a reading-optimized column layout.
 */
export function ManifestHeader({
  manifest,
  className,
  style
}: ManifestHeaderProps) {
  const { label, summary, metadata } = manifest;

  return (
    <header className={className} style={{ ...headerStyle, ...style }}>
      <ReadingColumn>
        <h1 style={titleStyle}>{label}</h1>
        
        {summary && (
          <p style={summaryStyle}>{summary}</p>
        )}

        {metadata && metadata.length > 0 && (
          <dl style={metadataListStyle}>
            {metadata.map((item, index) => (
              <div key={`${item.label}-${index}`} style={{ display: "contents" }}>
                <dt style={metaLabelStyle}>{item.label}</dt>
                <dd style={{ margin: 0 }}>{item.value}</dd>
              </div>
            ))}
          </dl>
        )}
      </ReadingColumn>
    </header>
  );
}
