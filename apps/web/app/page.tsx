import { redirect } from 'next/navigation';
import { i18nConfig } from '@madfam/i18n';

export default function RootPage() {
  redirect(`/${i18nConfig.defaultLocale}`);
}