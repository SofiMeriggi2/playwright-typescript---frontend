import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30000,
  retries: 0,
  reporter: [['html', { outputFolder: 'reports' }]],
  use: {
    baseURL: 'https://www.saucedemo.com',
    headless: process.env.CI === 'true' ? true : false,
    screenshot: 'only-on-failure',
    video: 'off',
    launchOptions: {
      slowMo: process.env.CI === 'true' ? 0 : 500,
    },
  },
});