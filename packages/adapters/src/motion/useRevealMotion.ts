"use client";

import { useEffect, useLayoutEffect, type RefObject } from "react";
import { gsap } from "gsap";
import type { ScrollTrigger } from "gsap/ScrollTrigger";

import { ensureScrollTriggerRegistered } from "../scroll/scrollTrigger";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

const useIsomorphicLayoutEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

export interface UseRevealMotionOptions {
  delay?: number;
  distance?: number;
  duration?: number;
  ease?: string;
  enabled?: boolean;
  once?: boolean;
  start?: ScrollTrigger.Vars["start"];
  trigger?: ScrollTrigger.Vars["trigger"];
}

export function useRevealMotion<TElement extends Element>(
  ref: RefObject<TElement | null>,
  {
    delay = 0,
    distance = 18,
    duration = 0.55,
    ease = "power2.out",
    enabled = true,
    once = true,
    start = "top 88%",
    trigger,
  }: UseRevealMotionOptions = {},
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
      gsap.set(element, { clearProps: "opacity,transform,visibility" });
      return;
    }

    ensureScrollTriggerRegistered();

    const context = gsap.context(() => {
      gsap.set(element, {
        autoAlpha: 0,
        y: distance,
      });

      gsap.to(element, {
        autoAlpha: 1,
        delay,
        duration,
        ease,
        overwrite: "auto",
        y: 0,
        scrollTrigger: {
          once,
          start,
          toggleActions: once ? "play none none none" : "play none none reverse",
          trigger: trigger ?? element,
        },
      });
    }, element);

    return () => {
      context.revert();
    };
  }, [
    delay,
    distance,
    duration,
    ease,
    enabled,
    once,
    prefersReducedMotion,
    ref,
    start,
    trigger,
  ]);

  return {
    prefersReducedMotion,
  };
}
