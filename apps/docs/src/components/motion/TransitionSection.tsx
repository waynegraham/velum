"use client";

import type { ReactNode } from "react";

import {
  Container,
  Section,
  type ContainerWidth,
  type SectionProps,
} from "@/components/layout";

import { MotionBlock } from "./MotionBlock";

import styles from "./TransitionSection.module.css";

type TransitionTone = "base" | "surface" | "lift";

export interface TransitionSectionProps extends SectionProps {
  children: ReactNode;
  innerClassName?: string;
  marker?: ReactNode;
  markerWidth?: ContainerWidth;
  tone?: TransitionTone;
}

function cx(...classNames: Array<string | false | null | undefined>) {
  return classNames.filter(Boolean).join(" ");
}

const toneClassNames: Record<TransitionTone, string> = {
  base: styles.toneBase ?? "",
  surface: styles.toneSurface ?? "",
  lift: styles.toneLift ?? "",
};

export function TransitionSection({
  children,
  className,
  innerClassName,
  marker,
  markerWidth = "page",
  tone = "base",
  ...props
}: TransitionSectionProps) {
  return (
    <>
      {marker ? (
        <Container className={styles.markerContainer} width={markerWidth}>
          <MotionBlock reveal={{ distance: 10, duration: 0.4 }}>
            <div className={styles.marker} aria-hidden="true">
              <span>{marker}</span>
            </div>
          </MotionBlock>
        </Container>
      ) : null}

      <Section
        className={cx(styles.transitionSection, toneClassNames[tone], className)}
        {...props}
      >
        <div className={cx(styles.inner, innerClassName)}>{children}</div>
      </Section>
    </>
  );
}
