import type {
  AnnotationModel,
  CanvasModel,
  ImageResourceModel,
  ManifestModel,
  MetadataEntry,
  RangeModel
} from "../types/manifest";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function readResourceId(value: unknown): string | undefined {
  if (!value) return undefined;
  if (typeof value === "string") return value;
  if (isRecord(value)) {
    if (typeof value.id === "string" && value.id) return value.id;
    if (typeof value["@id"] === "string" && value["@id"]) return value["@id"];
  }
  return undefined;
}

function readIntlString(value: unknown): string {
  if (typeof value === "string") return value;
  if (!value || typeof value !== "object") return "";
  const entries = Object.values(value as Record<string, unknown>);
  const first = entries[0];
  if (Array.isArray(first) && typeof first[0] === "string") return first[0];
  return "";
}

function parseMetadata(value: unknown): MetadataEntry[] {
  if (!Array.isArray(value)) return [];
  return value.map((entry) => {
    const obj = entry as Record<string, unknown>;
    return {
      label: readIntlString(obj.label),
      value: readIntlString(obj.value)
    };
  });
}

function parseImageItems(canvas: Record<string, unknown>): ImageResourceModel[] {
  const items = Array.isArray(canvas.items) ? canvas.items : [];
  const firstPage = items[0] as Record<string, unknown> | undefined;
  let annoItems = Array.isArray(firstPage?.items) ? firstPage.items : [];

  // Fallback to IIIF 2: canvas.images
  if (annoItems.length === 0 && Array.isArray(canvas.images)) {
    annoItems = canvas.images;
  }

  return annoItems.flatMap((item) => {
    const anno = item as Record<string, unknown>;
    const body = (anno.body || anno.resource) as Record<string, unknown> | undefined;
    
    const bodyId = readResourceId(body);
    if (!body || !bodyId) return [];

    const service = Array.isArray(body.service)
      ? (body.service[0] as Record<string, unknown> | undefined)
      : (body.service as Record<string, unknown> | undefined);

    const serviceId = service ? readResourceId(service) : undefined;

    const parsedService =
      serviceId
        ? ({
            id: serviceId,
            ...(typeof service!.profile === "string"
              ? { profile: service!.profile }
              : {}),
            ...(typeof service!.type === "string" ? { type: service!.type } : {})
          } satisfies NonNullable<ImageResourceModel["service"]>)
        : undefined;

    return [
      {
        id: bodyId,
        ...(typeof body.type === "string" ? { type: body.type } : {}),
        ...(typeof body.format === "string" ? { format: body.format } : {}),
        ...(typeof body.width === "number" ? { width: body.width } : {}),
        ...(typeof body.height === "number" ? { height: body.height } : {}),
        ...(parsedService ? { service: parsedService } : {})
      } satisfies ImageResourceModel
    ];
  });
}

function parseAnnotations(canvas: Record<string, unknown>): AnnotationModel[] {
  let annotations = Array.isArray(canvas.annotations) ? canvas.annotations : [];
  
  if (annotations.length === 0 && Array.isArray(canvas.otherContent)) {
    annotations = canvas.otherContent;
  }
  
  return annotations.flatMap((page) => {
    const pageObj = page as Record<string, unknown>;
    // IIIF 2 AnnotationList might just be the list or fetched differently, 
    // but we can parse items if present.
    const items = Array.isArray(pageObj.items) ? pageObj.items : [];
    return items.flatMap((item) => {
      if (!isRecord(item)) return [];

      const id = readResourceId(item);
      const target = readResourceId(item.target || item.on);
      if (!id || !target) return [];

      return [
        {
          id,
          target,
          ...(item.body !== undefined ? { body: item.body } : {})
        } satisfies AnnotationModel
      ];
    });
  });
}

function parseCanvases(manifest: Record<string, unknown>): CanvasModel[] {
  let items = Array.isArray(manifest.items) ? manifest.items : [];

  if (items.length === 0 && Array.isArray(manifest.sequences) && manifest.sequences.length > 0) {
    const sequence = manifest.sequences[0] as Record<string, unknown>;
    if (Array.isArray(sequence.canvases)) {
      items = sequence.canvases;
    }
  }

  return items.map((canvas) => {
    const obj = canvas as Record<string, unknown>;
    const id = readResourceId(obj) || String(obj.id || obj["@id"] || "");
    return {
      id,
      ...(readIntlString(obj.label) ? { label: readIntlString(obj.label) } : {}),
      ...(typeof obj.width === "number" ? { width: obj.width } : {}),
      ...(typeof obj.height === "number" ? { height: obj.height } : {}),
      items: parseImageItems(obj),
      annotations: parseAnnotations(obj)
    } satisfies CanvasModel;
  });
}

function parseRanges(manifest: Record<string, unknown>): RangeModel[] {
  const structures = manifest.structures;
  if (!Array.isArray(structures)) return [];
  return structures.map((range) => {
    const obj = range as Record<string, unknown>;
    const items = Array.isArray(obj.items)
      ? obj.items
          .map((item) => {
            const child = item as Record<string, unknown>;
            return typeof child.id === "string" ? child.id : null;
          })
          .filter((item): item is string => item !== null)
      : [];

    const id = readResourceId(obj) || String(obj.id || obj["@id"] || "");

    return {
      id,
      ...(readIntlString(obj.label) ? { label: readIntlString(obj.label) } : {}),
      items
    } satisfies RangeModel;
  });
}

export function parseManifest(input: unknown): ManifestModel {
  const manifest = input as Record<string, unknown>;
  const manifestId = readResourceId(manifest) || String(manifest.id || manifest["@id"] || "");

  return {
    id: manifestId,
    label: readIntlString(manifest.label) || "Untitled Manifest",
    ...(readIntlString(manifest.summary)
      ? { summary: readIntlString(manifest.summary) }
      : {}),
    metadata: parseMetadata(manifest.metadata),
    canvases: parseCanvases(manifest),
    ranges: parseRanges(manifest)
  };
}
