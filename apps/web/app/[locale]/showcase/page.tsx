import { ShowcaseContent } from '@/components/ShowcaseContent';

export default async function ShowcasePage({ params }: { params: Promise<{ locale: string }> }) {
  await params; // Validate params exist

  return <ShowcaseContent />;
}
