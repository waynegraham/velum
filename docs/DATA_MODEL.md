# Data Model

## Overview

Velum defines a normalized data model for IIIF Presentation API 3 manifests.

Raw IIIF JSON is complex and inconsistent. Velum converts it into predictable, typed structures for use in UI components.

All rendering code must use these normalized models.

---

## Design Principles

- Normalize once, consume everywhere
- Align with IIIF concepts
- Avoid leaking raw JSON into UI
- Keep models minimal but sufficient

---

## ManifestModel

Represents a IIIF manifest.

```ts
interface ManifestModel {
  id: string;
  label: string;
  summary?: string;
  metadata: MetadataEntry[];
  canvases: CanvasModel[];
  ranges: RangeModel[];
}

### Notes

* `label` is normalized to a string
* `summary` is optional
* `metadata` is flattened for easier rendering

---

## CanvasModel

Represents a IIIF canvas.

```tsx
interface CanvasModel {
  id: string;
  label?: string;
  width?: number;
  height?: number;
  items: ImageResourceModel[];
  annotations: AnnotationModel[];
}
```

### Notes

* A canvas is the primary rendering unit
* `items` typically contain image resources
* `annotations` represent overlays or interactions

---

## ImageResourceModel

Represents an image resource associated with a canvas.

```tsx
interface ImageResourceModel {
  id: string;
  type?: string;
  format?: string;
  width?: number;
  height?: number;
  service?: ImageServiceModel;
}
```

### Notes

* `id` is typically the image URL
* `service` may point to an IIIF Image API endpoint

---

## ImageServiceModel

Represents an IIIF Image API service.

```tsx
interface ImageServiceModel {
  id: string;
  profile?: string;
  type?: string;
}
```

### Notes

* Used for deep zoom and tiled image rendering
* May be extended in future for full Image API support

---

## AnnotationModel

Represents a IIIF annotation.

```tsx
interface AnnotationModel {
  id: string;
  target: string;
  body?: unknown;
}
```

### Notes
* `target` links annotation to a canvas or region
* `body` is intentionally flexible
* Future versions may normalize bodies further

---

## RangeModel

Represents a grouping or narrative structure.

```tsx
interface RangeModel {
  id: string;
  label?: string;
  items: string[];
}
```

## Notes
* `items` reference canvas IDs or nested ranges
* Used for navigation or storytelling structures

---

## MetadataEntry

```tsx
interface MetadataEntry {
  label: string;
  value: string;
}
```

### Notes
* Flattened from IIIF's multilingual structure
* Simplifies rendering in UI

---

## InternationalString Handling

IIIF uses language maps:

```tsx
{
  "en": ["Example Label"]
}
```

Velum simplifies this to:

```tsx
string
```

### Rules
* Use the first available language
* Ignore locale complexity in core model
* Future enhancement may support full localization

---

## Parsing Rules

### General

* Ignore unknown fields
* Fail gracefully on missing data
* Prefer `undefined` over invalid values

---

### Images 

* Extract from `canvas.items[].items[].body`
* Support both single and array service

---

### Annotations

* Extract from `canvas.annotations[].items`
* Only include valid id and target


---

### Ranges

* Extract from `manifest.structures`
* flatten item references to IDs

---

### Constraints
* Models must remain serializable
* No functions or class instances
* No DOM references
* No framework dependencies

---

## Future Extensions

Planned enhancements:

* Full annotation body normalization
* Better region targeting support
* Image API parameter helpers
* Localization support for labels
* Range hierarchy modeling

---

## Summary

The Velum data model provides:

* predictable structure
* alignment with IIIF
* simplified consumption for UI
