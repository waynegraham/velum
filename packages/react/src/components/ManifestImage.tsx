import type { ReactNode } from "react";
import type { ImageResourceModel } from "@velum/core";

export interface ManifestImageProps {
  image: ImageResourceModel;
  caption?: ReactNode;
  alt?: string;
  className?: string;
}

export function ManifestImage({
  image,
  caption,
  alt = "",
  className,
}: ManifestImageProps) {
  return (
    <figure style={{ margin: 0 }} className={className}>
      <img
        src={image.id}
        alt={alt}
        width={image.width}
        height={image.height}
        style={{ width: "100%", height: "auto", display: "block" }}
      />
      {caption ? (
        <figcaption style={{ marginTop: "0.75rem" }}>{caption}</figcaption>
      ) : null}
    </figure>
  );
}
