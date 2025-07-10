import { NextRequest, NextResponse } from 'next/server';

interface RateLimitOptions {
  windowMs?: number;
  maxRequests?: number;
  keyGenerator?: (req: NextRequest) => string;
}

// In-memory store for rate limiting (consider using Redis in production)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

// Clean up expired entries periodically
setInterval(() => {
  const now = Date.now();
  for (const [key, value] of rateLimitStore.entries()) {
    if (value.resetTime < now) {
      rateLimitStore.delete(key);
    }
  }
}, 60000); // Clean up every minute

export function rateLimit(options: RateLimitOptions = {}) {
  const {
    windowMs = parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000'), // 15 minutes default
    maxRequests = parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100'), // 100 requests default
    keyGenerator = (req: NextRequest) => {
      // Use IP address as default key
      return (
        req.headers.get('x-forwarded-for')?.split(',')[0] ||
        req.headers.get('x-real-ip') ||
        'anonymous'
      );
    },
  } = options;

  return async function rateLimitMiddleware(
    request: NextRequest,
    handler: (req: NextRequest) => Promise<NextResponse>
  ): Promise<NextResponse> {
    const key = keyGenerator(request);
    const now = Date.now();

    // Get or create rate limit entry
    let rateLimitEntry = rateLimitStore.get(key);

    if (!rateLimitEntry || rateLimitEntry.resetTime < now) {
      // Create new entry or reset expired one
      rateLimitEntry = {
        count: 0,
        resetTime: now + windowMs,
      };
    }

    // Increment request count
    rateLimitEntry.count++;
    rateLimitStore.set(key, rateLimitEntry);

    // Check if rate limit exceeded
    if (rateLimitEntry.count > maxRequests) {
      const retryAfter = Math.ceil((rateLimitEntry.resetTime - now) / 1000);

      return NextResponse.json(
        {
          error: 'Too many requests',
          message: `Rate limit exceeded. Please try again in ${retryAfter} seconds.`,
        },
        {
          status: 429,
          headers: {
            'Retry-After': retryAfter.toString(),
            'X-RateLimit-Limit': maxRequests.toString(),
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': new Date(rateLimitEntry.resetTime).toISOString(),
          },
        }
      );
    }

    // Add rate limit headers to response
    const response = await handler(request);

    response.headers.set('X-RateLimit-Limit', maxRequests.toString());
    response.headers.set('X-RateLimit-Remaining', (maxRequests - rateLimitEntry.count).toString());
    response.headers.set('X-RateLimit-Reset', new Date(rateLimitEntry.resetTime).toISOString());

    return response;
  };
}

// Helper function to apply rate limiting to API routes
export function withRateLimit(
  handler: (req: NextRequest) => Promise<NextResponse>,
  options?: RateLimitOptions
) {
  const rateLimiter = rateLimit(options);

  return async function (req: NextRequest): Promise<NextResponse> {
    return rateLimiter(req, handler);
  };
}
