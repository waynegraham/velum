import { TransitionSection } from "@/components/motion/TransitionSection";
import { MotionBlock } from "@/components/motion/MotionBlock";

import styles from "./homepage.module.css";

const principles = [
  {
    title: "Normalized IIIF first",
    body: "Manifests are parsed before they reach the page, so components work with a stable domain model instead of raw API structure.",
  },
  {
    title: "Rendering stays quiet",
    body: "React primitives handle sequence, scale, and annotation-ready structure without collapsing the work into an application shell.",
  },
  {
    title: "Motion remains optional",
    body: "Adapters add pacing only when needed, and reduced-motion users still receive the same reading order and visual access.",
  },
] as const;

export function OrientationSection() {
  return (
    <TransitionSection marker="Orientation" space="xl" tone="base">
      <div className={styles.orientationGrid}>
        <MotionBlock reveal={{ distance: 16, duration: 0.54 }}>
          <div className={styles.sectionHeader}>
            <p className={styles.sectionMarker}>What Velum is</p>
            <h2 className={styles.sectionTitle}>
              A set of domain-driven tools for image-led cultural interfaces.
            </h2>
            <p className={styles.orientationBody}>
              Velum is not a product dashboard or a theme. It is a monorepo for parsing
              IIIF manifests, rendering normalized canvases in React, layering optional
              scroll and reveal motion, and composing those primitives into more
              opinionated storytelling patterns.
            </p>
            <p className={styles.orientationBody}>
              The homepage follows the same approach: fewer interface controls, stronger
              typographic pacing, and enough whitespace for the artwork to hold the
              reader&apos;s attention.
            </p>
          </div>
        </MotionBlock>

        <MotionBlock
          className={styles.principles}
          reveal={{ delay: 0.08, distance: 16, duration: 0.56 }}
        >
          {principles.map((principle) => (
            <div key={principle.title} className={styles.principle}>
              <h3 className={styles.principleTitle}>{principle.title}</h3>
              <p className={styles.principleBody}>{principle.body}</p>
            </div>
          ))}
        </MotionBlock>
      </div>
    </TransitionSection>
  );
}
