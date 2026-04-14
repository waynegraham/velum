import Link from "next/link";

import { Caption, Container, Eyebrow, ReadingColumn } from "@/components/layout";
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
        <MotionBlock reveal={{ distance: 8, duration: 0.74, start: "top 94%" }}>
          <ReadingColumn className={styles.sectionHeader} width="content">
            <Eyebrow>Closing section</Eyebrow>
            <h2 className={`text-display ${styles.reflectionTitle}`}>
              Documentation can feel like a reading room when the interface yields.
            </h2>
            <p className={`text-body ${styles.reflectionBody}`}>
              Velum is built for projects where IIIF material should stay central and
              the UI should behave more like framing than control chrome. That applies
              equally to the library and to the way the documentation introduces it.
            </p>
          </ReadingColumn>
        </MotionBlock>

        <MotionBlock
          className={styles.reflectionNote}
          reveal={{ delay: 0.1, distance: 8, duration: 0.72, start: "top 94%" }}
        >
          <Eyebrow className={styles.metaLabel}>Continue</Eyebrow>
          <Caption className={styles.reflectionCopy}>
            Read the component notes, inspect the manifest source, or move into the
            package code from the footer. The page closes quietly so the work can
            continue below without another interface flourish.
          </Caption>
          <Container className={styles.reflectionLinks} width="content">
            <Link href="/canvas-sequence">CanvasSequence</Link>
            <Link href="/scroll-story">ScrollStory</Link>
            <a href={manifestUrl} target="_blank" rel="noreferrer">
              Source manifest
            </a>
          </Container>
        </MotionBlock>
      </div>
    </TransitionSection>
  );
}
