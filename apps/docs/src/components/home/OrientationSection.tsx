import { Eyebrow, ReadingColumn } from "@/components/layout";
import { MotionBlock } from "@/components/motion/MotionBlock";
import { TransitionSection } from "@/components/motion/TransitionSection";

import styles from "./homepage.module.css";

export function OrientationSection() {
  return (
    <TransitionSection marker="Orientation" space="xl" tone="base">
      <MotionBlock reveal={{ distance: 8, duration: 0.72, start: "top 94%" }}>
        <ReadingColumn className={styles.orientationBlock}>
          <Eyebrow>What Velum is</Eyebrow>
          <p className={`text-body ${styles.orientationText}`}>
            Velum is a set of IIIF-focused tools for shaping image-led reading
            experiences across the web. It begins with normalized manifest data, moves
            through restrained React rendering, and adds motion only when the sequence
            benefits from a quieter sense of pace. The result is closer to framing than
            interface, and closer to reading than browsing.
          </p>
        </ReadingColumn>
      </MotionBlock>
    </TransitionSection>
  );
}
