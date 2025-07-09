'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { initializePerformanceMonitoring, logPageView, cleanupLogger } from '@/lib/logger';

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
