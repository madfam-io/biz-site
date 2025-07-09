import { MetadataRoute } from 'next';
import { seoService } from '@/lib/seo';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://madfam.io';
  const sitemapData = seoService.generateSitemapData();

  return sitemapData.map((item) => ({
    url: `${baseUrl}${item.url}`,
    lastModified: item.lastModified,
    changeFrequency: item.changeFrequency,
    priority: item.priority,
  }));
}