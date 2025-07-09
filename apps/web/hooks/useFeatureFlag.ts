import { FeatureFlagProvider, logger } from '@madfam/core';
import { useEffect, useState } from 'react';

// Cache for feature flags to avoid multiple provider instances
let flagProvider: FeatureFlagProvider | null = null;
const flagCache: Map<string, { value: boolean; timestamp: number }> = new Map();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

function getFlagProvider(): FeatureFlagProvider {
  if (!flagProvider) {
    flagProvider = new FeatureFlagProvider();
  }
  return flagProvider;
}

export interface UseFeatureFlagOptions {
  useApi?: boolean;
  fallbackValue?: boolean;
}

export function useFeatureFlag(flagKey: string, options: UseFeatureFlagOptions = {}): boolean {
  const { useApi = false, fallbackValue = false } = options;
  const [isEnabled, setIsEnabled] = useState(fallbackValue);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkFlag = async () => {
      try {
        // Check cache first
        const cached = flagCache.get(flagKey);
        if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
          setIsEnabled(cached.value);
          setIsLoading(false);
          return;
        }

        let enabled: boolean;

        if (useApi && typeof window !== 'undefined') {
          // Use API endpoint in client-side
          const response = await fetch(`/api/feature-flags?flag=${flagKey}`);
          if (response.ok) {
            const data = await response.json();
            enabled = data.enabled;
          } else {
            // Fallback to provider on API error
            const provider = getFlagProvider();
            enabled = provider.isEnabled(flagKey);
          }
        } else {
          // Use provider directly
          const provider = getFlagProvider();
          enabled = provider.isEnabled(flagKey);
        }

        // Update cache
        flagCache.set(flagKey, { value: enabled, timestamp: Date.now() });
        setIsEnabled(enabled);
      } catch (error) {
        logger.error(`Error checking feature flag ${flagKey}`, error as Error, 'FEATURE_FLAG', {
          flagKey,
          fallbackValue,
          useApi,
        });
        setIsEnabled(fallbackValue);
      } finally {
        setIsLoading(false);
      }
    };

    checkFlag();
  }, [flagKey, useApi, fallbackValue]);

  // Log feature flag status
  if (!isLoading) {
    logger.featureFlag(flagKey, isEnabled, { fallbackValue, useApi });
  }

  return isEnabled;
}

// Hook to get all feature flags at once
export function useFeatureFlags(): Record<string, boolean> {
  const [flags, setFlags] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const loadFlags = async () => {
      try {
        const provider = getFlagProvider();
        // Get all flags from the provider
        const allFlags: Record<string, boolean> = {
          NEW_LEAD_SCORING: provider.isEnabled('NEW_LEAD_SCORING'),
          INTERACTIVE_CALCULATOR: provider.isEnabled('INTERACTIVE_CALCULATOR'),
          CHAT_SUPPORT: provider.isEnabled('CHAT_SUPPORT'),
          PORTUGUESE_LOCALE: provider.isEnabled('PORTUGUESE_LOCALE'),
          ADVANCED_ANALYTICS: provider.isEnabled('ADVANCED_ANALYTICS'),
          N8N_WORKFLOWS: provider.isEnabled('N8N_WORKFLOWS'),
        };
        setFlags(allFlags);
      } catch (error) {
        logger.error('Error loading feature flags', error as Error, 'FEATURE_FLAG');
      }
    };

    loadFlags();
  }, []);

  return flags;
}

// Hook to check multiple flags at once
export function useFeatureFlagsMultiple(flagKeys: string[]): Record<string, boolean> {
  const [flags, setFlags] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const checkFlags = async () => {
      try {
        const provider = getFlagProvider();
        const results: Record<string, boolean> = {};

        for (const key of flagKeys) {
          results[key] = provider.isEnabled(key);
        }

        setFlags(results);
      } catch (error) {
        logger.error('Error checking multiple feature flags', error as Error, 'FEATURE_FLAG', {
          flagKeys,
        });
        // Set all flags to false on error
        const results: Record<string, boolean> = {};
        for (const key of flagKeys) {
          results[key] = false;
        }
        setFlags(results);
      }
    };

    checkFlags();
  }, [flagKeys.join(',')]);

  return flags;
}
