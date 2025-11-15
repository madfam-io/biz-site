import { SignInForm } from '@/components/SignInForm';

export default async function SignInPage({ params }: { params: Promise<{ locale: string }> }) {
  await params; // Validate params exist

  return <SignInForm />;
}
