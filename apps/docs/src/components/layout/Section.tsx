import type { ElementType, HTMLAttributes, ReactNode } from "react";

import type { ContainerWidth, SectionSpace } from "./config";
import { cx } from "./utils";

import styles from "./layout.module.css";

export interface SectionProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  children: ReactNode;
  divider?: boolean;
  space?: SectionSpace;
  width?: ContainerWidth;
}

const containerClassNames: Record<ContainerWidth, string> = {
  narrow: styles.containerNarrow ?? "",
  reading: styles.containerReading ?? "",
  content: styles.containerContent ?? "",
  media: styles.containerMedia ?? "",
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
