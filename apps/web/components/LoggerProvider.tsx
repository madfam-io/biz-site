'use client';

import { useEffect } from 'react';
import { initializePerformanceMonitoring, logPageView, cleanupLogger } from '@/lib/logger';
import { usePathname } from 'next/navigation';

export function LoggerProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    // Initialize performance monitoring on client side
    initializePerformanceMonitoring();

    // Cleanup on unmount
    return () => {
      cleanupLogger();
    };
  }, []);

  useEffect(() => {
    // Log page views when pathname changes
    logPageView(pathname);
  }, [pathname]);

  return <>{children}</>;
}