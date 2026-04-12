import Link from "next/link";

import { MotionBlock } from "@/components/motion/MotionBlock";
import { TransitionSection } from "@/components/motion/TransitionSection";

import styles from "./homepage.module.css";

interface ReflectionSectionProps {
  manifestUrl: string;
}

export function ReflectionSection({ manifestUrl }: ReflectionSectionProps) {
  return (
    <TransitionSection marker="Reflection" space="xl" tone="surface">
      <div className={styles.reflection}>
        <MotionBlock reveal={{ distance: 16, duration: 0.56 }}>
          <div className={styles.sectionHeader}>
            <p className={styles.sectionMarker}>Closing section</p>
            <h2 className={styles.reflectionTitle}>
              Documentation can feel like a reading room when the interface yields.
            </h2>
            <p className={styles.reflectionBody}>
              Velum is built for projects where IIIF material should stay central and
              the UI should behave more like framing than control chrome. That applies
              equally to the library and to the way the documentation introduces it.
            </p>
          </div>
        </MotionBlock>

        <MotionBlock
          className={styles.reflectionNote}
          reveal={{ delay: 0.1, distance: 14, duration: 0.5, start: "top 92%" }}
        >
          <p className={styles.metaLabel}>Continue</p>
          <p className={styles.reflectionCopy}>
            Read the component notes, inspect the manifest source, or move into the
            package code from the footer. The page closes quietly so the work can
            continue below without another interface flourish.
          </p>
          <div className={styles.reflectionLinks}>
            <Link href="/canvas-sequence">CanvasSequence</Link>
            <Link href="/scroll-story">ScrollStory</Link>
            <a href={manifestUrl} target="_blank" rel="noreferrer">
              Source manifest
            </a>
          </div>
        </MotionBlock>
      </div>
    </TransitionSection>
  );
}
