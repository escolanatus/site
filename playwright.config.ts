import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
    testDir: './tests',
    fullyParallel: false, // Sequencial para melhor debugging
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    workers: 1, // Um worker para garantir ordem
    reporter: [
        ['html', { outputFolder: 'test-results/html-report' }],
        ['list']
    ],

    use: {
        baseURL: 'http://localhost:3333',
        trace: 'on-first-retry',
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
    },

    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] },
        },
        {
            name: 'Mobile Chrome',
            use: { ...devices['Pixel 5'] },
        },
        {
            name: 'Mobile Safari',
            use: { ...devices['iPhone 12'] },
        },
    ],

    // Servidor local
    webServer: {
        command: 'npm run dev -- --port 3333',
        url: 'http://localhost:3333',
        reuseExistingServer: !process.env.CI,
        timeout: 120000,
    },
});
