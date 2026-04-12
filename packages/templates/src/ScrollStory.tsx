"use client";

import type { CSSProperties, HTMLAttributes, ReactNode } from "react";
import { useRef } from "react";

import type { CanvasModel, ManifestModel } from "@velum/core";
import { useScrollScene, type UseScrollSceneOptions } from "@velum/adapters";
import { CanvasSequence } from "@velum/react";

export interface ScrollStoryProps {
  manifest: ManifestModel;
  sceneOptions?:
    | UseScrollSceneOptions
    | ((canvas: CanvasModel, index: number) => UseScrollSceneOptions | undefined);
  sectionProps?:
    | HTMLAttributes<HTMLElement>
    | ((canvas: CanvasModel, index: number) => HTMLAttributes<HTMLElement> | undefined);
  sectionContent?:
    | ReactNode
    | ((canvas: CanvasModel, index: number) => ReactNode | undefined);
}

const storyStyle: CSSProperties = {
  display: "grid",
  gap: "4rem",
};

function resolveSectionProps(
  sectionProps: ScrollStoryProps["sectionProps"],
  canvas: CanvasModel,
  index: number,
) {
  return typeof sectionProps === "function"
    ? sectionProps(canvas, index)
    : sectionProps;
}

function resolveSceneOptions(
  sceneOptions: ScrollStoryProps["sceneOptions"],
  canvas: CanvasModel,
  index: number,
) {
  return typeof sceneOptions === "function"
    ? sceneOptions(canvas, index)
    : sceneOptions;
}

function resolveSectionContent(
  sectionContent: ScrollStoryProps["sectionContent"],
  canvas: CanvasModel,
  index: number,
) {
  return typeof sectionContent === "function"
    ? sectionContent(canvas, index)
    : sectionContent;
}

interface ScrollStorySectionProps {
  canvas: CanvasModel;
  index: number;
  sceneOptions?: UseScrollSceneOptions;
  sectionProps?: HTMLAttributes<HTMLElement>;
  sectionContent?: ReactNode;
}

function ScrollStorySection({
  canvas,
  index,
  sceneOptions,
  sectionProps,
  sectionContent,
}: ScrollStorySectionProps) {
  const sectionRef = useRef<HTMLElement | null>(null);

  useScrollScene(
    sectionRef,
    sceneOptions ? { ...sceneOptions, enabled: true } : { enabled: false },
  );

  return (
    <section
      {...sectionProps}
      ref={sectionRef}
      data-canvas-id={canvas.id}
      data-scroll-story-index={index}
    >
      <CanvasSequence canvases={[canvas]} />
      {sectionContent}
    </section>
  );
}

export function ScrollStory({
  manifest,
  sceneOptions,
  sectionProps,
  sectionContent,
}: ScrollStoryProps) {
  return (
    <div style={storyStyle}>
      {manifest.canvases.map((canvas, index) => {
        const resolvedSceneOptions = resolveSceneOptions(sceneOptions, canvas, index);
        const resolvedSectionProps = resolveSectionProps(sectionProps, canvas, index);
        const resolvedSectionContent = resolveSectionContent(
          sectionContent,
          canvas,
          index,
        );

        return (
          <ScrollStorySection
            key={canvas.id}
            canvas={canvas}
            index={index}
            {...(resolvedSceneOptions ? { sceneOptions: resolvedSceneOptions } : {})}
            {...(resolvedSectionProps ? { sectionProps: resolvedSectionProps } : {})}
            {...(resolvedSectionContent ? { sectionContent: resolvedSectionContent } : {})}
          />
        );
      })}
    </div>
  );
}
