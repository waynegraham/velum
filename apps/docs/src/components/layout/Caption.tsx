import type { ElementType, HTMLAttributes, ReactNode } from "react";

import { cx } from "./utils";

import styles from "./layout.module.css";

export interface CaptionProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  children: ReactNode;
}

export function Caption({
  as: Component = "p",
  children,
  className,
  ...props
}: CaptionProps) {
  return (
    <Component className={cx(styles.caption, className)} {...props}>
      {children}
    </Component>
  );
}
