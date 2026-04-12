import type {
  AnnotationModel,
  CanvasModel,
  ImageResourceModel,
  ManifestModel,
  MetadataEntry,
  RangeModel
} from "../types/manifest";

function readIntlString(value: unknown): string {
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
  const annoItems = Array.isArray(firstPage?.items) ? firstPage.items : [];

  return annoItems.flatMap((item) => {
    const anno = item as Record<string, unknown>;
    const body = anno.body as Record<string, unknown> | undefined;
    if (!body?.id || typeof body.id !== "string") return [];

    const service = Array.isArray(body.service)
      ? (body.service[0] as Record<string, unknown> | undefined)
      : (body.service as Record<string, unknown> | undefined);

    const parsedService =
      service && typeof service.id === "string"
        ? ({
            id: service.id,
            ...(typeof service.profile === "string"
              ? { profile: service.profile }
              : {}),
            ...(typeof service.type === "string" ? { type: service.type } : {})
          } satisfies NonNullable<ImageResourceModel["service"]>)
        : undefined;

    return [
      {
        id: body.id,
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
  const annotations = Array.isArray(canvas.annotations) ? canvas.annotations : [];
  return annotations.flatMap((page) => {
    const pageObj = page as Record<string, unknown>;
    const items = Array.isArray(pageObj.items) ? pageObj.items : [];
    return items.flatMap((item) => {
      const anno = item as Record<string, unknown>;
      if (typeof anno.id !== "string" || typeof anno.target !== "string") return [];

      return [
        {
          id: anno.id,
          target: anno.target,
          ...(anno.body !== undefined ? { body: anno.body } : {})
        } satisfies AnnotationModel
      ];
    });
  });
}

function parseCanvases(value: unknown): CanvasModel[] {
  if (!Array.isArray(value)) return [];
  return value.map((canvas) => {
    const obj = canvas as Record<string, unknown>;
    return {
      id: String(obj.id),
      ...(readIntlString(obj.label) ? { label: readIntlString(obj.label) } : {}),
      ...(typeof obj.width === "number" ? { width: obj.width } : {}),
      ...(typeof obj.height === "number" ? { height: obj.height } : {}),
      items: parseImageItems(obj),
      annotations: parseAnnotations(obj)
    } satisfies CanvasModel;
  });
}

function parseRanges(structures: unknown): RangeModel[] {
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

    return {
      id: String(obj.id),
      ...(readIntlString(obj.label) ? { label: readIntlString(obj.label) } : {}),
      items
    } satisfies RangeModel;
  });
}

export function parseManifest(input: unknown): ManifestModel {
  const manifest = input as Record<string, unknown>;

  return {
    id: String(manifest.id ?? ""),
    label: readIntlString(manifest.label) || "Untitled Manifest",
    ...(readIntlString(manifest.summary)
      ? { summary: readIntlString(manifest.summary) }
      : {}),
    metadata: parseMetadata(manifest.metadata),
    canvases: parseCanvases(manifest.items),
    ranges: parseRanges(manifest.structures)
  };
}
