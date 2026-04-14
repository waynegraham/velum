import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    rules: {
      "no-restricted-syntax": [
        "error",
        {
          selector: "JSXAttribute[name.name='className'] Literal[value=/\\[[^\\]]+\\]/]",
          message:
            "Arbitrary Tailwind values are not allowed in className. Use shared tokens or a CSS class to prevent UI drift.",
        },
        {
          selector:
            "JSXAttribute[name.name='className'] JSXExpressionContainer TemplateLiteral TemplateElement[value.raw=/\\[[^\\]]+\\]/]",
          message:
            "Arbitrary Tailwind values are not allowed in className. Use shared tokens or a CSS class to prevent UI drift.",
        },
        {
          selector: "JSXOpeningElement[name.name=/^(AnnotatedCanvas|CanvasSequence|ManifestImage|CanvasImage)$/] JSXAttribute[name.name='className'] Literal[value=/shadow-/]",
          message: "Shadows are not allowed on media components to maintain editorial flat design. Use borders or spacers instead.",
        },
        {
          selector: "JSXOpeningElement[name.name=/^(AnnotatedCanvas|CanvasSequence|ManifestImage|CanvasImage)$/] JSXAttribute[name.name='className'] JSXExpressionContainer TemplateLiteral TemplateElement[value.raw=/shadow-/]",
          message: "Shadows are not allowed on media components to maintain editorial flat design. Use borders or spacers instead.",
        },
        {
          selector: "JSXOpeningElement[name.name='p']:not(:has(JSXAttribute[name.name='className'] [value=/reading-column/]))",
          message: "Paragraphs should generally use the 'reading-column' class or be wrapped in a ReadingColumn component to prevent horizontal drift.",
        },
      ],
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "**/stylelint.config.js",
  ]),
]);

export default eslintConfig;
