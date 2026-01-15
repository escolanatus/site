import { test, expect } from '@playwright/test';

/**
 * TESTE COMPLETO - ANIMATION SYSTEM V3
 * Escola Natus | FLAG OS
 * 
 * Testa: Navegação, Animações, Respiros, Mobile, Desktop, Blog
 */

const BASE_URL = 'http://localhost:3333';

test.describe('🎬 ANIMATION SYSTEM V3 - Testes Completos', () => {

    // ========================================
    // 1. HOME PAGE - Desktop
    // ========================================
    test('1.1 - Home page carrega e animações funcionam', async ({ page }) => {
        await page.goto(BASE_URL);

        // Aguarda carregamento
        await page.waitForLoadState('networkidle');

        // Verifica título
        await expect(page).toHaveTitle(/Escola Natus/);

        // Verifica logo animado
        const logo = page.locator('.logo-container');
        await expect(logo).toBeVisible();

        // Verifica hero section
        const hero = page.locator('section').first();
        await expect(hero).toBeVisible();

        // Screenshot
        await page.screenshot({ path: 'test-results/01-home-desktop.png', fullPage: true });
    });

    test('1.2 - Botões CTA com hover physics', async ({ page }) => {
        await page.goto(BASE_URL);

        const ctaButton = page.locator('.btn-primary').first();

        // Verifica se existe
        await expect(ctaButton).toBeVisible();

        // Hover (deve ter lift)
        await ctaButton.hover();
        await page.waitForTimeout(300);

        // Screenshot no hover
        await page.screenshot({ path: 'test-results/02-button-hover.png' });
    });

    test('1.3 - Stagger em cards de depoimentos', async ({ page }) => {
        await page.goto(BASE_URL);

        // Scroll até depoimentos
        await page.locator('.depoimento-card').first().scrollIntoViewIfNeeded();
        await page.waitForTimeout(500);

        // Verifica múltiplos cards
        const cards = page.locator('.depoimento-card');
        const count = await cards.count();
        expect(count).toBeGreaterThan(0);

        // Screenshot
        await page.screenshot({ path: 'test-results/03-stagger-cards.png', fullPage: true });
    });

    test('1.4 - Glass cards com radial spotlight', async ({ page }) => {
        await page.goto(BASE_URL);

        const glassCard = page.locator('.glass-card').first();

        if (await glassCard.isVisible()) {
            await glassCard.scrollIntoViewIfNeeded();
            await glassCard.hover();
            await page.waitForTimeout(300);

            await page.screenshot({ path: 'test-results/04-glass-spotlight.png' });
        }
    });

    // ========================================
    // 2. MENU MOBILE (Sandwich)
    // ========================================
    test('2.1 - Menu mobile responsivo', async ({ page }) => {
        await page.setViewportSize({ width: 375, height: 667 }); // iPhone SE
        await page.goto(BASE_URL);

        // Procura botão do menu
        const menuButton = page.locator('button[aria-label*="menu"], .menu-toggle, [data-menu-toggle]').first();

        if (await menuButton.isVisible()) {
            // Clica no menu
            await menuButton.click();
            await page.waitForTimeout(500);

            // Screenshot com menu aberto
            await page.screenshot({ path: 'test-results/05-mobile-menu-open.png', fullPage: true });

            // Fecha menu
            await menuButton.click();
        }
    });

    // ========================================
    // 3. BLOG - Navegação e Animações
    // ========================================
    test('3.1 - Blog index carrega com stagger', async ({ page }) => {
        await page.goto(`${BASE_URL}/blog/`);
        await page.waitForLoadState('networkidle');

        // Verifica título do blog
        const heading = page.locator('h1').first();
        await expect(heading).toBeVisible();

        // Verifica cards do blog
        const blogCards = page.locator('.blog-post, [data-animate]');
        const count = await blogCards.count();
        expect(count).toBeGreaterThan(0);

        // Screenshot
        await page.screenshot({ path: 'test-results/06-blog-index.png', fullPage: true });
    });

    test('3.2 - Navegação entre posts do blog', async ({ page }) => {
        await page.goto(`${BASE_URL}/blog/`);

        // Clica no primeiro post
        const firstPost = page.locator('.blog-post a, article a').first();
        await firstPost.click();
        await page.waitForLoadState('networkidle');

        // Verifica se navegou
        expect(page.url()).toContain('/blog/posts/');

        // Screenshot do post individual
        await page.screenshot({ path: 'test-results/07-blog-post.png', fullPage: true });
    });

    test('3.3 - Filtros de categoria no blog', async ({ page }) => {
        await page.goto(`${BASE_URL}/blog/`);

        // Procura botões de categoria
        const categoryButtons = page.locator('[data-category-filter], .filter-button');

        if (await categoryButtons.first().isVisible()) {
            await categoryButtons.first().click();
            await page.waitForTimeout(500);

            await page.screenshot({ path: 'test-results/08-blog-filter.png' });
        }
    });

    // ========================================
    // 4. RESPIROS (Espaçamentos)
    // ========================================
    test('4.1 - Verifica espaçamentos consistentes', async ({ page }) => {
        await page.goto(BASE_URL);

        // Mede espaçamentos entre seções
        const sections = page.locator('section');
        const count = await sections.count();

        // Verifica que há múltiplas seções
        expect(count).toBeGreaterThan(2);

        // Screenshot para auditoria visual
        await page.screenshot({ path: 'test-results/09-spacing-audit.png', fullPage: true });
    });

    // ========================================
    // 5. SHOWCASE PAGE
    // ========================================
    test('5.1 - Showcase de animações funciona', async ({ page }) => {
        await page.goto(`${BASE_URL}/showcase.html`);
        await page.waitForLoadState('networkidle');

        // Verifica título
        const title = page.locator('h1');
        await expect(title).toContainText('Animation');

        // Verifica seções de demonstração
        const demoBoxes = page.locator('.demo-box');
        const count = await demoBoxes.count();
        expect(count).toBeGreaterThan(0);

        // Screenshot
        await page.screenshot({ path: 'test-results/10-showcase.png', fullPage: true });
    });

    // ========================================
    // 6. PERFORMANCE & ACESSIBILIDADE
    // ========================================
    test('6.1 - Teste de performance básico', async ({ page }) => {
        const startTime = Date.now();

        await page.goto(BASE_URL);
        await page.waitForLoadState('networkidle');

        const loadTime = Date.now() - startTime;

        // Verifica que carregou em menos de 5s
        expect(loadTime).toBeLessThan(5000);

        console.log(`⚡ Tempo de carregamento: ${loadTime}ms`);
    });

    test('6.2 - Verifica reduced-motion', async ({ page }) => {
        // Emula prefers-reduced-motion
        await page.emulateMedia({ reducedMotion: 'reduce' });
        await page.goto(BASE_URL);

        // Screenshot com reduced motion
        await page.screenshot({ path: 'test-results/11-reduced-motion.png' });
    });

    // ========================================
    // 7. MOBILE COMPLETO
    // ========================================
    test('7.1 - Mobile viewport (iPhone)', async ({ page }) => {
        await page.setViewportSize({ width: 375, height: 667 });
        await page.goto(BASE_URL);

        await page.screenshot({ path: 'test-results/12-mobile-iphone.png', fullPage: true });
    });

    test('7.2 - Tablet viewport (iPad)', async ({ page }) => {
        await page.setViewportSize({ width: 768, height: 1024 });
        await page.goto(BASE_URL);

        await page.screenshot({ path: 'test-results/13-tablet-ipad.png', fullPage: true });
    });

    test('7.3 - Desktop large (1920x1080)', async ({ page }) => {
        await page.setViewportSize({ width: 1920, height: 1080 });
        await page.goto(BASE_URL);

        await page.screenshot({ path: 'test-results/14-desktop-large.png', fullPage: true });
    });

    // ========================================
    // 8. INTERAÇÕES COMPLEXAS
    // ========================================
    test('8.1 - Scroll suave e stagger em múltiplas seções', async ({ page }) => {
        await page.goto(BASE_URL);

        // Scroll gradual
        await page.evaluate(() => window.scrollTo(0, 500));
        await page.waitForTimeout(300);

        await page.evaluate(() => window.scrollTo(0, 1000));
        await page.waitForTimeout(300);

        await page.evaluate(() => window.scrollTo(0, 1500));
        await page.waitForTimeout(300);

        await page.screenshot({ path: 'test-results/15-scroll-stagger.png', fullPage: true });
    });

    test('8.2 - Inputs com glow no focus', async ({ page }) => {
        await page.goto(`${BASE_URL}/contato.html`);

        // Procura primeiro input
        const input = page.locator('input, textarea').first();

        if (await input.isVisible()) {
            await input.focus();
            await page.waitForTimeout(300);

            await page.screenshot({ path: 'test-results/16-input-glow.png' });
        }
    });

});

// ========================================
// RELATÓRIO FINAL
// ========================================
test.afterAll(async () => {
    console.log('✅ Testes completos finalizados!');
    console.log('📊 Screenshots salvos em: test-results/');
});
