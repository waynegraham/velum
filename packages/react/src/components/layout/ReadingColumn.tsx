import type { ElementType, HTMLAttributes, ReactNode } from "react";

export interface ReadingColumnProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  /** Optional polymorphic prop to override the default HTML element */
  as?: ElementType;
}

export function ReadingColumn({
  children,
  as: Component = "div",
  style,
  ...props
}: ReadingColumnProps) {
  const layoutStyle = {
    maxWidth: "var(--velum-reading-width, 45rem)",
    margin: "0 auto",
    lineHeight: "var(--velum-reading-line-height, 1.6)",
    padding: "0 var(--velum-space-inline, 1.5rem)",
    ...style,
  };

  return (
    <Component
      data-velum-component="ReadingColumn"
      style={layoutStyle}
      {...props}
    >
      {children}
    </Component>
  );
}
