"use client";

import { useManifest } from "@velum/react";

import { MotionBlock } from "@/components/motion/MotionBlock";
import { TransitionSection } from "@/components/motion/TransitionSection";
import { NarrativeCanvasSequence } from "@/components/demos/NarrativeCanvasSequence";

import styles from "./page.module.css";

const manifestUrl =
  "https://iiif.harvardartmuseums.org/manifests/object/299843";

const exampleCode = `import { CanvasSequence } from "@velum/react";
import type { ManifestModel } from "@velum/core";

interface ExampleProps {
  manifest: ManifestModel;
}

export function Example({ manifest }: ExampleProps) {
  return <CanvasSequence canvases={manifest.canvases.slice(0, 5)} />;
}`;

export default function CanvasSequenceDocsPage() {
  const { manifest, isLoading, error } = useManifest(manifestUrl);
  const demoCanvases = manifest?.canvases.slice(0, 5) ?? [];

  return (
    <main className={styles.page}>
      <TransitionSection as="header" className={styles.header} space="hero" tone="surface">
        <MotionBlock reveal={{ distance: 16, duration: 0.58, start: "top 90%" }}>
          <div className={styles.headerGrid}>
            <div className="stack-3">
              <p className="type-label">@velum/react</p>
              <h1 className={`type-h1 reading-width-tight ${styles.title}`}>
                CanvasSequence
              </h1>
            </div>

            <div className="stack-3">
              <p className={`type-body reading-width ${styles.description}`}>
                A minimal IIIF image sequence for pages where the canvases should
                stay in front and the interface should stay out of the way.
              </p>
              <div className={styles.metaRow}>
                <span className={styles.metaPill}>Primitive component</span>
                <span className={styles.metaPill}>Normalized canvases in</span>
                <span className={styles.metaPill}>Motion optional</span>
              </div>
            </div>
          </div>
        </MotionBlock>
      </TransitionSection>

      <TransitionSection
        className={styles.demoSection}
        marker="Live demo"
        space="md"
        tone="lift"
      >
        <MotionBlock reveal={{ distance: 18, duration: 0.6, start: "top 88%" }}>
          <div className={styles.demoIntro}>
            <div className="stack-2">
              <p className="type-label">Live rendering</p>
              <h2 className="type-h3 reading-width-tight">See the sequence carry the page.</h2>
            </div>
            <p className={`type-caption reading-width ${styles.demoCaption}`}>
              Public Harvard Art Museums manifest, first five canvases, rendered with
              the narrative demo wrapper.
            </p>
          </div>
        </MotionBlock>

        <MotionBlock
          className={styles.demoFrame}
          reveal={{ distance: 18, duration: 0.62, start: "top 84%" }}
        >
          <div className={styles.demoChrome}>
            <div>
              <p className="type-label">Demo source</p>
              <p className={`type-caption ${styles.manifestLink}`}>
                <a href={manifestUrl} target="_blank" rel="noreferrer">
                  {manifestUrl}
                </a>
              </p>
            </div>

            {manifest ? (
              <div className={styles.demoManifest}>
                <p className="type-label">Manifest</p>
                <p className="type-caption">{manifest.label}</p>
              </div>
            ) : null}
          </div>

          {isLoading ? (
            <p className={styles.statusMessage}>Loading manifest...</p>
          ) : null}

          {error ? (
            <p className={styles.statusMessage}>
              Unable to load manifest: {error.message}
            </p>
          ) : null}

          {demoCanvases.length > 0 ? (
            <NarrativeCanvasSequence canvases={demoCanvases} />
          ) : null}
        </MotionBlock>
      </TransitionSection>

      <TransitionSection
        className={styles.supportSection}
        marker="Implementation notes"
        space="md"
        tone="surface"
      >
        <MotionBlock reveal={{ distance: 16, duration: 0.54 }}>
          <div className={styles.supportGrid}>
            <article className={`docs-panel ${styles.supportCard}`}>
              <div className="stack-3">
                <div className="stack-1">
                  <p className="type-label">Code example</p>
                  <h2 className="type-h4">Basic usage</h2>
                </div>
                <pre className={`code-block ${styles.codeBlock}`}>
                  <code>{exampleCode}</code>
                </pre>
              </div>
            </article>

            <article className={`docs-panel ${styles.supportCard}`}>
              <div className="stack-3">
                <div className="stack-1">
                  <p className="type-label">Notes</p>
                  <h2 className="type-h4">Accessibility and usage</h2>
                </div>

                <div className={styles.noteList}>
                  <p className="type-body-sm">
                    Uses semantic <code>figure</code> and <code>figcaption</code>{" "}
                    structure for a clearer reading order.
                  </p>
                  <p className="type-body-sm">
                    Parse manifests upstream with <code>parseManifest</code> or{" "}
                    <code>useManifest</code>; pass normalized canvases into the
                    component.
                  </p>
                  <p className="type-body-sm">
                    If the images communicate meaning, ensure canvas labels are
                    descriptive because they inform the default alternative text.
                  </p>
                  <p className="type-body-sm">
                    Add adapters or templates only when you need pacing, narration,
                    or more opinionated layout behavior.
                  </p>
                </div>
              </div>
            </article>
          </div>
        </MotionBlock>
      </TransitionSection>
    </main>
  );
}
