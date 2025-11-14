import { PrismaAdapter } from '@auth/prisma-adapter';
import bcrypt from 'bcryptjs';
import type { NextAuthOptions } from 'next-auth';
import type { Adapter } from 'next-auth/adapters';
import CredentialsProvider from 'next-auth/providers/credentials';
import { UserRole } from '@/lib/prisma-types';
import { generateCsrfToken } from './security';
import { prisma } from './prisma';

/**
 * NextAuth configuration
 * Using PrismaAdapter for database persistence with proper typing
 */
export const authOptions: NextAuthOptions = {
  // PrismaAdapter returns a compatible adapter, but TypeScript needs help understanding this
  // The adapter conforms to the NextAuth Adapter interface
  adapter: PrismaAdapter(prisma) as Adapter,
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  cookies: {
    sessionToken: {
      name: `${process.env.NODE_ENV === 'production' ? '__Secure-' : ''}next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production',
      },
    },
  },
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
    error: '/auth/error',
  },
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!user || !user.passwordHash) {
          return null;
        }

        const isPasswordValid = await bcrypt.compare(credentials.password, user.passwordHash);

        if (!isPasswordValid) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: UserRole[user.role as keyof typeof UserRole],
          image: user.image,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger }) {
      if (user) {
        token.id = user.id;
        token.role = (user as { role?: UserRole }).role || UserRole.VIEWER;
      }

      // Generate CSRF token on sign in or if not present
      if (!token.csrfToken || trigger === 'signIn') {
        token.csrfToken = generateCsrfToken();
      }

      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as UserRole;
      }

      // Add CSRF token to session
      session.csrfToken = token.csrfToken as string;

      return session;
    },
  },
};

// Type augmentation for NextAuth
declare module 'next-auth' {
  interface User {
    role: UserRole;
  }

  interface Session {
    user: {
      id: string;
      role: UserRole;
      email?: string | null;
      name?: string | null;
      image?: string | null;
    };
    csrfToken: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    role: UserRole;
    csrfToken: string;
  }
}
