import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display the main heading', async ({ page }) => {
    await expect(page.locator('h1')).toContainText('MADFAM');
  });

  test('should have navigation links', async ({ page }) => {
    const navbar = page.locator('nav');

    await expect(navbar.getByText('Servicios')).toBeVisible();
    await expect(navbar.getByText('Productos')).toBeVisible();
    await expect(navbar.getByText('Nosotros')).toBeVisible();
    await expect(navbar.getByText('Contacto')).toBeVisible();
  });

  test('should navigate to services page', async ({ page }) => {
    await page.click('text=Servicios');
    await expect(page).toHaveURL(/.*services/);
    await expect(page.locator('h1')).toContainText('Servicios');
  });

  test('should display programs', async ({ page }) => {
    const programs = [
      'Design & Fabrication',
      'Strategy & Enablement',
      'Platform Pilots',
      'Strategic Partnerships',
    ];

    for (const program of programs) {
      await expect(page.locator(`text=/${program}/i`)).toBeVisible();
    }
  });

  test('should have a working CTA button', async ({ page }) => {
    const ctaButton = page.getByRole('button', { name: /comenzar|contactar/i }).first();
    await expect(ctaButton).toBeVisible();
    await ctaButton.click();

    // Should navigate to contact or show a form
    await expect(page).toHaveURL(/contact|#contact/);
  });

  test('should be responsive', async ({ page }) => {
    // Test mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });

    // Mobile menu should be visible
    const mobileMenuButton = page
      .locator('[data-testid="mobile-menu-button"], button[aria-label*="menu"]')
      .first();
    await expect(mobileMenuButton).toBeVisible();

    // Desktop navigation should be hidden
    const desktopNav = page.locator('nav:not([data-mobile])').first();
    await expect(desktopNav).toBeHidden();
  });

  test('should have proper meta tags for SEO', async ({ page }) => {
    const title = await page.title();
    expect(title).toContain('MADFAM');

    const description = await page.getAttribute('meta[name="description"]', 'content');
    expect(description).toBeTruthy();
    expect(description).toContain('transformación digital');

    const ogTitle = await page.getAttribute('meta[property="og:title"]', 'content');
    expect(ogTitle).toBeTruthy();
  });

  test('should load performance metrics', async ({ page }) => {
    const metrics = await page.evaluate(() => {
      const navigation = performance.getEntriesByType(
        'navigation'
      )[0] as PerformanceNavigationTiming;
      return {
        domContentLoaded:
          navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
        loadComplete: navigation.loadEventEnd - navigation.loadEventStart,
      };
    });

    // Page should load quickly
    expect(metrics.domContentLoaded).toBeLessThan(3000);
    expect(metrics.loadComplete).toBeLessThan(5000);
  });
});
