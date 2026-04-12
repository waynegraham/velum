import { describe, expect, it } from "vitest";

import { parseManifest } from "./parseManifest";

describe("parseManifest annotations", () => {
  it("extracts annotations from canvas.annotations[].items", () => {
    const manifest = parseManifest({
      id: "manifest-1",
      label: { en: ["Manifest"] },
      items: [
        {
          id: "canvas-1",
          type: "Canvas",
          annotations: [
            {
              id: "page-1",
              type: "AnnotationPage",
              items: [
                {
                  id: "annotation-1",
                  type: "Annotation",
                  target: "canvas-1#xywh=0,0,100,100",
                  body: {
                    type: "TextualBody",
                    value: "Note"
                  }
                }
              ]
            }
          ]
        }
      ]
    });

    expect(manifest.canvases[0]?.annotations).toEqual([
      {
        id: "annotation-1",
        target: "canvas-1#xywh=0,0,100,100",
        body: {
          type: "TextualBody",
          value: "Note"
        }
      }
    ]);
  });

  it("accepts structured targets with ids and filters invalid annotations", () => {
    const manifest = parseManifest({
      id: "manifest-1",
      label: { en: ["Manifest"] },
      items: [
        {
          id: "canvas-1",
          type: "Canvas",
          annotations: [
            {
              id: "page-1",
              type: "AnnotationPage",
              items: [
                {
                  id: "annotation-1",
                  target: {
                    id: "canvas-1#xywh=10,10,50,50"
                  }
                },
                {
                  id: "",
                  target: "canvas-1#xywh=1,1,1,1"
                },
                {
                  id: "annotation-3"
                },
                {
                  target: "canvas-1#xywh=2,2,2,2"
                }
              ]
            }
          ]
        }
      ]
    });

    expect(manifest.canvases[0]?.annotations).toEqual([
      {
        id: "annotation-1",
        target: "canvas-1#xywh=10,10,50,50"
      }
    ]);
  });
});
