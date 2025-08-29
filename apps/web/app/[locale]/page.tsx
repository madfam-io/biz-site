import { Metadata } from 'next';
import { unstable_setRequestLocale } from 'next-intl/server';
import { CorporateHomePage } from '@/components/CorporateHomePage';
import { seoService } from '@/lib/seo';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  // Use normalized locales directly
  return seoService.generateHomeMetadata(locale as 'es' | 'en' | 'pt');
}

export default function Page({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale);
  return <CorporateHomePage />;
}
