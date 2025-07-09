'use client';

import { SessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  // In staging environment, don't use SessionProvider
  if (process.env.NEXT_PUBLIC_ENV === 'staging') {
    return <>{children}</>;
  }
  
  return <SessionProvider>{children}</SessionProvider>;
}