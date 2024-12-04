import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests", // Directory containing your Playwright tests
  webServer: {
    command: "npm run storybook", // Command to start Storybook
    port: 6006, // Default Storybook port
    reuseExistingServer: !process.env.CI, // Reuse Storybook server in non-CI environments
  },
  use: {
    baseURL: "http://localhost:6006", // Storybook's base URL
    headless: true,
  },
});

// playwright/index.tsx
import { setProjectAnnotations } from "@storybook/react"; // or '@storybook/vue3', '@storybook/angular', etc.
import previewAnnotations from "../.storybook/preview";

// Apply Storybook preview configurations to the Playwright testing environment
setProjectAnnotations(previewAnnotations);
