"use client";

import { useEffect, useEffectEvent, useRef } from "react";

import type { CanvasModel } from "@velum/core";
import { usePrefersReducedMotion, useScrollScene } from "@velum/adapters";
import { CanvasSequence } from "@velum/react";

import styles from "./NarrativeCanvasSequence.module.css";

interface NarrativeCanvasSequenceProps {
  canvases: CanvasModel[];
}

function setAllFiguresVisible(element: HTMLElement) {
  const figures = element.querySelectorAll("figure");

  figures.forEach((figure) => {
    figure.setAttribute("data-state", "active");
  });
}

export function NarrativeCanvasSequence({
  canvases,
}: NarrativeCanvasSequenceProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  const syncFigureStates = useEffectEvent(() => {
    const root = rootRef.current;

    if (!root) {
      return;
    }

    if (prefersReducedMotion) {
      setAllFiguresVisible(root);
      return;
    }

    const viewportHeight = window.innerHeight;
    const focusLine = viewportHeight * 0.56;
    const activationRange = viewportHeight * 0.24;
    const figures = root.querySelectorAll("figure");

    figures.forEach((figure) => {
      const bounds = figure.getBoundingClientRect();
      const figureCenter = bounds.top + bounds.height / 2;
      const isVisible =
        bounds.bottom > viewportHeight * 0.14 &&
        bounds.top < viewportHeight * 0.88 &&
        Math.abs(figureCenter - focusLine) < activationRange;

      figure.setAttribute("data-state", isVisible ? "active" : "idle");
    });
  });

  useEffect(() => {
    const root = rootRef.current;

    if (!root) {
      return;
    }

    syncFigureStates();
  }, [syncFigureStates, prefersReducedMotion, canvases]);

  const scrollSceneOptions = {
    enabled: !prefersReducedMotion,
    start: "top bottom",
    end: "bottom top",
    onEnter: syncFigureStates,
    onEnterBack: syncFigureStates,
    onLeave: syncFigureStates,
    onLeaveBack: syncFigureStates,
    onRefresh: syncFigureStates,
    onUpdate: syncFigureStates,
  } as Parameters<typeof useScrollScene<HTMLDivElement>>[1];

  useScrollScene(rootRef, scrollSceneOptions);

  return (
    <div ref={rootRef} className={styles.sequence}>
      <CanvasSequence canvases={canvases} />
    </div>
  );
}
