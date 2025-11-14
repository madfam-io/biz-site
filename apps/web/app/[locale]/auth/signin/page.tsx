import { SignInForm } from '@/components/SignInForm';

export default function SignInPage({
  params: { locale }
}: {
  params: { locale: string };
}) {

  return <SignInForm />;
}