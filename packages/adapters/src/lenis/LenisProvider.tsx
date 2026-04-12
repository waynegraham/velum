"use client";

import { ReactLenis } from "lenis/react";
import type { LenisOptions } from "lenis";
import type { PropsWithChildren } from "react";

export interface LenisProviderProps extends PropsWithChildren {
  options?: LenisOptions;
}

export function LenisProvider({
  children,
  options,
}: LenisProviderProps) {
  return <ReactLenis {...(options ? { options } : {})}>{children}</ReactLenis>;
}
