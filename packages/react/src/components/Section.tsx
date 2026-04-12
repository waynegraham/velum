import type { ElementType, HTMLAttributes, ReactNode } from "react";

export interface SectionProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  /** Layout width and vertical rhythm variant */
  variant?: "default" | "hero" | "narrow" | "wide";
  /** Optional polymorphic prop to override the default HTML element */
  as?: ElementType;
}

export function Section({
  children,
  variant = "default",
  as: Component = "section",
  style,
  ...props
}: SectionProps) {
  // Define un-opinionated default widths that can be overridden via custom properties
  const maxWidths = {
    narrow: "600px",
    default: "800px",
    wide: "1200px",
    hero: "100%",
  };

  const layoutStyle = {
    margin: "0 auto",
    width: "100%",
    maxWidth: `var(--velum-container-${variant}, ${maxWidths[variant]})`,
    paddingTop: variant === "hero" 
      ? "var(--velum-space-hero, 4rem)" 
      : "var(--velum-space-section, 6rem)",
    paddingBottom: "var(--velum-space-section, 6rem)",
    ...style,
  };

  return (
    <Component
      data-velum-component="Section"
      data-velum-variant={variant}
      style={layoutStyle}
      {...props}
    >
      {children}
    </Component>
  );
}
