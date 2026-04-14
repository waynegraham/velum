import type { Metadata } from "next";
import Link from "next/link";

import { CodeSnippet } from "@/components/ui/CodeSnippet";

import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Design System",
  description:
    "Editorial Tailwind tokens and utility patterns for the Velum docs experience.",
};

const palette = [
  {
    name: "Canvas",
    token: "bg-canvas",
    variable: "--background",
    swatchClassName: "bg-canvas",
    note: "Off-white page field for long-form reading and artwork.",
  },
  {
    name: "Ink",
    token: "text-ink",
    variable: "--foreground",
    swatchClassName: "bg-ink",
    note: "Near-black primary text and high-contrast anchors.",
  },
  {
    name: "Muted",
    token: "text-muted",
    variable: "--text-muted",
    swatchClassName: "bg-muted",
    note: "Secondary narration, metadata, and supporting notes.",
  },
  {
    name: "Accent",
    token: "text-accent-strong",
    variable: "--accent-strong",
    swatchClassName: "bg-accent-strong",
    note: "Reserved for links, focus, and subtle interaction states.",
  },
] as const;

const typography = [
  {
    label: "Display",
    preview: "text-display font-serif text-ink",
    specimen: "Velum frames interfaces like an exhibition wall.",
    usage: "Hero moments, page openings, and section-defining titles.",
  },
  {
    label: "Heading",
    preview: "text-h2 font-serif text-ink",
    specimen: "A hierarchy built for sequence, not dashboard chrome.",
    usage: "Section titles, content grouping, and reading landmarks.",
  },
  {
    label: "Body",
    preview: "text-body text-ink",
    specimen:
      "Body copy stays open and calm, with enough leading to support sustained reading without crowding the media.",
    usage: "Narrative copy, product explanation, and editorial description.",
  },
  {
    label: "Caption",
    preview: "text-caption",
    specimen: "Captions stay restrained so the artwork remains primary.",
    usage: "Figure notes, metadata, labels, and secondary context.",
  },
  {
    label: "Code",
    preview: "code-chip text-ink",
    specimen: "<section className=\"page-shell section-space\">",
    usage: "Examples, snippets, and implementation references.",
  },
] as const;

const layoutPatterns = [
  {
    name: "Page container",
    classes: "page-shell",
    note: "Centers the page and applies generous top and bottom breathing room.",
  },
  {
    name: "Reading column",
    classes: "reading-column",
    note: "Keeps paragraphs and headings at a calm editorial measure.",
  },
  {
    name: "Wide media container",
    classes: "media-column media-frame",
    note: "Gives artwork more width while keeping the frame quiet and minimal.",
  },
  {
    name: "Editorial section spacing",
    classes: "section-space section-rule",
    note: "Creates major vertical rhythm between sections with a restrained divider.",
  },
] as const;

const pageSnippet = `<main className="page-shell">
  <section className="editorial-stack">
    <p className="text-label">Velum</p>
    <div className="copy-stack reading-column">
      <h1 className="text-display font-serif text-ink">
        Editorial structure for art-first documentation.
      </h1>
      <p className="text-body text-ink">
        Use wide margins, restrained color, and deliberate hierarchy.
      </p>
    </div>
  </section>
</main>`;

const mediaSnippet = `<figure className="media-column media-frame editorial-stack">
  <div className="design-system-swatch design-system-swatch-media bg-surface"></div>
  <figcaption className="text-caption">
    Artwork sits inside a quiet frame with room around the image.
  </figcaption>
</figure>`;

export default function DesignSystemPage() {
  return (
    <main className="page-shell">
      <section className="editorial-stack">
        <p className="text-label">Design System</p>
        <div className={styles.heroGrid}>
          <div className="copy-stack reading-column">
            <h1 className="text-display font-serif text-ink">
              A calm, exhibition-like Tailwind system for the Velum docs app.
            </h1>
            <p className="text-body text-ink">
              The system is intentionally restrained: soft neutrals, near-black text,
              one muted accent, generous vertical spacing, and typography that carries
              the page before interface chrome does.
            </p>
          </div>

          <div className="copy-stack reading-column-tight">
            <p className="text-caption">
              Use it to keep documentation feeling like an editorial sequence rather
              than a product dashboard.
            </p>
            <p className="text-caption">
              The examples below use Tailwind utilities defined in
              <code className="code-inline ml-1">
                src/app/globals.css
              </code>
              .
            </p>
          </div>
        </div>
      </section>

      <section className="section-space section-rule editorial-stack">
        <div className="copy-stack reading-column">
          <p className="text-label">Palette</p>
          <h2 className="text-h2 font-serif text-ink">
            A restrained palette that lets the content carry the atmosphere.
          </h2>
        </div>

        <div className={styles.paletteGrid}>
          {palette.map((color) => (
            <article key={color.name} className={`copy-stack ${styles.paletteCard}`}>
              <div className={`${styles.swatch} ${styles.swatchShort} ${color.swatchClassName}`} />
              <div className="copy-stack">
                <div className="flex flex-wrap items-baseline justify-between gap-3">
                  <h3 className="text-h3 font-serif text-ink">{color.name}</h3>
                  <code className={`code-chip ${styles.metaCode} code-chip-muted`}>{color.variable}</code>
                </div>
                <p className="text-caption">{color.note}</p>
                <code className={`code-chip ${styles.tokenCode}`}>{color.token}</code>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section-space section-rule editorial-stack">
        <div className="copy-stack reading-column">
          <p className="text-label">Typography</p>
          <h2 className="text-h2 font-serif text-ink">
            Typography tokens define the interface more than boxes or effects do.
          </h2>
        </div>

        <div className="grid gap-6">
          {typography.map((item) => (
            <article key={item.label} className={styles.specimenRow}>
              <div className="copy-stack">
                <p className="text-label">{item.label}</p>
                <code className={`code-chip ${styles.metaCode} code-chip-muted`}>{item.preview}</code>
              </div>
              <div className="reading-column">
                <p className={item.preview}>{item.specimen}</p>
              </div>
              <p className="text-caption">{item.usage}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-space section-rule editorial-stack">
        <div className="copy-stack reading-column">
          <p className="text-label">Rhythm</p>
          <h2 className="text-h2 font-serif text-ink">
            Spacing and width utilities preserve the reading pace across pages.
          </h2>
          <p className="text-body text-ink">
            Sections should feel separated like rooms in an exhibition. Copy stays
            narrow; media is allowed to widen; chrome stays light.
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
          {layoutPatterns.map((pattern) => (
            <article key={pattern.name} className={`copy-stack ${styles.patternCard}`}>
              <p className="text-label">{pattern.name}</p>
              <code className={`code-chip ${styles.tokenCode}`}>{pattern.classes}</code>
              <p className="text-caption">{pattern.note}</p>
            </article>
          ))}
        </div>

        <div className={styles.widthGrid}>
          <div className="copy-stack reading-column">
            <h3 className="text-h3 font-serif text-ink">Recommended width rhythm</h3>
            <p className="text-body text-ink">
              Use <code className="code-inline">reading-column</code> for prose,{" "}
              <code className="code-inline">media-column</code> for images, and{" "}
              <code className="code-inline">page-shell</code> for the page frame.
            </p>
            <p className="text-caption">
              Major sections should usually start with <code className="code-chip">section-space</code>;
              denser supporting sections can step down to <code className="code-chip">section-space-md</code>.
            </p>
          </div>

          <figure className="media-column media-frame editorial-stack">
            <div className={`${styles.swatch} ${styles.swatchMedia} bg-surface`} />
            <figcaption className="text-caption">
              Media receives more width and extra internal margin so the image is not
              pressed against the text flow.
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="section-space section-rule editorial-stack">
        <div className="copy-stack reading-column">
          <p className="text-label">Example Usage</p>
          <h2 className="text-h2 font-serif text-ink">
            Page layout, headings, body copy, and media can all be composed with a
            small set of utilities.
          </h2>
        </div>

        <div className="measure-grid lg:grid-cols-2">
          <div className="copy-stack">
            <h3 className="text-h3 font-serif text-ink">Page and type</h3>
            <CodeSnippet code={pageSnippet} className="code-panel" />
          </div>
          <div className="copy-stack">
            <h3 className="text-h3 font-serif text-ink">Media and caption</h3>
            <CodeSnippet code={mediaSnippet} className="code-panel" />
          </div>
        </div>

        <div className={styles.liveComposition}>
          <div className="copy-stack reading-column">
            <p className="text-label">Live Composition</p>
            <h3 className="text-h1 font-serif text-ink">
              A page can stay spare and still feel considered.
            </h3>
            <p className="text-body text-ink">
              This layout uses only the shared editorial utilities. The result is open,
              typographic, and quiet enough to let IIIF imagery lead.
            </p>
            <p className="text-caption">
              Apply the same structure to demos, API pages, and template walkthroughs.
            </p>
            <Link className={styles.inlineLink} href="/">
              Return to the home experience
            </Link>
          </div>

          <figure className="media-column media-frame editorial-stack">
            <div className={`${styles.swatch} ${styles.swatchMediaTall} bg-panel`} />
            <figcaption className="text-caption">
              Quiet border, no shadow-first styling, no saturated fill, no heavy cards.
            </figcaption>
          </figure>
        </div>
      </section>
    </main>
  );
}
