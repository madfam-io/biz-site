import { i18nConfig } from '@madfam/i18n';
import { redirect } from 'next/navigation';

export default function RootPage() {
  redirect(`/${i18nConfig.defaultLocale}`);
}
