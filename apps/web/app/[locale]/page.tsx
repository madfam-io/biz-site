import { Metadata } from 'next';
import { CorporateHomePage } from '@/components/CorporateHomePage';
import { seoService } from '@/lib/seo';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  // Await params for Next.js 15+ compatibility
  const { locale } = await params;
  // Use normalized locales directly
  return seoService.generateHomeMetadata(locale as 'es' | 'en' | 'pt');
}

export default function Page() {
  return <CorporateHomePage />;
}
