import { unstable_setRequestLocale } from 'next-intl/server';
import { ShowcaseContent } from '@/components/ShowcaseContent';

export default function ShowcasePage({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale);
  
  return <ShowcaseContent />;
}