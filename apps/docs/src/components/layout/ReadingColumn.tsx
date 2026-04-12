import type { ElementType, HTMLAttributes, ReactNode } from "react";

import type { ContainerWidth } from "./config";
import { Container } from "./Container";

export interface ReadingColumnProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  children: ReactNode;
  width?: Extract<ContainerWidth, "narrow" | "reading" | "content">;
}

export function ReadingColumn({
  as = "div",
  children,
  className,
  width = "reading",
  ...props
}: ReadingColumnProps) {
  return (
    <Container as={as} className={className} width={width} {...props}>
      {children}
    </Container>
  );
}
