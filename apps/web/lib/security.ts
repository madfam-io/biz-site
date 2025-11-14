import * as crypto from 'crypto';
import { apiLogger } from './logger';

/**
 * Timing-safe comparison for strings
 * Prevents timing attacks when comparing secrets
 */
export function timingSafeEqual(a: string, b: string): boolean {
  try {
    // Ensure both strings have the same length to prevent timing leaks
    const bufferA = Buffer.from(a, 'utf8');
    const bufferB = Buffer.from(b, 'utf8');

    // If lengths don't match, still do a comparison to prevent timing leaks
    if (bufferA.length !== bufferB.length) {
      // Create a dummy buffer of the same length as bufferA
      const dummyBuffer = Buffer.alloc(bufferA.length);
      crypto.timingSafeEqual(bufferA, dummyBuffer);
      return false;
    }

    return crypto.timingSafeEqual(bufferA, bufferB);
  } catch (error) {
    apiLogger.error('Error in timing-safe comparison', error as Error);
    return false;
  }
}

/**
 * Validate API bearer token with timing-safe comparison
 */
export function validateBearerToken(authHeader: string | null, expectedSecret: string): boolean {
  if (!authHeader) {
    return false;
  }

  const match = authHeader.match(/^Bearer\s+(.+)$/i);
  if (!match) {
    return false;
  }

  const token = match[1];
  return timingSafeEqual(token, expectedSecret);
}

/**
 * Generate HMAC signature for webhook verification
 */
export function generateHmacSignature(payload: string, secret: string, algorithm = 'sha256'): string {
  return crypto.createHmac(algorithm, secret).update(payload).digest('hex');
}

/**
 * Verify HMAC signature with timing-safe comparison
 */
export function verifyHmacSignature(
  payload: string,
  signature: string,
  secret: string,
  algorithm = 'sha256'
): boolean {
  const expectedSignature = generateHmacSignature(payload, secret, algorithm);
  return timingSafeEqual(signature, expectedSignature);
}

/**
 * Validate webhook request with HMAC signature
 * Supports multiple signature formats (e.g., GitHub, Stripe)
 */
export function validateWebhookSignature(
  payload: string,
  signatureHeader: string | null,
  secret: string,
  options: {
    algorithm?: string;
    prefix?: string; // e.g., 'sha256=' for GitHub
  } = {}
): boolean {
  if (!signatureHeader) {
    return false;
  }

  const { algorithm = 'sha256', prefix = '' } = options;

  // Remove prefix if present
  const signature = prefix ? signatureHeader.replace(prefix, '') : signatureHeader;

  return verifyHmacSignature(payload, signature, secret, algorithm);
}

/**
 * Generate a secure random token
 */
export function generateSecureToken(length: number = 32): string {
  return crypto.randomBytes(length).toString('hex');
}

/**
 * Hash a value with SHA-256
 */
export function sha256Hash(value: string): string {
  return crypto.createHash('sha256').update(value).digest('hex');
}

/**
 * Validate API key format (basic validation)
 */
export function isValidApiKeyFormat(apiKey: string): boolean {
  // API keys should be at least 32 characters and contain only alphanumeric and basic special chars
  return /^[a-zA-Z0-9_\-]{32,}$/.test(apiKey);
}
