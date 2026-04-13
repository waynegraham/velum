import type { ElementType, HTMLAttributes, ReactNode } from "react";

export interface ReadingColumnProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  /** Width variant (reading or narrow) */
  variant?: "reading" | "narrow";
  /** Optional polymorphic prop to override the default HTML element */
  as?: ElementType;
}

export function ReadingColumn({
  children,
  variant = "reading",
  as: Component = "div",
  style,
  ...props
}: ReadingColumnProps) {
  const layoutStyle = {
    maxWidth: `var(--velum-container-${variant}, ${variant === "narrow" ? "28rem" : "38rem"})`,
    margin: "0 auto",
    lineHeight: "var(--velum-leading-body, 1.7)",
    padding: "0 var(--velum-page-gutter, 1.5rem)",
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
