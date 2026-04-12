"use client";

import { useEffect, useLayoutEffect, type RefObject } from "react";
import { gsap } from "gsap";
import type { ScrollTrigger } from "gsap/ScrollTrigger";

import { ensureScrollTriggerRegistered } from "../scroll/scrollTrigger";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

const useIsomorphicLayoutEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

export interface UseParallaxMotionOptions {
  distance?: number;
  enabled?: boolean;
  end?: ScrollTrigger.Vars["end"];
  scrub?: ScrollTrigger.Vars["scrub"];
  start?: ScrollTrigger.Vars["start"];
  trigger?: ScrollTrigger.Vars["trigger"];
}

export function useParallaxMotion<TElement extends Element>(
  ref: RefObject<TElement | null>,
  {
    distance = 20,
    enabled = true,
    end = "bottom top",
    scrub = 0.8,
    start = "top bottom",
    trigger,
  }: UseParallaxMotionOptions = {},
) {
  const prefersReducedMotion = usePrefersReducedMotion();

  useIsomorphicLayoutEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const element = ref.current;

    if (!element) {
      return;
    }

    if (prefersReducedMotion || !enabled) {
      gsap.set(element, { clearProps: "transform" });
      return;
    }

    ensureScrollTriggerRegistered();

    const context = gsap.context(() => {
      gsap.fromTo(
        element,
        { y: distance },
        {
          ease: "none",
          overwrite: "auto",
          y: distance * -1,
          scrollTrigger: {
            end,
            scrub,
            start,
            trigger: trigger ?? element,
          },
        },
      );
    }, element);

    return () => {
      context.revert();
    };
  }, [distance, enabled, end, prefersReducedMotion, ref, scrub, start, trigger]);

  return {
    prefersReducedMotion,
  };
}
