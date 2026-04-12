"use client";

import { useRef, type ReactNode } from "react";
import { useScrollScene, type UseScrollSceneOptions } from "./useScrollScene";

export interface ScrollSceneProps extends UseScrollSceneOptions {
  children: ReactNode;
  /** Optional class name to apply to the container */
  className?: string;
  /** The component to render as the container. Defaults to 'div'. */
  as?: React.ElementType;
}

/**
 * ScrollScene component provides a declarative way to wrap content
 * and hook it into a GSAP ScrollTrigger scene.
 * 
 * It uses the `useScrollScene` hook internally.
 */
export function ScrollScene({ 
  children, 
  className, 
  as: Component = "div",
  ...options 
}: ScrollSceneProps) {
  const containerRef = useRef<HTMLElement>(null);
  
  useScrollScene(containerRef, options);

  return (
    <Component ref={containerRef} className={className}>
      {children}
    </Component>
  );
}
