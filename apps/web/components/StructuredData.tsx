import { seoService } from '@/lib/seo';

interface StructuredDataProps {
  type: string;
  data: any;
}

export function StructuredData({ type, data }: StructuredDataProps) {
  const structuredData = seoService.generateStructuredData(type, data);

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData),
      }}
    />
  );
}

// Pre-built structured data components
export function OrganizationStructuredData() {
  return <StructuredData type="Organization" data={{}} />;
}

export function ServiceStructuredData({ name, description, serviceType }: {
  name: string;
  description: string;
  serviceType: string;
}) {
  return (
    <StructuredData 
      type="Service" 
      data={{ name, description, serviceType }} 
    />
  );
}

export function ProductStructuredData({ name, description, category, slug }: {
  name: string;
  description: string;
  category: string;
  slug: string;
}) {
  return (
    <StructuredData 
      type="Product" 
      data={{ name, description, category, slug }} 
    />
  );
}

export function ArticleStructuredData({ 
  title, 
  description, 
  author, 
  publishedTime, 
  modifiedTime, 
  image, 
  slug 
}: {
  title: string;
  description: string;
  author: string;
  publishedTime: string;
  modifiedTime?: string;
  image?: string;
  slug: string;
}) {
  return (
    <StructuredData 
      type="Article" 
      data={{ 
        title, 
        description, 
        author, 
        publishedTime, 
        modifiedTime, 
        image, 
        slug 
      }} 
    />
  );
}