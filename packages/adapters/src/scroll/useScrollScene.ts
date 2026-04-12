"use client";

import { useEffect, useLayoutEffect, type RefObject } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { ensureScrollTriggerRegistered } from "./scrollTrigger";

export interface UseScrollSceneOptions extends ScrollTrigger.Vars {
  enabled?: boolean;
}

const useIsomorphicLayoutEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

export function useScrollScene<TElement extends Element>(
  ref: RefObject<TElement | null>,
  options: UseScrollSceneOptions = {},
) {
  useIsomorphicLayoutEffect(() => {
    if (typeof window === "undefined" || options.enabled === false) {
      return;
    }

    const element = ref.current;

    if (!element) {
      return;
    }

    ensureScrollTriggerRegistered();

    const trigger = ScrollTrigger.create({
      ...options,
      trigger: options.trigger ?? element,
    });

    return () => {
      trigger.kill();
    };
  }, [options, ref]);
}
