# AGENTS.md

## Purpose

This document defines how contributors (human or AI agents) should interact with the Velum codebase. It establishes conventions, boundaries, and expectations to maintain consistency, reliability, and long-term maintainability.

Velum is a monorepo containing:
- A core IIIF domain layer
- React component primitives
- Optional animation/scroll adapters (GSAP, Lenis)
- Higher-level templates
- A documentation/demo application

---

## Core Principles

### 1. Separation of Concerns

- `@velum/core` must remain framework-agnostic
- `@velum/react` handles rendering and hooks only
- `@velum/adapters` contains all GSAP, ScrollTrigger, Lenis logic
- `@velum/templates` composes primitives into real-world use cases

Do not mix responsibilities across packages.

---

### 2. IIIF as a Domain Model

- Never pass raw IIIF manifests deep into components
- Always normalize via `parseManifest` or equivalent utilities
- Components should consume typed domain models, not arbitrary JSON

---

### 3. Motion is Optional

- No component should require GSAP or Lenis to function
- Motion must be layered via adapters
- All components must work without animation

---

### 4. Accessibility and Progressive Enhancement

- Support reduced motion (`prefers-reduced-motion`)
- Ensure content is visible without animation
- Avoid scroll-only interactions that block access

---

### 5. Explicit Public APIs

- Only export intended APIs via `src/index.ts`
- Avoid `export *` where ambiguity may arise
- Prefer named exports for stability and clarity

---

## Monorepo Structure

```bash
velum/
    apps/
        docs/
        storybook/
packages/
    core/
    react/
    adapters/
    templates/
    tsconfig/
    eslint-config/
examples/
test-fixtures/
```


---

## Package Responsibilities

### @velum/core

- IIIF Presentation API parsing
- Normalized domain models
- Image service helpers
- No React, no GSAP, no browser assumptions

### @velum/react

- React hooks (`useManifest`, etc.)
- Rendering components (`CanvasSequence`, etc.)
- No animation libraries directly

### @velum/adapters

- GSAP integration
- ScrollTrigger logic
- Lenis provider and hooks
- Parallax utilities

### @velum/templates

- Opinionated compositions
- Real-world patterns (storytelling, maps, galleries)

---

## Development Workflow

### Install dependencies

```bash
pnpm install
```


### Run development

```bash
pnpm dev
```

### Build all packages

```bash
pnpm build
```

### Type checking

```bash
pnpm typecheck
```

### Linting

```bash
pnpm lint
```

---

## Coding Standards

### TypeScript

- Strict mode enabled
- Use `import type` for types
- Avoid `any`
- Prefer explicit interfaces for public APIs

### React

- Functional components only
- Hooks for data and behavior
- No side effects in render

### Naming

- Clear, descriptive names
- Align with IIIF terminology:
  - Manifest
  - Canvas
  - Annotation
  - Range

---

## Testing Strategy

- Unit tests in packages using Vitest
- Use real IIIF fixtures from `test-fixtures/`
- Avoid mocking IIIF structures unnecessarily

---

## Adding New Features

Before adding a feature:

1. Determine the correct package
2. Ensure it aligns with separation of concerns
3. Add types to `core` if needed
4. Implement logic in `core` or `react`
5. Add adapter logic only if necessary
6. Document usage in `apps/docs`

---

## Common Mistakes to Avoid

- Parsing manifests inside React components
- Coupling components to GSAP or Lenis
- Exporting everything via wildcard barrels
- Introducing styling assumptions into primitives
- Ignoring IIIF structure (canvases, ranges, annotations)

---

## Release Process

Velum uses Changesets:

```bash
pnpm changeset
pnpm version-packages
pnpm release
```

---

## Final Note

Velum is intended to be:
- predictable
- composable
- domain-driven

When in doubt, prefer simplicity and clarity over abstraction.