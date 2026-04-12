"use client";

import { useEffect, useEffectEvent, useRef } from "react";

import type { CanvasModel } from "@velum/core";
import { usePrefersReducedMotion, useScrollScene } from "@velum/adapters";

import styles from "./NarrativeCanvasSequence.module.css";

interface NarrativeCanvasSequenceProps {
  canvases: CanvasModel[];
}

function setAllItemsVisible(element: HTMLElement) {
  const items = element.querySelectorAll("[data-sequence-item]");

  items.forEach((item) => {
    item.setAttribute("data-state", "active");
  });
}

function getInterludeCopy(canvas: CanvasModel, nextCanvas: CanvasModel, index: number) {
  const notes = [
    "The sequence opens slowly, letting the first canvas establish scale before the next image enters.",
    "What follows is not a gallery wall so much as a measured turn of the page, one view giving way to another.",
    "Differences in framing become part of the reading, so each canvas alters the rhythm without needing explanation.",
    "The pause here is deliberate: enough space to register the shift in image before the sequence continues.",
  ];

  const currentLabel = canvas.label ?? `Canvas ${index + 1}`;
  const nextLabel = nextCanvas.label ?? `Canvas ${index + 2}`;

  return `${notes[index % notes.length]} ${currentLabel} gives way to ${nextLabel}.`;
}

export function NarrativeCanvasSequence({
  canvases,
}: NarrativeCanvasSequenceProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  const syncItemStates = useEffectEvent(() => {
    const root = rootRef.current;

    if (!root) {
      return;
    }

    if (prefersReducedMotion) {
      setAllItemsVisible(root);
      return;
    }

    const viewportHeight = window.innerHeight;
    const focusLine = viewportHeight * 0.56;
    const activationRange = viewportHeight * 0.26;
    const items = root.querySelectorAll("[data-sequence-item]");

    items.forEach((item) => {
      const bounds = item.getBoundingClientRect();
      const itemCenter = bounds.top + bounds.height / 2;
      const isVisible =
        bounds.bottom > viewportHeight * 0.12 &&
        bounds.top < viewportHeight * 0.9 &&
        Math.abs(itemCenter - focusLine) < activationRange;

      item.setAttribute("data-state", isVisible ? "active" : "idle");
    });
  });

  useEffect(() => {
    const root = rootRef.current;

    if (!root) {
      return;
    }

    syncItemStates();
  }, [syncItemStates, prefersReducedMotion, canvases]);

  const scrollSceneOptions = {
    enabled: !prefersReducedMotion,
    start: "top bottom",
    end: "bottom top",
    onEnter: syncItemStates,
    onEnterBack: syncItemStates,
    onLeave: syncItemStates,
    onLeaveBack: syncItemStates,
    onRefresh: syncItemStates,
    onUpdate: syncItemStates,
  } as Parameters<typeof useScrollScene<HTMLDivElement>>[1];

  useScrollScene(rootRef, scrollSceneOptions);

  return (
    <div ref={rootRef} className={styles.sequence}>
      {canvases.map((canvas, index) => {
        const image = canvas.items[0];
        const nextCanvas = canvases[index + 1];

        return (
          <div key={canvas.id} className={styles.group}>
            <figure className={styles.figure} data-sequence-item>
              {image ? (
                <img
                  src={image.id}
                  alt={canvas.label ?? "IIIF canvas"}
                  className={styles.image}
                />
              ) : null}
              {canvas.label ? <figcaption className={styles.caption}>{canvas.label}</figcaption> : null}
            </figure>

            {nextCanvas ? (
              <aside className={styles.interlude} data-sequence-item>
                <p>{getInterludeCopy(canvas, nextCanvas, index)}</p>
              </aside>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
