"use client";

import { useRef, type ReactNode } from "react";
import { useParallaxMotion, type UseParallaxMotionOptions } from "./useParallaxMotion";

export interface ParallaxMediaProps extends UseParallaxMotionOptions {
  children: ReactNode;
  /** Optional class name to apply to the container */
  className?: string;
  /** The component to render as the container. Defaults to 'div'. */
  as?: React.ElementType;
}

/**
 * ParallaxMedia component applies a subtle parallax effect to its children.
 * 
 * It uses the `useParallaxMotion` hook internally.
 * The movement is intentionally slow and subtle to maintain editorial elegance.
 */
export function ParallaxMedia({
  children,
  className,
  as: Component = "div",
  ...options
}: ParallaxMediaProps) {
  const containerRef = useRef<HTMLElement>(null);

  useParallaxMotion(containerRef, options);

  return (
    <Component 
      ref={containerRef} 
      className={className}
      style={{
        display: "block",
        width: "100%",
        height: "100%",
        willChange: "transform"
      }}
    >
      {children}
    </Component>
  );
}
