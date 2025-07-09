import { Metadata } from 'next';
import { unstable_setRequestLocale } from 'next-intl/server';
import { HomePage } from '@/components/HomePage';
import { seoService } from '@/lib/seo';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  return seoService.generateHomeMetadata(locale as 'es-MX' | 'en-US' | 'pt-BR');
}

export default function Page({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale);
  return <HomePage />;
}
