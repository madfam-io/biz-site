import { Container } from '@madfam/ui';
import { ServiceCardSkeleton, Skeleton, SkeletonContainer } from '@/components/Skeleton';

export default function ServicesLoading() {
  return (
    <main className="py-section">
      <Container>
        {/* Hero Section Skeleton */}
        <div className="text-center mb-16">
          <SkeletonContainer>
            <Skeleton width="60%" height={48} className="mx-auto mb-4" />
            <Skeleton width="80%" height={24} className="mx-auto" />
          </SkeletonContainer>
        </div>

        {/* Service Cards Grid Skeleton */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, i) => (
            <ServiceCardSkeleton key={i} />
          ))}
        </div>

        {/* CTA Section Skeleton */}
        <div className="mt-16 text-center">
          <SkeletonContainer>
            <Skeleton width="50%" height={32} className="mx-auto mb-4" />
            <Skeleton width="70%" height={20} className="mx-auto mb-8" />
            <Skeleton variant="rounded" width={200} height={48} className="mx-auto" />
          </SkeletonContainer>
        </div>
      </Container>
    </main>
  );
}