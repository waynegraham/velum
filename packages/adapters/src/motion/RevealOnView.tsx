"use client";

import { useRef, type ReactNode } from "react";
import { useRevealMotion, type UseRevealMotionOptions } from "./useRevealMotion";

export interface RevealOnViewProps extends UseRevealMotionOptions {
  children: ReactNode;
  /** Optional class name to apply to the container */
  className?: string;
  /** The component to render as the container. Defaults to 'div'. */
  as?: React.ElementType;
}

/**
 * RevealOnView component reveals its children when they enter the viewport.
 * 
 * It applies a subtle fade and translation effect using GSAP.
 * It automatically respects `prefers-reduced-motion` via the underlying hook.
 */
export function RevealOnView({
  children,
  className,
  as: Component = "div",
  ...options
}: RevealOnViewProps) {
  const containerRef = useRef<HTMLElement>(null);

  useRevealMotion(containerRef, options);

  return (
    <Component ref={containerRef} className={className}>
      {children}
    </Component>
  );
}
