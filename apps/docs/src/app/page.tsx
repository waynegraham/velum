"use client";

import { CanvasSequence, useManifest } from "@velum/react";
import { LenisProvider } from "@velum/adapters";

const manifestUrl =
  "https://iiif.harvardartmuseums.org/manifests/object/299843";

export default function HomePage() {
  const { manifest, isLoading, error } = useManifest(manifestUrl);

  return (
    <LenisProvider>
      <main style={{ maxWidth: 960, margin: "0 auto", padding: "3rem 1.5rem" }}>
        <h1>Velum</h1>
        <p>IIIF-driven React components for motion, scroll, and storytelling.</p>

        {isLoading ? <p>Loading manifest…</p> : null}
        {error ? <p>{error.message}</p> : null}

        {manifest ? (
          <>
            <h2>{manifest.label}</h2>
            <CanvasSequence canvases={manifest.canvases.slice(0, 5)} />
          </>
        ) : null}
      </main>
    </LenisProvider>
  );
}