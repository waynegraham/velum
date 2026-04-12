import type { ElementType, HTMLAttributes, ReactNode } from "react";

import type { ContainerWidth } from "./config";
import { Container } from "./Container";
import { cx } from "./utils";

import styles from "./layout.module.css";

export interface MediaFrameProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  children: ReactNode;
  width?: Extract<ContainerWidth, "content" | "media" | "page" | "full">;
}

export function MediaFrame({
  as = "figure",
  children,
  className,
  width = "media",
  ...props
}: MediaFrameProps) {
  return (
    <Container
      as={as}
      className={cx(styles.mediaFrame, className)}
      width={width}
      {...props}
    >
      {children}
    </Container>
  );
}
