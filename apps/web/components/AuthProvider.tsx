'use client';

import { ReactNode } from 'react';

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  // NextAuth is disabled for the public corporate site
  // Authentication will be added when needed for specific features
  return <>{children}</>;
}
