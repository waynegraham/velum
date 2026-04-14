/** @type {import('stylelint').Config} */
export default {
  extends: ["stylelint-config-standard"],
  plugins: ["stylelint-declaration-strict-value"],
  rules: {
    "declaration-no-important": true,
    "scale-unlimited/declaration-strict-value": [
      ["/color/", "fill", "stroke", "margin", "padding", "gap", "max-width", "font-size", "line-height", "letter-spacing", "border-radius"],
      {
        ignoreValues: [
          "transparent", "inherit", "currentColor", "initial", "none", "white", "black",
          "0", "0.94", "1", "1.02", "1.08", "1.12", "1.18", "1.34", "1.4", "1.66", "1.68", "1.9",
          "auto", "100%", "100vw", "100vh", "100svh", "10ch", "11ch", "12ch", "14ch", "22ch", "24ch", "28ch", "32rem", "45ch",
          "2px", "0.1em", "0.2em", "0.3em", "0.4em", "0.5em", "0.01em", "0.16em", "0.18em",
          "0.2rem", "0.35rem", "0.55rem", "0.68rem", "0.7rem", "0.75rem", "0.78rem", "0.8rem", "0.84rem", "0.92em", "0.95em",
          "-0.02em", "-0.022em", "-0.025em", "-0.03em", "-0.035em", "-0.05em"
        ],
        message: "Arbitrary values are not allowed. Use design tokens (var(--color-*), var(--space-*), var(--container-*)) to prevent UI drift.",
      },
    ],
    "max-nesting-depth": 3,
    "selector-max-id": 0,
    "no-descending-specificity": null,
    "selector-class-pattern": null, // Allow camelCase for CSS modules
    "custom-property-pattern": null, // Allow --step--1
    "media-feature-range-notation": "prefix", // Prefer max-width over (width <= ...)
    "declaration-empty-line-before": null,
    "import-notation": "string", // Tailwind 4 prefers strings
    "declaration-property-value-keyword-no-deprecated": null, // Allow break-word for now
    "declaration-block-no-shorthand-property-overrides": null,
    "at-rule-no-unknown": [
      true,
      {
        "ignoreAtRules": ["utility", "theme", "config", "tailwind", "apply", "import"]
      }
    ],
    "selector-pseudo-class-no-unknown": [
      true,
      {
        "ignorePseudoClasses": ["global"]
      }
    ]
  },
};
