import { notFound } from 'next/navigation';
import { getServiceLevelFromSlug, type Locale } from '@madfam/i18n';
import dynamic from 'next/dynamic';

// Dynamically import service level components
const Level1Page = dynamic(() => import('../level-1-essentials/page'));
const Level2Page = dynamic(() => import('../level-2-advanced/page'));
const Level3Page = dynamic(() => import('../level-3-consulting/page'));
const Level4Page = dynamic(() => import('../level-4-platforms/page'));
const Level5Page = dynamic(() => import('../level-5-strategic/page'));

interface ServicePageProps {
  params: {
    locale: string;
    slug: string;
  };
}

// Map English slugs to components
const serviceComponents: Record<string, any> = {
  'level-1-essentials': Level1Page,
  'level-2-advanced': Level2Page,
  'level-3-consulting': Level3Page,
  'level-4-platforms': Level4Page,
  'level-5-strategic': Level5Page,
};

export default function ServicePage({ params }: ServicePageProps) {
  const { locale, slug } = params;
  const currentLocale = locale as Locale;
  
  // Get the English slug from the localized slug
  const englishSlug = getServiceLevelFromSlug(slug, currentLocale);
  
  if (!englishSlug || !serviceComponents[englishSlug]) {
    notFound();
  }
  
  const ServiceComponent = serviceComponents[englishSlug];
  
  return <ServiceComponent params={{ locale }} />;
}

// Generate static params for all service pages in all locales
export async function generateStaticParams() {
  const locales: Locale[] = ['en-US', 'es-MX', 'pt-BR'];
  const serviceSlugs = {
    'en-US': ['level-1-essentials', 'level-2-advanced', 'level-3-consulting', 'level-4-platforms', 'level-5-strategic'],
    'es-MX': ['nivel-1-esenciales', 'nivel-2-avanzado', 'nivel-3-consultoria', 'nivel-4-plataformas', 'nivel-5-estrategico'],
    'pt-BR': ['nivel-1-essenciais', 'nivel-2-avancado', 'nivel-3-consultoria', 'nivel-4-plataformas', 'nivel-5-estrategico']
  };
  
  const params = [];
  
  for (const locale of locales) {
    for (const slug of serviceSlugs[locale]) {
      params.push({ locale, slug });
    }
  }
  
  return params;
}