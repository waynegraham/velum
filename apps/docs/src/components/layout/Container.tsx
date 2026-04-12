import type { ElementType, HTMLAttributes, ReactNode } from "react";

import type { ContainerWidth } from "./config";
import { cx } from "./utils";

import styles from "./layout.module.css";

export interface ContainerProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  children: ReactNode;
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
