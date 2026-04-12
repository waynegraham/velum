"use client";

import { useEffectEvent, useMemo } from "react";

import type { CanvasModel, ManifestModel } from "@velum/core";
import { usePrefersReducedMotion } from "@velum/adapters";
import { ScrollStory } from "@velum/templates";

import styles from "./ManifestScrollStory.module.css";

interface ManifestScrollStoryProps {
  manifest: ManifestModel;
  maxCanvases?: number;
}

interface ScrollSceneState {
  progress: number;
  trigger: Element;
}

const sectionNarration = [
  "Begin with a full section for a single canvas so the eye settles before the next image arrives.",
  "A short caption and measured fade keep attention on the image instead of the interface.",
  "Scroll only advances the reading pace. The image stays legible before, during, and after the effect.",
  "Spacing between sections creates pause, which helps each canvas read as its own moment.",
  "The sequence ends without a flourish so the work, not the transition, carries the memory.",
];

function getOrientationLabel(canvas: CanvasModel) {
  if (!canvas.width || !canvas.height) {
    return "Undeclared proportions";
  }

  const ratio = canvas.width / canvas.height;

  if (ratio > 1.12) {
    return "Landscape framing";
  }

  if (ratio < 0.88) {
    return "Portrait framing";
  }

  return "Near-square framing";
}

function getDimensionsLabel(canvas: CanvasModel) {
  if (!canvas.width || !canvas.height) {
    return "Dimensions not provided";
  }

  return `${canvas.width} x ${canvas.height}px`;
}

function getSectionSummary(
  canvas: CanvasModel,
  index: number,
  manifest: ManifestModel,
  total: number,
) {
  const title = canvas.label ?? `Canvas ${index + 1}`;

  return `${title} appears as section ${index + 1} of ${total} from ${manifest.label}, keeping one canvas per scroll beat instead of compressing the sequence into a gallery.`;
}

export function ManifestScrollStory({
  manifest,
  maxCanvases = 5,
}: ManifestScrollStoryProps) {
  const prefersReducedMotion = usePrefersReducedMotion();

  const storyManifest = useMemo(
    () => ({
      ...manifest,
      canvases: manifest.canvases.slice(0, maxCanvases),
    }),
    [manifest, maxCanvases],
  );

  const syncSectionState = useEffectEvent(
    (element: HTMLElement | null, progressValue: number) => {
      if (!element) {
        return;
      }

      const focusedProgress = Math.max(0, 1 - Math.abs(progressValue - 0.5) * 2);
      element.style.setProperty("--story-progress", focusedProgress.toFixed(3));
      element.dataset.state = focusedProgress > 0.36 ? "active" : "idle";
    },
  );

  const applyTriggerState = useEffectEvent(
    (self: ScrollSceneState, progressValue?: number) => {
      syncSectionState(
        self.trigger instanceof HTMLElement ? self.trigger : null,
        progressValue ?? self.progress,
      );
    },
  );

  return (
    <div
      className={styles.story}
      data-motion={prefersReducedMotion ? "reduced" : "enabled"}
    >
      <ScrollStory
        manifest={storyManifest}
        sectionProps={(canvas, index) => ({
          className: styles.section,
          "aria-labelledby": `story-canvas-title-${index}`,
          "aria-describedby": `story-canvas-summary-${index}`,
        })}
        sceneOptions={(_, index) => ({
          enabled: !prefersReducedMotion,
          start: "top 82%",
          end: "bottom 18%",
          onUpdate: (self: ScrollSceneState) => applyTriggerState(self),
          onRefresh: (self: ScrollSceneState) => applyTriggerState(self),
          onLeave: (self: ScrollSceneState) => applyTriggerState(self, 0),
          onLeaveBack: (self: ScrollSceneState) => applyTriggerState(self, 0),
          onEnter: (self: ScrollSceneState) => applyTriggerState(self),
          onEnterBack: (self: ScrollSceneState) => applyTriggerState(self),
          id: `scroll-story-section-${index}`,
        })}
        sectionContent={(canvas, index) => (
          <aside className={styles.panel}>
            <p className={`type-label ${styles.kicker}`}>Canvas {index + 1}</p>
            <h3 id={`story-canvas-title-${index}`} className={`type-h3 ${styles.title}`}>
              {canvas.label ?? `Untitled canvas ${index + 1}`}
            </h3>
            <p
              id={`story-canvas-summary-${index}`}
              className={`type-body ${styles.summary}`}
            >
              {getSectionSummary(
                canvas,
                index,
                storyManifest,
                storyManifest.canvases.length,
              )}
            </p>
            <p className={`type-body-sm ${styles.note}`}>
              {sectionNarration[index % sectionNarration.length]}
            </p>
            <dl className={styles.meta}>
              <div>
                <dt>Framing</dt>
                <dd>{getOrientationLabel(canvas)}</dd>
              </div>
              <div>
                <dt>Image size</dt>
                <dd>{getDimensionsLabel(canvas)}</dd>
              </div>
            </dl>
          </aside>
        )}
      />
    </div>
  );
}
