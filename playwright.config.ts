import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "tests/system",
  timeout: 60_000,
  expect: {
    timeout: 10_000,
  },
  use: {
    baseURL: "http://localhost:3000",
    trace: "retain-on-failure",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
  webServer: {
    command:
      'NODE_OPTIONS="--max-old-space-size=4096" tinacms dev --noTelemetry -c "next dev -p 3000"',
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
