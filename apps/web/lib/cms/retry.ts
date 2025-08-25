/**
 * HTTP Retry Logic for CMS Requests
 */

import type { RetryConfig } from './types';

export const DEFAULT_RETRY_CONFIG: RetryConfig = {
  maxRetries: 3,
  baseDelay: 1000, // 1 second
  maxDelay: 10000, // 10 seconds
};

export class RetryHandler {
  private config: RetryConfig;

  constructor(config: RetryConfig = DEFAULT_RETRY_CONFIG) {
    this.config = config;
  }

  private async sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  private calculateRetryDelay(attempt: number): number {
    const delay = this.config.baseDelay * Math.pow(2, attempt);
    return Math.min(delay, this.config.maxDelay);
  }

  async execute<T>(operation: () => Promise<T>, operationName: string = 'operation'): Promise<T> {
    let lastError: Error | undefined;

    for (let attempt = 0; attempt <= this.config.maxRetries; attempt++) {
      try {
        return await operation();
      } catch (error) {
        lastError = error as Error;

        // Don't retry client errors (4xx), only server errors (5xx) and network issues
        if (error instanceof Response && error.status >= 400 && error.status < 500) {
          throw new Error(`Client error: ${error.status} ${error.statusText}`);
        }

        if (attempt < this.config.maxRetries) {
          const delay = this.calculateRetryDelay(attempt);
          console.warn(
            `${operationName} failed (attempt ${attempt + 1}), retrying in ${delay}ms:`,
            error
          );
          await this.sleep(delay);
        }
      }
    }

    console.error(`${operationName} failed after all retries:`, lastError);
    throw lastError || new Error(`Unknown error occurred during ${operationName}`);
  }
}

export async function fetchWithTimeout(
  url: string,
  options: RequestInit = {},
  timeout: number = 30000
): Promise<Response> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  }
}
