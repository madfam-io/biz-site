import { describe, it, expect, beforeEach } from 'vitest';
import { SEOService } from '../seo';

describe('SEO Service', () => {
  let seoService: SEOService;

  beforeEach(() => {
    seoService = new SEOService();
  });

  describe('generateMetadata', () => {
    it('should generate basic metadata correctly', () => {
      const metadata = seoService.generateMetadata({
        title: 'Test Page',
        description: 'Test description',
      });

      expect(metadata.title).toBe('Test Page | MADFAM');
      expect(metadata.description).toBe('Test description');
      expect(metadata.openGraph?.title).toBe('Test Page | MADFAM');
      expect(metadata.openGraph?.description).toBe('Test description');
    });

    it('should not duplicate MADFAM in title if already present', () => {
      const metadata = seoService.generateMetadata({
        title: 'Services | MADFAM',
        description: 'Our services',
      });

      expect(metadata.title).toBe('Services | MADFAM');
    });

    it('should handle keywords properly', () => {
      const metadata = seoService.generateMetadata({
        title: 'Test',
        description: 'Test',
        keywords: ['AI', 'automation', 'consulting'],
      });

      expect(metadata.keywords).toBe('AI, automation, consulting');
    });

    it('should set robots meta correctly', () => {
      const indexable = seoService.generateMetadata({
        title: 'Test',
        description: 'Test',
      });

      const noIndex = seoService.generateMetadata({
        title: 'Test',
        description: 'Test',
        noIndex: true,
        noFollow: true,
      });

      expect(indexable.robots?.index).toBe(true);
      expect(indexable.robots?.follow).toBe(true);
      expect(noIndex.robots?.index).toBe(false);
      expect(noIndex.robots?.follow).toBe(false);
    });
  });

  describe('generateServiceMetadata', () => {
    it('should generate Spanish service metadata', () => {
      const metadata = seoService.generateServiceMetadata(
        'Consultoría Digital',
        'Transformación digital completa',
        'Strategy & Enablement',
        'es-MX'
      );

      expect(metadata.title).toBe('Consultoría Digital | Servicios Strategy & Enablement | MADFAM');
      expect(metadata.description).toBe('Transformación digital completa');
      expect(metadata.openGraph?.type).toBe('service');
      expect(metadata.openGraph?.locale).toBe('es-MX');
    });

    it('should generate English service metadata', () => {
      const metadata = seoService.generateServiceMetadata(
        'Digital Consulting',
        'Complete digital transformation',
        'Strategy & Enablement',
        'en-US'
      );

      expect(metadata.title).toBe('Digital Consulting | Strategy & Enablement Services | MADFAM');
      expect(metadata.description).toBe('Complete digital transformation');
      expect(metadata.openGraph?.locale).toBe('en-US');
    });
  });

  describe('generateStructuredData', () => {
    it('should generate Organization structured data', () => {
      const data = seoService.generateStructuredData('Organization', {});

      expect(data['@context']).toBe('https://schema.org');
      expect(data['@type']).toBe('Organization');
      expect(data).toHaveProperty('name', 'MADFAM');
      expect(data).toHaveProperty('contactPoint');
      expect(data).toHaveProperty('address');
    });

    it('should generate Service structured data', () => {
      const data = seoService.generateStructuredData('Service', {
        name: 'AI Consulting',
        description: 'AI transformation services',
        serviceType: 'Consulting',
      });

      expect(data['@type']).toBe('Service');
      expect(data).toHaveProperty('name', 'AI Consulting');
      expect(data).toHaveProperty('provider');
      expect(data).toHaveProperty('serviceType', 'Consulting');
    });

    it('should generate Article structured data', () => {
      const data = seoService.generateStructuredData('Article', {
        title: 'AI in 2024',
        description: 'Trends and predictions',
        author: 'MADFAM Team',
        publishedTime: '2024-01-01',
        slug: 'ai-in-2024',
      });

      expect(data['@type']).toBe('Article');
      expect(data).toHaveProperty('headline', 'AI in 2024');
      expect(data).toHaveProperty('author');
      expect(data).toHaveProperty('publisher');
      expect(data).toHaveProperty('datePublished', '2024-01-01');
    });
  });

  describe('generateSitemapData', () => {
    it('should generate sitemap entries for all main pages', () => {
      const sitemap = seoService.generateSitemapData();

      expect(sitemap).toHaveLength(13);
      expect(sitemap[0].url).toBe('/');
      expect(sitemap[0].priority).toBe(1.0);

      const servicePages = sitemap.filter(entry => entry.url.includes('/services/'));
      expect(servicePages).toHaveLength(5);

      const hasAllServiceLevels = [1, 2, 3, 4, 5].every(level =>
        servicePages.some(page => page.url.includes(`level-${level}`))
      );
      expect(hasAllServiceLevels).toBe(true);
    });

    it('should set appropriate change frequencies', () => {
      const sitemap = seoService.generateSitemapData();

      const homepage = sitemap.find(entry => entry.url === '/');
      expect(homepage?.changeFrequency).toBe('weekly');

      const servicePage = sitemap.find(entry => entry.url.includes('/services/level-'));
      expect(servicePage?.changeFrequency).toBe('monthly');
    });
  });
});
