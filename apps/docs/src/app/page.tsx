"use client";

import Link from "next/link";

import { LenisProvider } from "@velum/adapters";
import { useManifest } from "@velum/react";

import { Section } from "@/components/layout";
import { MotionBlock } from "@/components/motion/MotionBlock";
import { TransitionSection } from "@/components/motion/TransitionSection";
import { NarrativeCanvasSequence } from "@/components/demos/NarrativeCanvasSequence";

import styles from "./page.module.css";

const manifestUrl =
  "https://iiif.harvardartmuseums.org/manifests/object/299843";

interface MetadataEntry {
  label: string;
  value: string;
}

function findMetadataValue(metadata: MetadataEntry[], pattern: RegExp) {
  return metadata.find((entry) => pattern.test(entry.label))?.value;
}

export default function HomePage() {
  const { manifest, isLoading, error } = useManifest(manifestUrl);
  const heroCanvas = manifest?.canvases[0];
  const heroImage = heroCanvas?.items[0];
  const featuredCanvases = manifest?.canvases.slice(0, 4) ?? [];
  const maker = manifest
    ? findMetadataValue(manifest.metadata, /maker|artist|culture|people|by/i)
    : undefined;
  const period = manifest
    ? findMetadataValue(manifest.metadata, /dated|date|period|century/i)
    : undefined;
  const medium = manifest
    ? findMetadataValue(manifest.metadata, /medium|technique|classification/i)
    : undefined;
  const summary =
    manifest?.summary ??
    "Velum approaches IIIF as exhibition material: sequence, scale, and pacing before interface chrome.";

  return (
    <LenisProvider>
      <main className={styles.page}>
        <Section className={styles.hero} space="hero">
          <MotionBlock
            className={styles.heroIntro}
            reveal={{ distance: 20, duration: 0.6, start: "top 88%" }}
          >
            <p className={styles.eyebrow}>Velum documentation</p>
            <h1 className={styles.heroTitle}>
              IIIF components presented like an exhibition, not a dashboard.
            </h1>
            <p className={styles.heroText}>
              Build reading sequences, scroll narratives, and image-led interfaces
              from normalized manifests. The work establishes the pace first, then the
              documentation arrives in quieter notes around it.
            </p>
          </MotionBlock>

          <MotionBlock className={styles.heroMedia} parallax={{ distance: 10 }}>
            {heroImage ? (
              <MotionBlock
                as="figure"
                className={styles.heroFigure}
                reveal={{ delay: 0.12, distance: 16, duration: 0.64, start: "top 90%" }}
              >
                <img
                  className={styles.heroImage}
                  src={heroImage.id}
                  alt={heroCanvas?.label ?? manifest?.label ?? "IIIF artwork"}
                />
                <figcaption className={styles.caption}>
                  <span className={styles.captionPrimary}>
                    {heroCanvas?.label ?? "Opening canvas"}
                  </span>
                  <span>
                    {maker ?? "Unknown maker"}
                    {period ? `, ${period}` : ""}
                  </span>
                  {medium ? <span>{medium}</span> : null}
                  <span>Harvard Art Museums IIIF manifest</span>
                </figcaption>
              </MotionBlock>
            ) : (
              <div className={styles.placeholder}>
                {isLoading ? "Loading IIIF manifest..." : "Image unavailable."}
              </div>
            )}
          </MotionBlock>

          <MotionBlock
            className={styles.heroAside}
            reveal={{ delay: 0.08, distance: 16, duration: 0.58, start: "top 90%" }}
          >
            <p className={styles.asideLabel}>Viewing notes</p>
            <p className={styles.asideText}>
              Collection: Harvard Art Museums
              {maker ? ` - Maker: ${maker}` : ""}
              {period ? ` - Period: ${period}` : ""}
            </p>
          </MotionBlock>
        </Section>

        <TransitionSection
          className={styles.intro}
          marker="Opening note"
          space="xl"
          tone="base"
        >
          <MotionBlock
            className={styles.copyBlock}
            reveal={{ distance: 18, duration: 0.56 }}
          >
            <p className={styles.kicker}>Editorial introduction</p>
            <p className={styles.introText}>{summary}</p>
            <p className={styles.bodyText}>
              The core stays domain-first. React components render normalized
              canvases. Motion remains optional. What matters here is pace: enough
              structure to orient the reader, then space for the image sequence to
              carry the page.
            </p>
            <p className={styles.bodyText}>
              Start with a simple primitive, then layer adapters or templates only
              where the story needs them.
            </p>
          </MotionBlock>
        </TransitionSection>

        <TransitionSection
          className={styles.featureSection}
          marker="Featured work"
          space="xl"
          tone="surface"
        >
          <MotionBlock
            className={styles.featureLead}
            reveal={{ distance: 18, duration: 0.56 }}
          >
            <p className={styles.kicker}>Featured component</p>
            <h2 className={styles.sectionTitle}>CanvasSequence</h2>
            <p className={styles.bodyText}>
              A restrained starting point for manifests that already carry their own
              rhythm. It renders canvases as a legible visual sequence without
              imposing a gallery shell around them.
            </p>
            <p className={styles.inlineLinks}>
              <Link href="/canvas-sequence">Read the component notes</Link>
              <Link href="/scroll-story">Open the scroll story page</Link>
              <a href={manifestUrl} target="_blank" rel="noreferrer">
                Open the source manifest
              </a>
            </p>
          </MotionBlock>

          <MotionBlock
            className={styles.demoFrame}
            reveal={{ distance: 18, duration: 0.62, start: "top 84%" }}
          >
            {error ? (
              <p className={styles.statusMessage}>
                Unable to load the manifest: {error.message}
              </p>
            ) : null}

            {isLoading && !heroImage ? (
              <p className={styles.statusMessage}>Preparing the sequence...</p>
            ) : null}

            {featuredCanvases.length > 0 ? (
              <NarrativeCanvasSequence canvases={featuredCanvases} />
            ) : null}
          </MotionBlock>
        </TransitionSection>

        <TransitionSection
          className={styles.notesSection}
          marker="Approach"
          space="xl"
          tone="base"
        >
          <MotionBlock
            className={styles.copyBlock}
            reveal={{ distance: 18, duration: 0.56 }}
          >
            <p className={styles.kicker}>What this page is doing</p>
            <h2 className={styles.sectionTitle}>Deliberate transitions, minimal chrome.</h2>
            <p className={styles.bodyText}>
              The oversized image establishes scale before explanation. Thin rules,
              captions, and measured type shifts replace cards, badges, and control
              panels.
            </p>
            <p className={styles.bodyText}>
              Each section is separated with a quiet marker so the scroll feels
              paced rather than stacked. The result stays usable as documentation,
              but it reads closer to an exhibition leaflet than a product page.
            </p>
          </MotionBlock>
        </TransitionSection>
      </main>
    </LenisProvider>
  );
}
