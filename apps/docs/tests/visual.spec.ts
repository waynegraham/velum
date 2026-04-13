import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  // Inject style to disable all animations and transitions for stability
  await page.addStyleTag({
    content: `
      *, *::before, *::after {
        transition-property: none !important;
        transform: none !important;
        animation: none !important;
        transition-duration: 0s !important;
        scroll-behavior: auto !important;
      }
    `,
  });
});

test.describe("Visual Regression", () => {
  test("homepage should look consistent", async ({ page }) => {
    await page.goto("/");
    // Wait for the page to be fully loaded and fonts to be ready
    await page.waitForLoadState("networkidle");
    await expect(page).toHaveScreenshot("homepage.png", {
      fullPage: true,
    });
  });

  test("CanvasSequence demo should look consistent", async ({ page }) => {
    await page.goto("/canvas-sequence");
    // Wait for images to potentially load
    await page.waitForLoadState("networkidle");
    // Wait a bit more for Any client-side rendering or GSAP initialization to settle
    await page.waitForTimeout(1000);
    await expect(page).toHaveScreenshot("canvas-sequence.png", {
      fullPage: true,
    });
  });

  test("AnnotatedCanvas example should look consistent", async ({ page }) => {
    await page.goto("/annotated-canvas");
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(1000);
    await expect(page).toHaveScreenshot("annotated-canvas.png", {
      fullPage: true,
    });
  });
});
