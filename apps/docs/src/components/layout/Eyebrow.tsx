import type { ElementType, HTMLAttributes, ReactNode } from "react";

import { cx } from "./utils";

import styles from "./layout.module.css";

export interface EyebrowProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  children: ReactNode;
}

export function Eyebrow({
  as: Component = "p",
  children,
  className,
  ...props
}: EyebrowProps) {
  return (
    <Component className={cx(styles.eyebrow, className)} {...props}>
      {children}
    </Component>
  );
}
