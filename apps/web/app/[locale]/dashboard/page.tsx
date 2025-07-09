import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { unstable_setRequestLocale } from 'next-intl/server';
import { DashboardContent } from '@/components/DashboardContent';
import { authOptions } from '@/lib/auth';

export default async function DashboardPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect(`/${locale}/auth/signin`);
  }

  return (
    <DashboardContent userEmail={session.user.email || ''} userRole={session.user.role || 'User'} />
  );
}
