import type { ManifestModel } from "@velum/core";

import { Eyebrow, MediaFrame, ReadingColumn } from "@/components/layout";
import { NarrativeCanvasSequence } from "@/components/demos/NarrativeCanvasSequence";
import { MotionBlock } from "@/components/motion/MotionBlock";
import { TransitionSection } from "@/components/motion/TransitionSection";

import styles from "./homepage.module.css";

interface EncounterSectionProps {
  error: Error | null;
  isLoading: boolean;
  manifest: ManifestModel | null;
  manifestUrl: string;
}

export function EncounterSection({
  error,
  isLoading,
  manifest,
}: EncounterSectionProps) {
  const featuredCanvases = manifest?.canvases.slice(0, 5) ?? [];

  return (
    <TransitionSection marker="Encounter" space="xl" tone="surface">
      <div className={styles.encounter}>
        <MotionBlock reveal={{ distance: 10, duration: 0.72, start: "top 94%" }}>
          <ReadingColumn className={styles.encounterHeader}>
            <Eyebrow>Encounter</Eyebrow>
            <h2 className={`text-h2 ${styles.sectionTitle}`}>
              A sequence of canvases, held apart long enough to be looked at.
            </h2>
            <p className={`text-body ${styles.encounterBody}`}>
              Drawn from a public IIIF manifest, these canvases are left mostly alone.
              The motion only marks arrival and distance, so each image can keep its own
              weight before the next one enters.
            </p>
          </ReadingColumn>
        </MotionBlock>

        <MediaFrame as="div" className={styles.encounterStage} width="page">
          {error ? (
            <p className={styles.statusMessage}>
              Unable to load the manifest: {error.message}
            </p>
          ) : null}

          {isLoading && featuredCanvases.length === 0 ? (
            <p className={styles.statusMessage}>Preparing the sequence...</p>
          ) : null}

          {featuredCanvases.length > 0 ? (
            <NarrativeCanvasSequence canvases={featuredCanvases} />
          ) : null}
        </MediaFrame>
      </div>
    </TransitionSection>
  );
}
