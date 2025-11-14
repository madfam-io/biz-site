import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { generateCsrfToken } from '@/lib/security';
import { apiLogger } from '@/lib/logger';

/**
 * GET /api/csrf-token
 * Returns a CSRF token for the current session
 */
export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    // Return existing CSRF token from session, or generate a new one for anonymous users
    const csrfToken = session?.csrfToken || generateCsrfToken();

    return NextResponse.json({
      csrfToken,
    });
  } catch (error) {
    apiLogger.error('Error generating CSRF token', error as Error);
    return NextResponse.json(
      {
        error: 'Failed to generate CSRF token',
      },
      { status: 500 }
    );
  }
}
