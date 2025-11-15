import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { DashboardContent } from '@/components/DashboardContent';
import { authOptions } from '@/lib/auth';

export default async function DashboardPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect(`/${locale}/auth/signin`);
  }

  return (
    <DashboardContent userEmail={session.user.email || ''} userRole={session.user.role || 'User'} />
  );
}
