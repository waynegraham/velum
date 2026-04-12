import type { ElementType, HTMLAttributes, ReactNode } from "react";

export interface MediaFrameProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  /** Optional caption to render below the media */
  caption?: ReactNode;
  /** Optional polymorphic prop to override the default HTML element */
  as?: ElementType;
}

export function MediaFrame({
  children,
  caption,
  as: Component = "figure",
  style,
  ...props
}: MediaFrameProps) {
  const layoutStyle = {
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    margin: "var(--velum-space-section, 4rem) auto",
    width: "100%",
    ...style,
  };

  const captionStyle = {
    marginTop: "var(--velum-space-inline, 1.5rem)",
    textAlign: "center" as const,
    color: "var(--velum-color-text-muted, #666)", // Typography-first minimal look
    fontSize: "var(--velum-font-size-small, 0.875rem)",
    maxWidth: "var(--velum-reading-width, 45rem)", // Ensure caption is readable
  };

  return (
    <Component
      data-velum-component="MediaFrame"
      style={layoutStyle}
      {...props}
    >
      {children}
      {!!caption && (
        <figcaption style={captionStyle}>
          {caption}
        </figcaption>
      )}
    </Component>
  );
}
