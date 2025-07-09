import { test, expect } from '@playwright/test';

test.describe('Services Pages', () => {
  const serviceLevels = [
    { level: '1', name: 'essentials', title: 'Essentials' },
    { level: '2', name: 'advanced', title: 'Advanced' },
    { level: '3', name: 'consulting', title: 'Consulting' },
    { level: '4', name: 'platforms', title: 'Platforms' },
    { level: '5', name: 'strategic', title: 'Strategic' },
  ];

  serviceLevels.forEach(({ level, name, title }) => {
    test(`should display L${level} ${title} service page correctly`, async ({ page }) => {
      await page.goto(`/services/level-${level}-${name}`);
      
      // Check page title
      await expect(page.locator('h1')).toContainText(new RegExp(title, 'i'));
      
      // Check for service tier indicator
      await expect(page.locator(`text=/Nivel ${level}|Level ${level}/i`)).toBeVisible();
      
      // Check for CTA button
      const ctaButton = page.getByRole('button', { name: /contactar|contact|solicitar|request/i }).first();
      await expect(ctaButton).toBeVisible();
      
      // Check for benefits section
      await expect(page.locator('text=/beneficios|benefits/i')).toBeVisible();
    });
  });

  test('should navigate between service levels', async ({ page }) => {
    await page.goto('/services');
    
    // Click on L3 consulting
    await page.click('text=/Nivel 3|Level 3|Consulting/i');
    await expect(page).toHaveURL(/level-3-consulting/);
    
    // Navigate to L4 platforms
    await page.goto('/services');
    await page.click('text=/Nivel 4|Level 4|Platforms/i');
    await expect(page).toHaveURL(/level-4-platforms/);
  });

  test('should have working ROI calculator on L3 page', async ({ page }) => {
    await page.goto('/services/level-3-consulting');
    
    // Look for ROI calculator
    const calculatorSection = page.locator('text=/calculadora|calculator|ROI/i');
    await expect(calculatorSection).toBeVisible();
    
    // If there's a button to open calculator
    const calculatorButton = page.getByRole('button', { name: /calcular|calculate/i });
    if (await calculatorButton.isVisible()) {
      await calculatorButton.click();
      
      // Calculator should be visible
      await expect(page.locator('[data-testid="roi-calculator"], form[name="roi-calculator"]')).toBeVisible();
    }
  });

  test('should have proper structured data for services', async ({ page }) => {
    await page.goto('/services/level-3-consulting');
    
    // Check for structured data
    const structuredData = await page.locator('script[type="application/ld+json"]').textContent();
    expect(structuredData).toBeTruthy();
    
    if (structuredData) {
      const data = JSON.parse(structuredData);
      expect(data['@type']).toBe('Service');
      expect(data.name).toContain('Consultoría');
    }
  });
});