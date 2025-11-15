import { i18nConfig } from '@madfam/i18n';
import { redirect } from 'next/navigation';

// Force dynamic rendering to ensure redirect works properly
export const dynamic = 'force-dynamic';

export default function RootPage() {
  // Redirect to default locale
  redirect(`/${i18nConfig.defaultLocale}`);
}
