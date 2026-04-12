"use client";

import Link from "next/link";
import type { ReactNode } from "react";

import { LenisProvider } from "@velum/adapters";
import { useManifest } from "@velum/react";

import { NarrativeCanvasSequence } from "@/components/demos/NarrativeCanvasSequence";
import { Container, Section } from "@/components/layout";

import styles from "./page.module.css";

const manifestUrl =
  "https://iiif.harvardartmuseums.org/manifests/object/299843";

interface SectionMarkerProps {
  children: ReactNode;
}

interface MetadataEntry {
  label: string;
  value: string;
}

function SectionMarker({ children }: SectionMarkerProps) {
  return (
    <div className={styles.sectionMarker} aria-hidden="true">
      <span>{children}</span>
    </div>
  );
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
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>Velum documentation</p>
            <h1 className={styles.heroTitle}>
              IIIF components presented like an exhibition, not a dashboard.
            </h1>
            <p className={styles.heroText}>
              Build reading sequences, scroll narratives, and image-led interfaces
              from normalized manifests. The page opens with a work, then lets the
              documentation recede.
            </p>

            <dl className={styles.heroDetails}>
              <div>
                <dt>Collection</dt>
                <dd>Harvard Art Museums</dd>
              </div>
              {maker ? (
                <div>
                  <dt>Maker</dt>
                  <dd>{maker}</dd>
                </div>
              ) : null}
              {period ? (
                <div>
                  <dt>Period</dt>
                  <dd>{period}</dd>
                </div>
              ) : null}
              {medium ? (
                <div>
                  <dt>Medium</dt>
                  <dd>{medium}</dd>
                </div>
              ) : null}
            </dl>
          </div>

          <div className={styles.heroMedia}>
            {heroImage ? (
              <figure className={styles.heroFigure}>
                <img
                  className={styles.heroImage}
                  src={heroImage.id}
                  alt={heroCanvas?.label ?? manifest?.label ?? "IIIF artwork"}
                />
                <figcaption className={styles.caption}>
                  <span>{manifest?.label}</span>
                  <span>{heroCanvas?.label ?? "Opening canvas"}</span>
                </figcaption>
              </figure>
            ) : (
              <div className={styles.placeholder}>
                {isLoading ? "Loading IIIF manifest..." : "Image unavailable."}
              </div>
            )}
          </div>
        </Section>

        <Container className={styles.sectionMarkerContainer} width="page">
          <SectionMarker>Preface</SectionMarker>
        </Container>

        <Section className={styles.intro} space="xl">
          <div className={styles.copyBlock}>
            <p className={styles.kicker}>Editorial introduction</p>
            <p className={styles.introText}>{summary}</p>
          </div>
          <div className={styles.copyBlock}>
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
          </div>
        </Section>

        <Container className={styles.sectionMarkerContainer} width="page">
          <SectionMarker>Featured demo</SectionMarker>
        </Container>

        <Section className={styles.featureSection} space="xl">
          <div className={styles.featureHeader}>
            <div className={styles.copyBlock}>
              <p className={styles.kicker}>Featured component</p>
              <h2 className={styles.sectionTitle}>CanvasSequence</h2>
            </div>
            <div className={styles.copyBlock}>
              <p className={styles.bodyText}>
                A restrained starting point for manifests that already carry their
                own rhythm. It renders canvases as a legible visual sequence without
                imposing a gallery shell around them.
              </p>
              <p className={styles.inlineLinks}>
                <Link href="/canvas-sequence">Read the component notes</Link>
                <Link href="/scroll-story">Open the scroll story page</Link>
                <a href={manifestUrl} target="_blank" rel="noreferrer">
                  Open the source manifest
                </a>
              </p>
            </div>
          </div>

          <div className={styles.demoFrame}>
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
          </div>
        </Section>

        <Container className={styles.sectionMarkerContainer} width="page">
          <SectionMarker>Approach</SectionMarker>
        </Container>

        <Section className={styles.notesSection} space="xl">
          <div className={styles.copyBlock}>
            <p className={styles.kicker}>What this page is doing</p>
            <h2 className={styles.sectionTitle}>Deliberate transitions, minimal chrome.</h2>
          </div>
          <div className={styles.notesGrid}>
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
          </div>
        </Section>
      </main>
    </LenisProvider>
  );
}
