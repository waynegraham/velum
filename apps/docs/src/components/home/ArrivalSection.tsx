import type { MetadataEntry, ManifestModel } from "@velum/core";

import { Section } from "@/components/layout";
import { MotionBlock } from "@/components/motion/MotionBlock";

import styles from "./homepage.module.css";

interface ArrivalSectionProps {
  error: Error | null;
  isLoading: boolean;
  manifest: ManifestModel | null;
}

function findMetadataValue(metadata: MetadataEntry[], pattern: RegExp) {
  return metadata.find((entry) => pattern.test(entry.label))?.value;
}

export function ArrivalSection({
  error,
  isLoading,
  manifest,
}: ArrivalSectionProps) {
  const heroCanvas = manifest?.canvases[0];
  const heroImage = heroCanvas?.items[0];
  const maker = manifest
    ? findMetadataValue(manifest.metadata, /maker|artist|culture|people|by/i)
    : undefined;
  const period = manifest
    ? findMetadataValue(manifest.metadata, /dated|date|period|century/i)
    : undefined;
  const medium = manifest
    ? findMetadataValue(manifest.metadata, /medium|technique|classification/i)
    : undefined;

  return (
    <Section className={styles.arrival} space="hero">
      <div className={styles.arrivalIntro}>
        <MotionBlock
          className={styles.arrivalLead}
          reveal={{ distance: 18, duration: 0.56, start: "top 90%" }}
        >
          <p className={styles.sectionEyebrow}>Arrival</p>
          <h1 className={styles.displayTitle}>
            Velum stages IIIF like a quiet digital exhibition.
          </h1>
          <p className={styles.displayBody}>
            The artwork arrives first. Components, templates, and motion sit back until
            the sequence asks for them.
          </p>
        </MotionBlock>

        <MotionBlock
          className={styles.arrivalNote}
          reveal={{ delay: 0.08, distance: 16, duration: 0.52, start: "top 92%" }}
        >
          <p className={styles.metaLabel}>Opening note</p>
          <p className={styles.noteBody}>
            Velum keeps the IIIF domain model intact, layers React primitives on top,
            and treats motion as an optional wayfinding device rather than the content
            itself.
          </p>
        </MotionBlock>
      </div>

      <div className={styles.arrivalMedia}>
        <MotionBlock
          as="figure"
          className={styles.heroFigure}
          reveal={{ delay: 0.1, distance: 18, duration: 0.62, start: "top 88%" }}
          parallax={{ distance: 8 }}
        >
          {heroImage ? (
            <div className={styles.heroArtwork}>
              <img
                src={heroImage.id}
                alt={heroCanvas?.label ?? manifest?.label ?? "IIIF artwork"}
              />
            </div>
          ) : (
            <div className={styles.heroPlaceholder}>
              {isLoading
                ? "Loading artwork"
                : error
                  ? "Artwork unavailable"
                  : "Awaiting manifest"}
            </div>
          )}
        </MotionBlock>

        <MotionBlock
          className={styles.manifestDetail}
          reveal={{ delay: 0.14, distance: 14, duration: 0.5, start: "top 92%" }}
        >
          <p className={styles.manifestEyebrow}>Manifest</p>
          <h2 className={styles.manifestTitle}>
            {manifest?.label ?? "Harvard Art Museums"}
          </h2>
          <div className={styles.manifestMeta}>
            {maker ? <p>{maker}</p> : null}
            <p>{[period, medium].filter(Boolean).join(" - ") || "IIIF presentation data"}</p>
            <p>{heroCanvas?.label ?? "Opening canvas"}</p>
          </div>
        </MotionBlock>
      </div>
    </Section>
  );
}
