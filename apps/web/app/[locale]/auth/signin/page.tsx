import { SignInForm } from '@/components/SignInForm';

export default function SignInPage({
  params: { locale: _locale }
}: {
  params: { locale: string };
}) {

  return <SignInForm />;
}