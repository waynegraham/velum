"use client";

import { useManifest } from "@velum/react";

import { MotionBlock } from "@/components/motion/MotionBlock";
import { TransitionSection } from "@/components/motion/TransitionSection";
import { NarrativeCanvasSequence } from "@/components/demos/NarrativeCanvasSequence";
import { CodeSnippet } from "@/components/ui/CodeSnippet";

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
            <div className={`copy-stack ${styles.headerIntro}`}>
              <p className="text-label">@velum/react</p>
              <h1 className={`text-h1 reading-column-tight ${styles.title}`}>CanvasSequence</h1>
            </div>

            <div className={`copy-stack ${styles.headerMeta}`}>
              <p className={`text-body reading-column ${styles.description}`}>
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
            <div className="copy-stack">
              <p className="text-label">Live rendering</p>
              <h2 className="text-h3 reading-column-tight">See the sequence carry the page.</h2>
            </div>
            <p className={`text-caption reading-column ${styles.demoCaption}`}>
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
              <p className="text-label">Demo source</p>
              <p className={`text-caption ${styles.manifestLink}`}>
                <a href={manifestUrl} target="_blank" rel="noreferrer">
                  {manifestUrl}
                </a>
              </p>
            </div>

            {manifest ? (
              <div className={styles.demoManifest}>
                <p className="text-label">Manifest</p>
                <p className="text-caption">{manifest.label}</p>
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
            <article className={styles.supportCard}>
              <div className="copy-stack">
                <div className="copy-stack">
                  <p className="text-label">Code example</p>
                  <h2 className="text-h4">Basic usage</h2>
                </div>
                <CodeSnippet code={exampleCode} className={`code-block ${styles.codeBlock}`} />
              </div>
            </article>

            <article className={styles.supportCard}>
              <div className="copy-stack">
                <div className="copy-stack">
                  <p className="text-label">Notes</p>
                  <h2 className="text-h4">Accessibility and usage</h2>
                </div>

                <div className={styles.noteList}>
                  <p className="text-body-sm">
                    Uses semantic <code>figure</code> and <code>figcaption</code>{" "}
                    structure for a clearer reading order.
                  </p>
                  <p className="text-body-sm">
                    Parse manifests upstream with <code>parseManifest</code> or{" "}
                    <code>useManifest</code>; pass normalized canvases into the
                    component.
                  </p>
                  <p className="text-body-sm">
                    If the images communicate meaning, ensure canvas labels are
                    descriptive because they inform the default alternative text.
                  </p>
                  <p className="text-body-sm">
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
