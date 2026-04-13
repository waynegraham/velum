import type { ReactNode } from "react";

interface EyebrowProps {
  children: ReactNode;
  className?: string;
}

/**
 * Eyebrow component for small uppercase labels above headings.
 * Adheres to the editorial design language: small caps, tracking, and muted color.
 */
export function Eyebrow({ children, className = "" }: EyebrowProps) {
  return (
    <span className={`text-label inline-block mb-3 ${className}`}>
      {children}
    </span>
  );
}
