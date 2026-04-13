/** @type {import('stylelint').Config} */
export default {
  extends: ["stylelint-config-standard"],
  plugins: ["stylelint-declaration-strict-value"],
  rules: {
    "declaration-no-important": true,
    "scale-unlimited/declaration-strict-value": [
      ["/color/", "fill", "stroke", "margin", "padding", "gap", "max-width"],
      {
        ignoreValues: [
          "transparent", "inherit", "currentColor", "initial", "none", "white", "black",
          "0", "auto", "100%", "100vw"
        ],
        message: "Arbitrary values are not allowed. Use design tokens (var(--color-*), var(--space-*), var(--container-*)) to prevent UI drift.",
      },
    ],
    "max-nesting-depth": 3,
    "selector-max-id": 0,
    "no-descending-specificity": null, // Often conflicts with utility-first approaches
  },
};
