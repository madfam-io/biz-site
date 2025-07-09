import * as React from 'react';
import { useFeatureFlag } from '@/hooks/useFeatureFlag';

interface FeatureFlagProps {
  flag: string;
  fallback?: React.ReactNode;
  children: React.ReactNode;
  // Optional callback when flag state changes
  onChange?: (enabled: boolean) => void;
}

export function FeatureFlag({ 
  flag, 
  fallback = null, 
  children,
  onChange 
}: FeatureFlagProps) {
  const isEnabled = useFeatureFlag(flag);

  React.useEffect(() => {
    if (onChange) {
      onChange(isEnabled);
    }
  }, [isEnabled, onChange]);

  if (!isEnabled) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}

// Compound component for multiple feature flags
interface FeatureFlagsProps {
  children: React.ReactNode;
}

interface WhenProps {
  flag: string;
  children: React.ReactNode;
}

interface OtherwiseProps {
  children: React.ReactNode;
}

export function FeatureFlags({ children }: FeatureFlagsProps) {
  return <>{children}</>;
}

FeatureFlags.When = function When({ flag, children }: WhenProps) {
  const isEnabled = useFeatureFlag(flag);
  return isEnabled ? <>{children}</> : null;
};

FeatureFlags.Otherwise = function Otherwise({ children }: OtherwiseProps) {
  return <>{children}</>;
};

// HOC for feature flag protection
export function withFeatureFlag<P extends object>(
  flag: string,
  FallbackComponent?: React.ComponentType<P>
) {
  return function WithFeatureFlagComponent(Component: React.ComponentType<P>) {
    return function FeatureFlaggedComponent(props: P) {
      const isEnabled = useFeatureFlag(flag);

      if (!isEnabled) {
        return FallbackComponent ? <FallbackComponent {...props} /> : null;
      }

      return <Component {...props} />;
    };
  };
}

// Utility component to show feature flag status in development
export function FeatureFlagDebug() {
  const flags = {
    NEW_LEAD_SCORING: useFeatureFlag('NEW_LEAD_SCORING'),
    INTERACTIVE_CALCULATOR: useFeatureFlag('INTERACTIVE_CALCULATOR'),
    CHAT_SUPPORT: useFeatureFlag('CHAT_SUPPORT'),
    PORTUGUESE_LOCALE: useFeatureFlag('PORTUGUESE_LOCALE'),
    ADVANCED_ANALYTICS: useFeatureFlag('ADVANCED_ANALYTICS'),
    N8N_WORKFLOWS: useFeatureFlag('N8N_WORKFLOWS'),
  };

  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 bg-obsidian text-pearl p-4 rounded-lg shadow-lg max-w-xs z-50">
      <h3 className="text-sm font-bold mb-2">Feature Flags</h3>
      <ul className="text-xs space-y-1">
        {Object.entries(flags).map(([key, enabled]) => (
          <li key={key} className="flex items-center justify-between">
            <span>{key}:</span>
            <span className={enabled ? 'text-leaf' : 'text-red-400'}>
              {enabled ? '✓' : '✗'}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}