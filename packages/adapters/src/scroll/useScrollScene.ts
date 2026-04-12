"use client";

import { useEffect, useLayoutEffect, type RefObject } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export interface UseScrollSceneOptions extends ScrollTrigger.StaticVars {
  enabled?: boolean;
}

const useIsomorphicLayoutEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

let scrollTriggerRegistered = false;

function ensureScrollTriggerRegistered() {
  if (!scrollTriggerRegistered) {
    gsap.registerPlugin(ScrollTrigger);
    scrollTriggerRegistered = true;
  }
}

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
