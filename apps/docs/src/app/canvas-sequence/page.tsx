"use client";

import { useManifest } from "@velum/react";

import { Section } from "@/components/layout";
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

  return (
    <main className={styles.page}>
      <Section as="header" className={`${styles.header} ${styles.headerSection}`} space="md">
        <p className="type-label">@velum/react</p>
        <h1 className="type-h1 reading-width-tight">CanvasSequence</h1>
        <p className="type-body reading-width-wide">
          `CanvasSequence` renders a list of IIIF canvases as a simple visual
          sequence. It is useful when a manifest already has normalized canvas
          data and you want a straightforward reading or browsing experience
          without adding custom rendering logic.
        </p>
      </Section>

      <Section className={styles.section} space="lg">
        <h2 className="type-h2 reading-width-tight">What It Does</h2>
        <div className="docs-panel rich-text">
          <p className="type-body">
            The component accepts an array of `CanvasModel` objects and renders
            each canvas as a figure with its primary image and optional label.
            It stays close to the normalized IIIF domain model and works well as
            a baseline gallery, reading sequence, or story scaffold.
          </p>
          <p className="type-body">
            Because it consumes normalized canvases directly, parsing should
            happen upstream with `parseManifest` or with hooks such as
            `useManifest`.
          </p>
        </div>
      </Section>

      <Section className={styles.section} space="lg">
        <h2 className="type-h2 reading-width-tight">Example Usage</h2>
        <div className="docs-panel">
          <pre className="code-block">
            <code>{exampleCode}</code>
          </pre>
        </div>
      </Section>

      <Section className={styles.section} space="lg">
        <h2 className="type-h2 reading-width-tight">Live Demo</h2>
        <div className="docs-panel stack-4">
          <p className="type-body reading-width-wide">
            This demo loads a public IIIF manifest and renders the first five
            canvases with `CanvasSequence`, then adds calmer spacing and
            scroll-timed emphasis so the sequence reads as a paced narrative.
          </p>

          {isLoading ? <p className="type-caption">Loading manifest...</p> : null}
          {error ? (
            <p className="type-caption">Unable to load manifest: {error.message}</p>
          ) : null}

          {manifest ? (
            <div className="stack-4">
              <div className={styles.demoMeta}>
                <h3 className="type-h3 reading-width-tight">{manifest.label}</h3>
                <p className={`type-caption ${styles.manifestLink}`}>
                  Source manifest:{" "}
                  <a href={manifestUrl} target="_blank" rel="noreferrer">
                    {manifestUrl}
                  </a>
                </p>
              </div>
              <NarrativeCanvasSequence canvases={manifest.canvases.slice(0, 5)} />
            </div>
          ) : null}
        </div>
      </Section>

      <Section className={styles.section} space="lg">
        <h2 className="type-h2 reading-width-tight">Accessibility</h2>
        <div className="docs-panel rich-text">
          <p className="type-body">
            `CanvasSequence` uses semantic figure and figcaption markup, which
            helps preserve a clear reading structure for assistive technology.
          </p>
          <p className="type-body">
            Image alternative text is derived from each canvas label in the
            current implementation, so manifests should provide clear,
            descriptive labels when the images carry important meaning.
          </p>
          <p className="type-body">
            If a sequence needs richer narration, transcript content, or custom
            focus management, compose `CanvasSequence` inside a page or template
            that adds those affordances explicitly.
          </p>
        </div>
      </Section>
    </main>
  );
}
