"use client";

import Link from "next/link";

import { LenisProvider } from "@velum/adapters";
import { useManifest } from "@velum/react";

import { ManifestScrollStory } from "@/components/demos/ManifestScrollStory";
import { MotionBlock } from "@/components/motion/MotionBlock";
import { TransitionSection } from "@/components/motion/TransitionSection";

import styles from "./page.module.css";

const manifestUrl =
  "https://iiif.harvardartmuseums.org/manifests/object/299843";

const exampleCode = `import { ScrollStory } from "@velum/templates";

<ScrollStory
  manifest={manifest}
  sectionProps={{ className: "story-section" }}
  sceneOptions={{
    start: "top 82%",
    end: "bottom 18%",
  }}
/>;
`;

export default function ScrollStoryDocsPage() {
  const { manifest, isLoading, error } = useManifest(manifestUrl);

  return (
    <LenisProvider>
      <main className={styles.page}>
        <TransitionSection as="header" className={styles.header} space="md" tone="surface">
          <MotionBlock reveal={{ distance: 16, duration: 0.58, start: "top 90%" }}>
            <div className="stack-3">
              <p className="type-label">@velum/templates</p>
              <h1 className="type-h1 reading-width-tight">ScrollStory</h1>
              <p className="type-body reading-width-wide">
                `ScrollStory` turns a normalized IIIF manifest into a paced reading
                sequence where each canvas owns its own section. The pattern uses calm
                scroll-linked state changes rather than a scripted timeline, so images
                stay readable even when motion is reduced or disabled.
              </p>
              <p className={`type-caption ${styles.headerLinks}`}>
                <Link href="/">Back to docs home</Link>
                <a href={manifestUrl} target="_blank" rel="noreferrer">
                  Open the source manifest
                </a>
              </p>
            </div>
          </MotionBlock>
        </TransitionSection>

        <TransitionSection
          className={styles.section}
          marker="Design intent"
          space="lg"
          tone="surface"
        >
          <MotionBlock reveal={{ distance: 16, duration: 0.54 }}>
            <div className="stack-4">
              <h2 className="type-h2 reading-width-tight">Design Intent</h2>
              <div className="docs-panel rich-text">
                <p className="type-body">
                  This page is built to slow the reader down. Each canvas occupies a
                  full section, the supporting copy arrives with a restrained fade, and
                  the motion layer remains subtle enough that the work still reads when
                  the animation is gone.
                </p>
                <p className="type-body">
                  The composition keeps responsibilities aligned with Velum&apos;s package
                  boundaries: normalized IIIF data comes from `useManifest`, image
                  rendering comes from `CanvasSequence` through `ScrollStory`, and
                  scroll state is layered in via the adapters package.
                </p>
              </div>
            </div>
          </MotionBlock>
        </TransitionSection>

        <TransitionSection
          className={styles.section}
          marker="Example usage"
          space="lg"
          tone="base"
        >
          <MotionBlock reveal={{ distance: 16, duration: 0.54 }}>
            <div className="stack-4">
              <h2 className="type-h2 reading-width-tight">Example Usage</h2>
              <div className="docs-panel">
                <pre className="code-block">
                  <code>{exampleCode}</code>
                </pre>
              </div>
            </div>
          </MotionBlock>
        </TransitionSection>

        <TransitionSection
          className={styles.section}
          marker="Live demo"
          space="lg"
          tone="lift"
        >
          <MotionBlock reveal={{ distance: 18, duration: 0.6, start: "top 84%" }}>
            <div className="stack-4">
              <h2 className="type-h2 reading-width-tight">Live Demo</h2>
              <div className={styles.demoSection}>
                <p className="type-body reading-width-wide">
                  The demo below loads a public IIIF manifest, limits the sequence to
                  five canvases, and gives each canvas its own section with restrained
                  fade and parallax cues. Without motion, the same sections remain fully
                  visible and readable.
                </p>

                {isLoading ? <p className="type-caption">Loading manifest...</p> : null}
                {error ? (
                  <p className="type-caption">Unable to load manifest: {error.message}</p>
                ) : null}

                {manifest ? <ManifestScrollStory manifest={manifest} /> : null}
              </div>
            </div>
          </MotionBlock>
        </TransitionSection>

        <TransitionSection
          className={styles.section}
          marker="Accessibility"
          space="lg"
          tone="surface"
        >
          <MotionBlock reveal={{ distance: 16, duration: 0.54 }}>
            <div className="stack-4">
              <h2 className="type-h2 reading-width-tight">Accessibility</h2>
              <div className="docs-panel rich-text">
                <p className="type-body">
                  Each section uses semantic heading and descriptive text so the page
                  still reads coherently without the scroll effects.
                </p>
                <p className="type-body">
                  Motion follows `prefers-reduced-motion`, and the baseline markup stays
                  visible before JavaScript enhances anything. The effect layer only
                  changes emphasis, not access.
                </p>
              </div>
            </div>
          </MotionBlock>
        </TransitionSection>
      </main>
    </LenisProvider>
  );
}
