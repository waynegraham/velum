"use client";

import { useManifest } from "@velum/react";
import { AnnotatedCanvas } from "@velum/react";

import { MotionBlock } from "@/components/motion/MotionBlock";
import { TransitionSection } from "@/components/motion/TransitionSection";
import { CodeSnippet } from "@/components/ui/CodeSnippet";

import styles from "./page.module.css";

const manifestUrl = "https://iiif.harvardartmuseums.org/manifests/object/299843";

const exampleCode = `import { AnnotatedCanvas } from "@velum/react";
import type { CanvasModel } from "@velum/core";

interface ExampleProps {
  canvas: CanvasModel;
}

export function Example({ canvas }: ExampleProps) {
  return <AnnotatedCanvas canvas={canvas} />;
}`;

export default function AnnotatedCanvasDocsPage() {
  const { manifest, isLoading, error } = useManifest(manifestUrl);
  
  // Just use the first canvas for the demo
  const demoCanvas = manifest?.canvases[0];

  return (
    <main className={styles.page}>
      <TransitionSection as="header" className={styles.header} space="hero" tone="surface">
        <MotionBlock reveal={{ distance: 16, duration: 0.58, start: "top 90%" }}>
          <div className={styles.headerGrid}>
            <div className={`copy-stack ${styles.headerIntro}`}>
              <p className="text-label">@velum/react</p>
              <h1 className={`text-h1 reading-column-tight ${styles.title}`}>AnnotatedCanvas</h1>
            </div>

            <div className={`copy-stack ${styles.headerMeta}`}>
              <p className={`text-body reading-column ${styles.description}`}>
                A focused canvas view that supports drawing annotations (regions of interest, 
                labels, or highlights) directly over the image.
              </p>
              <div className={styles.metaRow}>
                <span className={styles.metaPill}>Primitive component</span>
                <span className={styles.metaPill}>Annotation support</span>
                <span className={styles.metaPill}>Relative positioning</span>
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
              <p className="text-label">Interactive viewport</p>
              <h2 className="text-h3 reading-column-tight">Spatial metadata in context.</h2>
            </div>
            <p className={`text-caption reading-column ${styles.demoCaption}`}>
              Rendering a single canvas with its native annotations. If the manifest 
              contains <code>Rect</code> or <code>Point</code> annotations, they will 
              appear as overlays.
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

          {demoCanvas ? (
            <div className={styles.canvasWrapper}>
              <AnnotatedCanvas canvas={demoCanvas} />
            </div>
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
                  <h2 className="text-h4">Layout and CSS</h2>
                </div>

                <div className={styles.noteList}>
                  <p className="text-body-sm">
                    The component is <code>position: relative</code> by default to 
                    contain its absolute-positioned annotation children.
                  </p>
                  <p className="text-body-sm">
                    Annotations are scaled relative to the canvas dimensions. Ensure 
                    the <code>CanvasModel</code> has correct width and height.
                  </p>
                  <p className="text-body-sm">
                    Use the <code>renderAnnotation</code> prop to customize the 
                    visual appearance of overlays (e.g., custom colors, SVG shapes).
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
