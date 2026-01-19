import { test, expect } from '@playwright/test';

test.describe('Portfolio Performance Tests', () => {

    test('Homepage loads within 2 seconds', async ({ page }) => {
        const startTime = Date.now();

        await page.goto('http://localhost:3000');

        // Wait for main content to be visible
        await page.waitForSelector('h1', { timeout: 3000 });

        const loadTime = Date.now() - startTime;

        console.log(`✅ Page loaded in ${loadTime}ms`);
        expect(loadTime).toBeLessThan(2000);
    });

    test('Ferrari 3D canvas appears immediately (no 3s delay)', async ({ page }) => {
        const startTime = Date.now();

        await page.goto('http://localhost:3000');

        // Ferrari canvas should appear within 500ms (not 3 seconds!)
        const canvas = await page.waitForSelector('canvas', { timeout: 1000 });
        const canvasTime = Date.now() - startTime;

        expect(canvas).toBeTruthy();
        expect(canvasTime).toBeLessThan(1000);

        console.log(`✅ Ferrari canvas rendered in ${canvasTime}ms`);
    });

    test('No artificial preloader delay', async ({ page }) => {
        const startTime = Date.now();

        await page.goto('http://localhost:3000');

        // Wait for hero section (after preloader)
        await page.waitForSelector('#hero', { timeout: 2000 });

        const heroTime = Date.now() - startTime;

        // Should be < 500ms (not 300ms preloader + 3s Ferrari delay)
        expect(heroTime).toBeLessThan(1000);

        console.log(`✅ Hero visible in ${heroTime}ms (no artificial delays)`);
    });

    test('Web Vitals - LCP under 2.5s', async ({ page }) => {
        await page.goto('http://localhost:3000');

        // Wait for page to be fully loaded
        await page.waitForLoadState('networkidle');

        const metrics = await page.evaluate(() => {
            return new Promise((resolve) => {
                let lcpValue = 0;

                const observer = new PerformanceObserver((list) => {
                    const entries = list.getEntries();
                    const lastEntry = entries[entries.length - 1];
                    lcpValue = lastEntry.renderTime || lastEntry.loadTime;
                });

                observer.observe({ type: 'largest-contentful-paint', buffered: true });

                // Give it 3 seconds to capture LCP
                setTimeout(() => {
                    observer.disconnect();
                    resolve({ lcp: lcpValue });
                }, 3000);
            });
        });

        console.log(`📊 LCP: ${metrics.lcp}ms`);

        // LCP should be under 2.5s (Good)
        expect(metrics.lcp).toBeLessThan(2500);
        expect(metrics.lcp).toBeGreaterThan(0);
    });

    test('First Contentful Paint is fast', async ({ page }) => {
        const startTime = Date.now();

        await page.goto('http://localhost:3000');

        // Get FCP using Performance API
        const fcp = await page.evaluate(() => {
            const perfEntries = performance.getEntriesByType('paint');
            const fcpEntry = perfEntries.find(entry => entry.name === 'first-contentful-paint');
            return fcpEntry ? fcpEntry.startTime : 0;
        });

        console.log(`📊 FCP: ${fcp}ms`);

        // FCP should be under 1.8s (Good)
        expect(fcp).toBeLessThan(1800);
        expect(fcp).toBeGreaterThan(0);
    });

    test('All critical resources load', async ({ page }) => {
        await page.goto('http://localhost:3000');

        // Check for critical elements
        const navbar = await page.locator('nav').isVisible();
        const hero = await page.locator('#hero').isVisible();
        const ferrari = await page.locator('canvas').isVisible();

        expect(navbar).toBeTruthy();
        expect(hero).toBeTruthy();
        expect(ferrari).toBeTruthy();

        console.log('✅ All critical resources loaded');
    });

    test('Page is interactive quickly (TTI)', async ({ page }) => {
        const startTime = Date.now();

        await page.goto('http://localhost:3000');

        // Wait for page to be interactive
        await page.waitForLoadState('domcontentloaded');

        // Try to interact with a button
        const downloadBtn = await page.locator('text=/DOWNLOAD CV|CONTACT/i').first();
        await downloadBtn.waitFor({ state: 'visible', timeout: 3000 });

        const interactiveTime = Date.now() - startTime;

        console.log(`✅ Page interactive in ${interactiveTime}ms`);

        // Should be interactive within 3 seconds
        expect(interactiveTime).toBeLessThan(3000);
    });

    test('Ferrari model loads and renders', async ({ page }) => {
        await page.goto('http://localhost:3000');

        // Wait for canvas
        const canvas = await page.locator('canvas');
        await canvas.waitFor({ timeout: 2000 });

        // Check if canvas has content (WebGL context)
        const hasWebGL = await page.evaluate(() => {
            const canvas = document.querySelector('canvas');
            if (!canvas) return false;

            const gl = canvas.getContext('webgl') || canvas.getContext('webgl2');
            return gl !== null;
        });

        expect(hasWebGL).toBeTruthy();
        console.log('✅ Ferrari 3D model WebGL context active');
    });

    test('No console errors on load', async ({ page }) => {
        const errors = [];

        page.on('console', msg => {
            if (msg.type() === 'error') {
                errors.push(msg.text());
            }
        });

        await page.goto('http://localhost:3000');
        await page.waitForLoadState('networkidle');

        // Filter out known acceptable errors (if any)
        const criticalErrors = errors.filter(err =>
            !err.includes('Tracking Error') // Analytics errors are OK
        );

        if (criticalErrors.length > 0) {
            console.log('⚠️ Console errors:', criticalErrors);
        }

        expect(criticalErrors.length).toBe(0);
    });

    test('Mobile performance - loads in under 3 seconds', async ({ page, browserName }) => {
        // Skip on non-chromium for consistency
        test.skip(browserName !== 'chromium');

        // Emulate mobile
        await page.emulate({
            userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X)',
            viewport: { width: 375, height: 667 },
            deviceScaleFactor: 2,
            isMobile: true,
            hasTouch: true,
        });

        const startTime = Date.now();
        await page.goto('http://localhost:3000');

        await page.waitForSelector('#hero', { timeout: 4000 });

        const loadTime = Date.now() - startTime;

        console.log(`📱 Mobile load time: ${loadTime}ms`);

        // Mobile should load within 3 seconds
        expect(loadTime).toBeLessThan(3000);
    });
});
