import { Metadata } from 'next';
import { seoService } from '@/lib/seo';
import { HomePage } from '@/components/HomePage';
import { unstable_setRequestLocale } from 'next-intl/server';

export async function generateMetadata({
  params: { locale }
}: {
  params: { locale: string }
}): Promise<Metadata> {
  return seoService.generateHomeMetadata(locale as 'es-MX' | 'en-US');
}

export default function Page({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale);
  return <HomePage />;
}