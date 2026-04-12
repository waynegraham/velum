import { describe, expect, it } from "vitest";

import manifestFixture from "../../../../test-fixtures/basic-manifest.json";
import { parseManifest } from "./parseManifest";

describe("parseManifest", () => {
  const manifest = parseManifest(manifestFixture);

  it("parses a basic manifest", () => {
    expect(manifest).toMatchObject({
      id: "https://example.org/iiif/basic-manifest",
      label: "Basic Manifest",
      summary: "A compact IIIF Presentation 3 manifest used for parser tests."
    });
  });

  it("parses metadata", () => {
    expect(manifest.metadata).toEqual([
      {
        label: "Author",
        value: "Example Author"
      },
      {
        label: "Institution",
        value: "Velum Test Collection"
      }
    ]);
  });

  it("parses canvases", () => {
    expect(manifest.canvases).toHaveLength(2);
    expect(manifest.canvases[0]).toMatchObject({
      id: "https://example.org/iiif/canvas/1",
      label: "Page 1",
      width: 1200,
      height: 1800,
      items: [
        {
          id: "https://example.org/iiif/image/1/full/full/0/default.jpg",
          type: "Image",
          format: "image/jpeg",
          width: 1200,
          height: 1800,
          service: {
            id: "https://example.org/iiif/image/1",
            profile: "level2",
            type: "ImageService3"
          }
        }
      ]
    });
    expect(manifest.canvases[1]).toMatchObject({
      id: "https://example.org/iiif/canvas/2",
      label: "Page 2",
      width: 1200,
      height: 1800
    });
  });

  it("parses annotations", () => {
    expect(manifest.canvases[0]?.annotations).toEqual([
      {
        id: "https://example.org/iiif/annotation/1",
        target: "https://example.org/iiif/canvas/1#xywh=100,120,300,220",
        body: {
          type: "TextualBody",
          value: "Margin note",
          format: "text/plain"
        }
      }
    ]);
    expect(manifest.canvases[1]?.annotations).toEqual([]);
  });
});
