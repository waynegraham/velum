# Velum

**Velum** is a React component system for building IIIF-powered, animated, scroll-driven cultural heritage interfaces.

It provides:
- A normalized IIIF data layer
- React primitives for rendering manifests
- Optional animation and scroll integrations (GSAP, Lenis)
- Reusable templates for storytelling, maps, and galleries

---

## Why Velum?

IIIF provides a powerful standard for cultural heritage data, but building modern interactive experiences on top of it requires:

- Data normalization
- Rendering abstractions
- Scroll and animation orchestration
- Annotation and range handling

Velum addresses these gaps with a modular architecture.

---

## Packages

### `@velum/core`
Framework-agnostic IIIF utilities:
- Manifest parsing
- Domain models
- Image service helpers

### `@velum/react`
React primitives:
- Hooks (`useManifest`)
- Components (`CanvasSequence`, `AnnotatedCanvas`)

### `@velum/adapters`
Optional integrations:
- GSAP
- ScrollTrigger
- Lenis
- Parallax helpers

### `@velum/templates`
Higher-level compositions:
- Scroll storytelling
- Annotated maps
- Collection viewers

---

## Installation

Install individual packages:

```bash
pnpm add @velum/react
```

Optional adapters:

```bash
pnpm add @velum/adapters gsap @gsap/react lenis
```

---

## Basic Usage

### Load a IIIF manifest

```tsx
import { useManifest } from "@velum/react";

const { manifest, isLoading } = useManifest(manifestUrl);
```

### Render a single canvas image

```tsx
import { CanvasImage } from "@velum/react";

<CanvasImage canvas={manifest.canvases[0]} />
```

### Render canvases as a sequence

```tsx
import { CanvasSequence } from "@velum/react";

<CanvasSequence canvases={manifest.canvases} />
```

### Render an annotated canvas

```tsx
import { AnnotatedCanvas } from "@velum/react";

<AnnotatedCanvas canvas={manifest.canvases[0]} />
```

### Render manifest metadata

```tsx
import { ManifestHeader } from "@velum/react";

<ManifestHeader manifest={manifest} />
```

### Select a specific canvas

```tsx
import { useCanvas } from "@velum/react";

const canvas = useCanvas(manifest, canvasId);
```

### Navigate manifest ranges

```tsx
import { RangeNavigator } from "@velum/react";

<RangeNavigator
  ranges={manifest.ranges}
  selectedRangeId={selectedRangeId}
  onSelect={(range) => setSelectedRangeId(range.id)}
/>
```

### Compose media and editorial content

```tsx
import { CanvasSection } from "@velum/react";

<CanvasSection canvas={manifest.canvases[0]} layout="split">
  <p>Contextual interpretation for this canvas.</p>
</CanvasSection>
```

---

### With Scroll and Motion (Optional)

```tsx
import { LenisProvider } from "@velum/adapters";

<LenisProvider>
  <CanvasSequence canvases={manifest.canvases} />
</LenisProvider>
```

---

## Architecture

Velum follows a layered approach:

```text
IIIF Data -> Core Models -> React Primitives -> Adapters -> Templates
```

Key principles:

* IIIF-first data modeling
* Motion as opt-in
* Clear separation of concerns
* Accessibility and progressive enhancement

---

## Development

### Install

```bash
pnpm install
```

### Run docs app

```bash
pnpm dev
```

### Run Storybook

```bash
pnpm storybook
```

Storybook provides isolated visual inspection for `@velum/react` components using real IIIF fixtures and the shared `@velum/styles` design system styles.

### Build packages

```bash
pnpm build
```

### Build Storybook

```bash
pnpm build-storybook
```

---

## Monorepo Structure

```text
velum/
  apps/
    docs/
    storybook/
  packages/
    core/
    react/
    adapters/
    templates/
```

---

## Roadmap

* Expanded IIIF Presentation 3 support
* Annotation-driven interaction components
* Advanced scroll storytelling templates
* Image service (deep zoom) integrations
* Accessibility improvements

---

## Contributing

Contributions should:

* Follow package boundaries
* Use normalized IIIF models
* Avoid coupling to animation libraries
* Include documentation examples

See `AGENTS.md` for full guidelines.

---

## License

MIT
