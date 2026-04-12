export const containerWidths = {
  narrow: "Tight reading width for labels, headings, and short notes.",
  reading: "Default prose measure for body copy.",
  content: "Comfortable editorial width for denser sections and mixed media.",
  media: "Expanded width for artwork and demos that need more room.",
  page: "Full docs content width for multi-column sections and demos.",
  full: "Viewport-aware width with page gutters preserved.",
} as const;

export const sectionSpacing = {
  sm: "Use for compact supporting sections.",
  md: "Use for regular document sections.",
  lg: "Use for major content transitions.",
  xl: "Use for primary page sections that need more pause between beats.",
  hero: "Use for opening sections that establish the page rhythm.",
} as const;

export type ContainerWidth = keyof typeof containerWidths;
export type SectionSpace = keyof typeof sectionSpacing;
