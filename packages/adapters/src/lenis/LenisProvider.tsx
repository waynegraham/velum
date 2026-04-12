"use client";

import { ReactLenis } from "lenis/react";
import "lenis/dist/lenis.css";
import type { PropsWithChildren } from "react";

export function LenisProvider({ children }: PropsWithChildren) {
  return <ReactLenis root>{children}</ReactLenis>;
}