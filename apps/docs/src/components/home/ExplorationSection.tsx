import Link from "next/link";

import { Caption, Eyebrow, ReadingColumn } from "@/components/layout";
import { MotionBlock } from "@/components/motion/MotionBlock";
import { TransitionSection } from "@/components/motion/TransitionSection";

import styles from "./homepage.module.css";

const routes = [
  {
    href: "/canvas-sequence",
    label: "Component",
    title: "CanvasSequence",
    summary:
      "A minimal React primitive for rendering normalized canvases as a legible sequence with very little interface framing.",
    meta: "@velum/react - image-first rendering - motion optional",
  },
  {
    href: "/scroll-story",
    label: "Template",
    title: "ScrollStory",
    summary:
      "A more composed reading pattern that gives each canvas its own section and introduces narration without obscuring the work.",
    meta: "@velum/templates - one-canvas-per-beat - adapter-friendly",
  },
  {
    href: "https://github.com/waynegraham/velum/tree/main/packages",
    label: "Packages",
    title: "Core, React, Adapters, Templates",
    summary:
      "Follow the monorepo from IIIF parsing through rendering and optional motion layers to see where each responsibility belongs.",
    meta: "@velum/core, @velum/react, @velum/adapters, @velum/templates",
  },
] as const;

export function ExplorationSection() {
  return (
    <TransitionSection marker="Exploration" space="xl" tone="base">
      <div className={styles.exploration}>
        <MotionBlock reveal={{ distance: 8, duration: 0.72, start: "top 94%" }}>
          <ReadingColumn className={styles.sectionHeader} width="content">
            <Eyebrow>Components and templates</Eyebrow>
            <h2 className={`text-h2 ${styles.sectionTitle}`}>
              Continue through the library by following the sequence, not a grid of cards.
            </h2>
            <p className={`text-body ${styles.explorationLead}`}>
              Each route below extends the same editorial approach from a different
              package boundary: a primitive component, a more opinionated template, and
              the package structure underneath both.
            </p>
          </ReadingColumn>
        </MotionBlock>

        <div className={styles.routeList}>
          {routes.map((route, index) => (
            <MotionBlock
              key={route.title}
              className={styles.routeRow}
              reveal={{
                delay: index * 0.04,
                distance: 8,
                duration: 0.68,
                start: "top 94%",
              }}
            >
              <Eyebrow className={styles.routeLabel}>{route.label}</Eyebrow>
              <div>
                <h3 className={`text-h3 ${styles.routeTitle}`}>
                  {route.href.startsWith("/") ? (
                    <Link href={route.href}>{route.title}</Link>
                  ) : (
                    <a href={route.href} target="_blank" rel="noreferrer">
                      {route.title}
                    </a>
                  )}
                </h3>
                <p className={styles.routeSummary}>{route.summary}</p>
              </div>
              <Caption className={styles.routeMeta}>{route.meta}</Caption>
            </MotionBlock>
          ))}
        </div>
      </div>
    </TransitionSection>
  );
}
