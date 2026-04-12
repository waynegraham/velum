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

  return (
    <Section className={styles.arrival} space="hero">
      <MotionBlock
        className={styles.heroStage}
        reveal={{ distance: 14, duration: 0.68, start: "top 96%" }}
      >
        {heroImage ? (
          <MotionBlock
            as="figure"
            className={styles.heroFigure}
            reveal={{ delay: 0.04, distance: 12, duration: 0.7, start: "top 96%" }}
            parallax={{ distance: 6 }}
          >
            <div className={styles.heroArtwork}>
              <img
                src={heroImage.id}
                alt={heroCanvas?.label ?? manifest?.label ?? "IIIF artwork"}
              />
            </div>
          </MotionBlock>
        ) : (
          <div className={styles.heroPlaceholder}>
            {isLoading
              ? "Loading artwork"
              : error
                ? "Artwork unavailable"
                : "Awaiting manifest"}
          </div>
        )}

        <MotionBlock
          className={styles.heroOverlay}
          reveal={{ delay: 0.12, distance: 10, duration: 0.58, start: "top 96%" }}
        >
          <h1 className={styles.heroTitle}>Velum</h1>
          <p className={styles.heroText}>
            IIIF components for image-led reading.
          </p>
        </MotionBlock>

        <MotionBlock
          className={styles.heroCaption}
          reveal={{ delay: 0.18, distance: 8, duration: 0.52, start: "top 96%" }}
        >
          <p>
            {maker ?? "Harvard Art Museums"}
            {period ? `, ${period}` : ""}
          </p>
          <p>{heroCanvas?.label ?? manifest?.label ?? "Opening canvas"}</p>
        </MotionBlock>
      </MotionBlock>
    </Section>
  );
}
