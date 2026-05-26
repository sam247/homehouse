import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "tests/system",
  timeout: 60_000,
  expect: {
    timeout: 10_000,
  },
  use: {
    baseURL: "http://localhost:3100",
    trace: "retain-on-failure",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
  webServer: {
    command: 'NODE_OPTIONS="--max-old-space-size=4096" next dev -p 3100',
    url: "http://localhost:3100",
    reuseExistingServer: false,
    timeout: 120_000,
  },
});
