import type { ElementType, HTMLAttributes, ReactNode } from "react";

import { cx } from "./utils";

import styles from "./layout.module.css";

export interface PageFrameProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  children: ReactNode;
}

export function PageFrame({
  as: Component = "main",
  children,
  className,
  ...props
}: PageFrameProps) {
  return (
    <Component className={cx(styles.pageFrame, className)} {...props}>
      {children}
    </Component>
  );
}
