import { unstable_setRequestLocale } from 'next-intl/server';
import { SignInForm } from '@/components/SignInForm';

export default function SignInPage({
  params: { locale }
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);

  return <SignInForm />;
}