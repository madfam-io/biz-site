import { FeatureFlagProvider } from '@madfam/core';
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/feature-flags
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const flag = searchParams.get('flag');
    const environment = searchParams.get('env') || process.env.NEXT_PUBLIC_ENV || 'development';

    if (flag) {
      // Get specific flag
      const featureFlag = await prisma.featureFlag.findUnique({
        where: { key: flag },
      });

      if (!featureFlag) {
        // Fallback to core provider if not in database
        const provider = new FeatureFlagProvider();
        const isEnabled = provider.isEnabled(flag);

        return NextResponse.json({
          key: flag,
          enabled: isEnabled,
          environment,
          source: 'provider',
        });
      }

      // Check if enabled for the current environment
      let isEnabled = false;
      switch (environment) {
        case 'development':
          isEnabled = featureFlag.enabledDev;
          break;
        case 'staging':
          isEnabled = featureFlag.enabledStaging;
          break;
        case 'production':
          isEnabled = featureFlag.enabledProd;
          break;
        default:
          isEnabled = featureFlag.enabled;
      }

      // Check rollout percentage if applicable
      let finalEnabled = isEnabled;
      if (isEnabled && environment === 'production' && featureFlag.rolloutPercentage) {
        // Simple hash-based rollout (in real app, use user ID)
        const hash = Math.floor(Math.random() * 100);
        finalEnabled = hash < featureFlag.rolloutPercentage;
      }

      return NextResponse.json({
        key: featureFlag.key,
        enabled: finalEnabled,
        environment,
        source: 'database',
        metadata: {
          name: featureFlag.name,
          description: featureFlag.description,
          rolloutPercentage: featureFlag.rolloutPercentage,
        },
      });
    } else {
      // Get all flags
      const flags = await prisma.featureFlag.findMany({
        where: { enabled: true },
      });

      // Merge with provider flags
      const provider = new FeatureFlagProvider();
      const providerFlags = [
        'NEW_LEAD_SCORING',
        'INTERACTIVE_CALCULATOR',
        'CHAT_SUPPORT',
        'PORTUGUESE_LOCALE',
        'ADVANCED_ANALYTICS',
        'N8N_WORKFLOWS',
      ];

      const allFlags: Record<string, boolean> = {};

      // Add database flags
      for (const dbFlag of flags) {
        let isEnabled = false;
        switch (environment) {
          case 'development':
            isEnabled = dbFlag.enabledDev;
            break;
          case 'staging':
            isEnabled = dbFlag.enabledStaging;
            break;
          case 'production':
            isEnabled = dbFlag.enabledProd;
            break;
          default:
            isEnabled = dbFlag.enabled;
        }

        // Check rollout percentage
        if (isEnabled && environment === 'production' && dbFlag.rolloutPercentage) {
          const hash = Math.floor(Math.random() * 100);
          isEnabled = hash < dbFlag.rolloutPercentage;
        }

        allFlags[dbFlag.key] = isEnabled;
      }

      // Add provider flags not in database
      for (const flagKey of providerFlags) {
        if (!(flagKey in allFlags)) {
          allFlags[flagKey] = provider.isEnabled(flagKey);
        }
      }

      return NextResponse.json({
        flags: allFlags,
        environment,
        timestamp: new Date().toISOString(),
      });
    }
  } catch (error) {
    console.error('Error fetching feature flags:', error);
    return NextResponse.json({ error: 'Failed to fetch feature flags' }, { status: 500 });
  }
}

// POST /api/feature-flags (admin only)
export async function POST(request: NextRequest) {
  try {
    // TODO: Add authentication check here
    // if (!isAdmin(request)) {
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    // }

    const body = await request.json();
    const {
      key,
      name,
      description,
      enabledDev,
      enabledStaging,
      enabledProd,
      rolloutPercentage,
      userGroups,
    } = body;

    const featureFlag = await prisma.featureFlag.upsert({
      where: { key },
      update: {
        name,
        description,
        enabledDev: enabledDev ?? true,
        enabledStaging: enabledStaging ?? false,
        enabledProd: enabledProd ?? false,
        rolloutPercentage,
        userGroups: userGroups || [],
        enabled: true,
      },
      create: {
        key,
        name,
        description,
        enabledDev: enabledDev ?? true,
        enabledStaging: enabledStaging ?? false,
        enabledProd: enabledProd ?? false,
        rolloutPercentage,
        userGroups: userGroups || [],
        enabled: true,
      },
    });

    return NextResponse.json({
      success: true,
      flag: featureFlag,
    });
  } catch (error) {
    console.error('Error creating/updating feature flag:', error);
    return NextResponse.json({ error: 'Failed to create/update feature flag' }, { status: 500 });
  }
}

// PATCH /api/feature-flags (toggle flag)
export async function PATCH(request: NextRequest) {
  try {
    // TODO: Add authentication check here
    const body = await request.json();
    const { key, enabled, environment } = body;

    const featureFlag = await prisma.featureFlag.findUnique({
      where: { key },
    });

    if (!featureFlag) {
      return NextResponse.json({ error: 'Feature flag not found' }, { status: 404 });
    }

    // Update environment-specific setting
    const updateData: any = {};
    switch (environment || 'development') {
      case 'development':
        updateData.enabledDev = enabled;
        break;
      case 'staging':
        updateData.enabledStaging = enabled;
        break;
      case 'production':
        updateData.enabledProd = enabled;
        break;
      default:
        updateData.enabled = enabled;
    }

    const updated = await prisma.featureFlag.update({
      where: { key },
      data: updateData,
    });

    return NextResponse.json({
      success: true,
      flag: updated,
    });
  } catch (error) {
    console.error('Error toggling feature flag:', error);
    return NextResponse.json({ error: 'Failed to toggle feature flag' }, { status: 500 });
  }
}
