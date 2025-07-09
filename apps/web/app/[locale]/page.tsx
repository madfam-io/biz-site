import { Metadata } from 'next';
import { seoService } from '@/lib/seo';
import { HomePage } from '@/components/HomePage';

export async function generateMetadata({
  params: { locale }
}: {
  params: { locale: string }
}): Promise<Metadata> {
  return seoService.generateHomeMetadata(locale as 'es-MX' | 'en-US');
}

export default function Page() {
  return <HomePage />;
}