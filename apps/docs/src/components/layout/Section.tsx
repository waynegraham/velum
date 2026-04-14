import type { ElementType, HTMLAttributes, ReactNode } from "react";

import type { SectionSpace } from "./config";
import { cx } from "./utils";
import styles from "./layout.module.css";

export interface SectionProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  /** Layout width preset for the section shell. */
  variant?: "default" | "page" | "reading" | "hero" | "narrow" | "wide";
  /** Vertical rhythm preset. */
  space?: SectionSpace;
  /** Optional polymorphic component prop */
  as?: ElementType;
}

export function Section({
  children,
  variant = "default",
  space,
  as: Component = "section",
  className,
  ...props
}: SectionProps) {
  let widthClass = styles.containerPage;
  let spaceClass = styles.sectionLg;

  switch (variant) {
    case "reading":
      widthClass = styles.containerReading;
      break;
    case "narrow":
      widthClass = styles.containerNarrow;
      break;
    case "wide":
      widthClass = styles.containerWide;
      break;
    case "page":
      widthClass = styles.containerPage;
      break;
    case "hero":
      widthClass = styles.containerPage;
      spaceClass = styles.sectionHero;
      break;
    case "default":
    default:
      widthClass = styles.containerPage;
      break;
  }

  if (space) {
    switch (space) {
      case "sm":
        spaceClass = styles.sectionSm;
        break;
      case "md":
        spaceClass = styles.sectionMd;
        break;
      case "lg":
        spaceClass = styles.sectionLg;
        break;
      case "xl":
        spaceClass = styles.sectionXl;
        break;
      case "hero":
        spaceClass = styles.sectionHero;
        break;
      default:
        break;
    }
  }

  return (
    <Component
      className={cx(
        styles.container,
        widthClass,
        styles.section,
        spaceClass,
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
