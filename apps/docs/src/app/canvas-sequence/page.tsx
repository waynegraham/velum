"use client";

import { CanvasSequence, useManifest } from "@velum/react";

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

const pageStyle = {
  maxWidth: 960,
  margin: "0 auto",
  padding: "3rem 1.5rem 5rem",
};

const sectionStyle = {
  display: "grid",
  gap: "1rem",
  marginTop: "2.5rem",
};

const cardStyle = {
  border: "1px solid rgba(127, 127, 127, 0.3)",
  borderRadius: "0.75rem",
  padding: "1.25rem",
};

export default function CanvasSequenceDocsPage() {
  const { manifest, isLoading, error } = useManifest(manifestUrl);

  return (
    <main style={pageStyle}>
      <header style={{ display: "grid", gap: "0.75rem" }}>
        <p style={{ margin: 0, fontSize: "0.875rem", opacity: 0.7 }}>
          @velum/react
        </p>
        <h1 style={{ margin: 0 }}>CanvasSequence</h1>
        <p style={{ margin: 0, maxWidth: "70ch", lineHeight: 1.6 }}>
          `CanvasSequence` renders a list of IIIF canvases as a simple visual
          sequence. It is useful when a manifest already has normalized canvas
          data and you want a straightforward reading or browsing experience
          without adding custom rendering logic.
        </p>
      </header>

      <section style={sectionStyle}>
        <h2 style={{ margin: 0 }}>What It Does</h2>
        <div style={cardStyle}>
          <p style={{ marginTop: 0 }}>
            The component accepts an array of `CanvasModel` objects and renders
            each canvas as a figure with its primary image and optional label.
            It stays close to the normalized IIIF domain model and works well as
            a baseline gallery, reading sequence, or story scaffold.
          </p>
          <p style={{ marginBottom: 0 }}>
            Because it consumes normalized canvases directly, parsing should
            happen upstream with `parseManifest` or with hooks such as
            `useManifest`.
          </p>
        </div>
      </section>

      <section style={sectionStyle}>
        <h2 style={{ margin: 0 }}>Example Usage</h2>
        <div style={cardStyle}>
          <pre
            style={{
              margin: 0,
              overflowX: "auto",
              whiteSpace: "pre-wrap",
              fontSize: "0.925rem",
              lineHeight: 1.6,
            }}
          >
            <code>{exampleCode}</code>
          </pre>
        </div>
      </section>

      <section style={sectionStyle}>
        <h2 style={{ margin: 0 }}>Live Demo</h2>
        <div style={cardStyle}>
          <p style={{ marginTop: 0 }}>
            This demo loads a public IIIF manifest and renders the first five
            canvases with `CanvasSequence`.
          </p>

          {isLoading ? <p>Loading manifest...</p> : null}
          {error ? <p>Unable to load manifest: {error.message}</p> : null}

          {manifest ? (
            <div style={{ display: "grid", gap: "1rem" }}>
              <div>
                <h3 style={{ margin: 0 }}>{manifest.label}</h3>
                <p style={{ margin: "0.5rem 0 0", opacity: 0.8 }}>
                  Source manifest:{" "}
                  <a href={manifestUrl} target="_blank" rel="noreferrer">
                    {manifestUrl}
                  </a>
                </p>
              </div>
              <CanvasSequence canvases={manifest.canvases.slice(0, 5)} />
            </div>
          ) : null}
        </div>
      </section>

      <section style={sectionStyle}>
        <h2 style={{ margin: 0 }}>Accessibility</h2>
        <div style={cardStyle}>
          <p style={{ marginTop: 0 }}>
            `CanvasSequence` uses semantic figure and figcaption markup, which
            helps preserve a clear reading structure for assistive technology.
          </p>
          <p>
            Image alternative text is derived from each canvas label in the
            current implementation, so manifests should provide clear,
            descriptive labels when the images carry important meaning.
          </p>
          <p style={{ marginBottom: 0 }}>
            If a sequence needs richer narration, transcript content, or custom
            focus management, compose `CanvasSequence` inside a page or template
            that adds those affordances explicitly.
          </p>
        </div>
      </section>
    </main>
  );
}
