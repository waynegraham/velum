# Architecture

## Overview

Velum is a modular system for building IIIF-driven interfaces with React, with optional motion and scroll behavior.

It is organized as a layered architecture:

IIIF Data → Core → React → Adapters → Templates

Each layer has strict responsibilities and must not leak concerns into others.

---

## Design Goals

- **IIIF-first modeling**  
  All data structures align with IIIF Presentation API 3 concepts.

- **Separation of concerns**  
  Data, rendering, motion, and composition are isolated.

- **Composable primitives**  
  Small building blocks over monolithic components.

- **Motion as opt-in**  
  GSAP, ScrollTrigger, and Lenis are not required for core usage.

- **Progressive enhancement**  
  All components must function without animation.

---

## Package Responsibilities

### `@velum/core`

**Purpose:** Domain layer for IIIF data.

Responsibilities:
- Parse IIIF Presentation 3 manifests
- Normalize raw IIIF JSON into stable internal models
- Define shared types (`ManifestModel`, `CanvasModel`, etc.)

Constraints:
- No React
- No DOM usage
- No GSAP, Lenis, or browser APIs

---

### `@velum/react`

**Purpose:** Rendering and interaction layer.

Responsibilities:
- React hooks (e.g., `useManifest`)
- UI primitives (e.g., `CanvasSequence`)
- Mapping normalized models to UI

Constraints:
- No direct animation library usage
- No raw IIIF parsing

---

### `@velum/adapters`

**Purpose:** Optional motion and scroll integrations.

Responsibilities:
- GSAP timelines and ScrollTrigger logic
- Lenis scroll provider
- Parallax and motion utilities

Constraints:
- Must be optional
- Must not affect core or react behavior if removed

---

### `@velum/templates`

**Purpose:** High-level compositions.

Responsibilities:
- Combine primitives into real-world patterns:
  - scroll storytelling
  - annotated maps
  - galleries

Constraints:
- Must use existing primitives
- Must not introduce new core logic

---

## Data Flow

1. A IIIF manifest is fetched (e.g., via `useManifest`)
2. `parseManifest` converts raw JSON into a `ManifestModel`
3. React components consume normalized models
4. Optional adapters enhance behavior (scroll, animation)
```text
Raw IIIF JSON
↓
parseManifest
↓
ManifestModel
↓
React Components
↓
(Optional) Adapters
```


---

## Core Concepts

Velum mirrors IIIF structure:

- **Manifest** → collection of canvases
- **Canvas** → a renderable unit (image, scene)
- **Annotation** → overlays or interactions
- **Range** → grouping or narrative structure

All abstractions should align with these concepts.

---

## Anti-Patterns

Avoid the following:

### ❌ Parsing IIIF inside React components
All parsing must happen in `@velum/core`.

---

### ❌ Coupling animation into primitives
No GSAP or scroll logic in `@velum/react`.

---

### ❌ Passing raw manifests through the app
Always normalize first.

---

### ❌ Overloading templates with logic
Templates compose; they do not define core behavior.

---

## Extending the System

When adding a feature:

1. Determine if it is:
   - data → `core`
   - UI → `react`
   - motion → `adapters`
   - composition → `templates`

2. Add types to `core` if needed

3. Keep APIs small and explicit

4. Add usage examples in docs

---

## Accessibility Considerations

- Support `prefers-reduced-motion`
- Ensure content is accessible without scroll effects
- Avoid hidden content tied to animation

---

## Summary

Velum is designed to be:

- predictable
- modular
- aligned with IIIF
- flexible for both static and animated use cases

When in doubt, prefer clarity over abstraction.

