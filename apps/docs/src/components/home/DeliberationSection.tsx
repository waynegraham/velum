import { Eyebrow, ReadingColumn } from "@/components/layout";
import { MotionBlock } from "@/components/motion/MotionBlock";
import { TransitionSection } from "@/components/motion/TransitionSection";

import styles from "./homepage.module.css";

const invitations = [
  "Stay with one image a little longer than seems necessary.",
  "Let the distance between canvases do part of the reading.",
  "Return to a section and notice what changes when the pace slows.",
] as const;

export function DeliberationSection() {
  return (
    <TransitionSection marker="Deliberate engagement" space="xl" tone="base">
      <div className={styles.deliberation}>
        <MotionBlock reveal={{ distance: 8, duration: 0.72, start: "top 94%" }}>
          <ReadingColumn className={styles.deliberationIntro} width="content">
            <Eyebrow>A slower interaction</Eyebrow>
            <p className={`text-body ${styles.deliberationText}`}>
              Velum is built around the idea that attention can be shaped gently. The
              page does not ask for urgency here; it simply leaves enough room for the
              eye to linger, compare, and return.
            </p>
          </ReadingColumn>
        </MotionBlock>

        <MotionBlock
          className={styles.deliberationList}
          reveal={{ delay: 0.08, distance: 8, duration: 0.74, start: "top 94%" }}
        >
          {invitations.map((invitation) => (
            <p key={invitation} className={styles.deliberationLine} tabIndex={0}>
              {invitation}
            </p>
          ))}
        </MotionBlock>
      </div>
    </TransitionSection>
  );
}
