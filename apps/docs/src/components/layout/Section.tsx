import type { ElementType, HTMLAttributes, ReactNode } from "react";
import { cx } from "./utils";
import styles from "./layout.module.css";

export interface SectionProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  /** Layout variant. Combines width and vertical rhythm into standard presets. */
  variant?: "default" | "hero" | "narrow" | "wide";
  /** Optional polymorphic component prop */
  as?: ElementType;
}

export function Section({
  children,
  variant = "default",
  as: Component = "section",
  className,
  ...props
}: SectionProps) {
  let widthClass = styles.containerReading;
  let spaceClass = styles.sectionLg;

  switch (variant) {
    case "narrow":
      widthClass = styles.containerNarrow;
      break;
    case "wide":
      widthClass = styles.containerWide;
      break;
    case "hero":
      widthClass = styles.containerPage;
      spaceClass = styles.sectionHero;
      break;
    case "default":
    default:
      widthClass = styles.containerReading;
      break;
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
