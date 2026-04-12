export interface InternationalString {
  [locale: string]: string[];
}

export interface MetadataEntry {
  label: string;
  value: string;
}

export interface ImageServiceModel {
  id: string;
  profile?: string;
  type?: string;
}

export interface AnnotationRegion {
  left: string;
  top: string;
  width: string;
  height: string;
}

export interface AnnotationModel {
  id: string;
  target: string;
  body?: unknown;
  label: string | null;
  region: AnnotationRegion | null;
}

export interface ImageResourceModel {
  id: string;
  type?: string;
  format?: string;
  width?: number;
  height?: number;
  service?: ImageServiceModel;
}

export interface CanvasModel {
  id: string;
  label?: string;
  width?: number;
  height?: number;
  items: ImageResourceModel[];
  annotations: AnnotationModel[];
}

export interface RangeModel {
  id: string;
  label?: string;
  items: string[];
}

export interface ManifestModel {
  id: string;
  label: string;
  summary?: string;
  metadata: MetadataEntry[];
  canvases: CanvasModel[];
  ranges: RangeModel[];
}