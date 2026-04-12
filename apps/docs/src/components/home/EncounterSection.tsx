import Link from "next/link";

import type { ManifestModel } from "@velum/core";

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
  manifestUrl,
}: EncounterSectionProps) {
  const featuredCanvases = manifest?.canvases.slice(0, 4) ?? [];

  return (
    <TransitionSection marker="Encounter" space="xl" tone="surface">
      <div className={styles.encounter}>
        <div className={styles.encounterIntro}>
          <MotionBlock reveal={{ distance: 16, duration: 0.56 }}>
            <div className={styles.sectionHeader}>
              <p className={styles.sectionMarker}>Artwork and component demo</p>
              <h2 className={styles.sectionTitle}>
                CanvasSequence lets a manifest read as a paced visual passage.
              </h2>
              <p className={styles.encounterBody}>
                This demonstration keeps the frame light: a normalized set of canvases,
                a restrained narrative wrapper, and enough scroll-linked emphasis to
                mark each change in image without turning the sequence into spectacle.
              </p>
              <div className={styles.encounterLinks}>
                <Link href="/canvas-sequence">Read the component notes</Link>
                <Link href="/scroll-story">Open the ScrollStory template</Link>
                <a href={manifestUrl} target="_blank" rel="noreferrer">
                  View the source manifest
                </a>
              </div>
            </div>
          </MotionBlock>

          <MotionBlock
            reveal={{ delay: 0.08, distance: 14, duration: 0.52, start: "top 92%" }}
          >
            <p className={styles.encounterSideNote}>
              The demo keeps motion calm and secondary. Without animation, the same
              canvases remain visible as a linear sequence.
            </p>
          </MotionBlock>
        </div>

        <MotionBlock
          className={styles.demoStage}
          reveal={{ distance: 18, duration: 0.62, start: "top 84%" }}
        >
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
        </MotionBlock>
      </div>
    </TransitionSection>
  );
}
