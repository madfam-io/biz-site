"use client";

import { useState, useEffect } from 'react';
import { ServiceCardSkeleton } from './Skeleton';
import { ServiceCard } from './ServiceCard';
import { serviceTiers } from '@madfam/core';

// Example component showing how to use loading skeletons with data fetching
export function LoadingExample() {
  const [loading, setLoading] = useState(true);
  const [services, setServices] = useState<typeof serviceTiers | null>(null);

  useEffect(() => {
    // Simulate API call
    const fetchServices = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate network delay
      setServices(serviceTiers);
      setLoading(false);
    };

    fetchServices();
  }, []);

  if (loading) {
    return (
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...Array(3)].map((_, i) => (
          <ServiceCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {services && Object.values(services).slice(0, 3).map((service) => (
        <ServiceCard
          key={service.id}
          service={service}
        />
      ))}
    </div>
  );
}

// Hook for using loading states
export function useLoadingState<T>(
  fetchFn: () => Promise<T>,
  deps: React.DependencyList = []
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let cancelled = false;

    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await fetchFn();
        if (!cancelled) {
          setData(result);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err : new Error('Unknown error'));
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadData();

    return () => {
      cancelled = true;
    };
  }, deps);

  return { data, loading, error };
}