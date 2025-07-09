import { test, expect } from '@playwright/test';

test.describe('Lead Capture Flow', () => {
  test('should successfully submit a lead form', async ({ page }) => {
    await page.goto('/contact');
    
    // Fill in the lead form
    await page.fill('input[name="name"]', 'Test User');
    await page.fill('input[name="email"]', 'test@example.com');
    await page.fill('input[name="company"]', 'Test Company');
    await page.fill('input[name="phone"]', '+525512345678');
    await page.fill('textarea[name="message"]', 'This is a test message for E2E testing');
    
    // Submit the form
    await page.click('button[type="submit"]');
    
    // Wait for success message
    await expect(page.locator('text=/gracias|thank you/i')).toBeVisible({ timeout: 10000 });
  });

  test('should show validation errors for invalid input', async ({ page }) => {
    await page.goto('/contact');
    
    // Try to submit empty form
    await page.click('button[type="submit"]');
    
    // Should show validation errors
    await expect(page.locator('text=/requerido|required/i')).toBeVisible();
    
    // Fill invalid email
    await page.fill('input[name="email"]', 'invalid-email');
    await page.click('button[type="submit"]');
    
    // Should show email validation error
    await expect(page.locator('text=/email inválido|invalid email/i')).toBeVisible();
  });

  test('should track form interactions', async ({ page }) => {
    // Set up request interception to check analytics calls
    const analyticsRequests: string[] = [];
    
    page.on('request', request => {
      if (request.url().includes('plausible.io') || request.url().includes('/api/analytics')) {
        analyticsRequests.push(request.url());
      }
    });
    
    await page.goto('/contact');
    
    // Interact with form
    await page.fill('input[name="name"]', 'Analytics Test');
    await page.fill('input[name="email"]', 'analytics@test.com');
    
    // Submit form
    await page.click('button[type="submit"]');
    
    // Wait a bit for analytics to fire
    await page.waitForTimeout(1000);
    
    // Should have tracked form interaction
    expect(analyticsRequests.length).toBeGreaterThan(0);
  });
});