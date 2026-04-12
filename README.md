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

### Render canvases

```tsx
import { CanvasSequence } from "@velum/react";

<CanvasSequence canvases={manifest.canvases} />
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
IIIF Data → Core Models → React Primitives → Adapters → Templates
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

### Build packages

```bash
pnpm build
```

---

## Monorepo Structure

```text
velum/
  apps/
    docs/
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