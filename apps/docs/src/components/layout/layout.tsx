import type { ElementType, HTMLAttributes, ReactNode } from "react";

import styles from "./layout.module.css";

export const containerWidths = {
  narrow: "Tight reading width for labels, headings, and short notes.",
  reading: "Default prose measure for body copy.",
  wide: "Expanded reading width for richer supporting copy.",
  page: "Full docs content width for multi-column sections and demos.",
  full: "Viewport-aware width with page gutters preserved.",
} as const;

export const sectionSpacing = {
  sm: "Use for compact supporting sections.",
  md: "Use for regular document sections.",
  lg: "Use for major content transitions.",
  xl: "Use for primary page sections that need more pause between beats.",
  hero: "Use for opening sections that establish the page rhythm.",
} as const;

export type ContainerWidth = keyof typeof containerWidths;
export type SectionSpace = keyof typeof sectionSpacing;

export interface ContainerProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  children: ReactNode;
  width?: ContainerWidth;
}

export interface SectionProps extends ContainerProps {
  divider?: boolean;
  space?: SectionSpace;
}

function cx(...classNames: Array<string | undefined | false>) {
  return classNames.filter(Boolean).join(" ");
}

const containerClassNames: Record<ContainerWidth, string> = {
  narrow: styles.containerNarrow ?? "",
  reading: styles.containerReading ?? "",
  wide: styles.containerWide ?? "",
  page: styles.containerPage ?? "",
  full: styles.containerFull ?? "",
};

const sectionClassNames: Record<SectionSpace, string> = {
  sm: styles.sectionSm ?? "",
  md: styles.sectionMd ?? "",
  lg: styles.sectionLg ?? "",
  xl: styles.sectionXl ?? "",
  hero: styles.sectionHero ?? "",
};

export function Container({
  as: Component = "div",
  children,
  className,
  width = "page",
  ...props
}: ContainerProps) {
  return (
    <Component
      className={cx(styles.container, containerClassNames[width], className)}
      {...props}
    >
      {children}
    </Component>
  );
}

export function Section({
  as: Component = "section",
  children,
  className,
  divider = false,
  space = "lg",
  width = "page",
  ...props
}: SectionProps) {
  return (
    <Component
      className={cx(
        styles.container,
        containerClassNames[width],
        styles.section,
        sectionClassNames[space],
        divider && styles.divider,
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
