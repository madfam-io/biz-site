import { Prisma } from '@prisma/client';
import { env } from './env';
import { apiLogger } from './logger';
import { encryptData, decryptData } from './security';

/**
 * Integration Security Layer
 * Handles encryption/decryption of sensitive integration data
 */

interface EncryptedIntegrationData {
  config: {
    encrypted: string;
    iv: string;
    tag: string;
  };
  apiKey?: {
    encrypted: string;
    iv: string;
    tag: string;
  };
}

/**
 * Encrypt integration config and API key before storing
 */
export function encryptIntegrationData(data: {
  config: Prisma.JsonValue;
  apiKey?: string | null;
}): EncryptedIntegrationData {
  const encryptionKey = env.ENCRYPTION_KEY;

  // Encrypt config (JSON)
  const configString = JSON.stringify(data.config);
  const encryptedConfig = encryptData(configString, encryptionKey);

  // Encrypt API key if provided
  const encryptedApiKey = data.apiKey
    ? encryptData(data.apiKey, encryptionKey)
    : undefined;

  return {
    config: encryptedConfig,
    apiKey: encryptedApiKey,
  };
}

/**
 * Decrypt integration config and API key after retrieval
 */
export function decryptIntegrationData(encryptedData: {
  config: Prisma.JsonValue;
  apiKey?: string | null;
}): {
  config: Prisma.JsonValue;
  apiKey?: string | null;
} {
  try {
    const encryptionKey = env.ENCRYPTION_KEY;

    // Parse encrypted config
    const configData = encryptedData.config as EncryptedIntegrationData['config'];

    // Decrypt config
    const decryptedConfigString = decryptData(
      configData.encrypted,
      configData.iv,
      configData.tag,
      encryptionKey
    );
    const decryptedConfig = JSON.parse(decryptedConfigString);

    // Decrypt API key if present
    const apiKeyData = encryptedData.apiKey as EncryptedIntegrationData['apiKey'] | null | undefined;
    const decryptedApiKey = apiKeyData
      ? decryptData(
          apiKeyData.encrypted,
          apiKeyData.iv,
          apiKeyData.tag,
          encryptionKey
        )
      : null;

    return {
      config: decryptedConfig,
      apiKey: decryptedApiKey,
    };
  } catch (error) {
    apiLogger.error('Failed to decrypt integration data', error as Error);
    throw new Error('Failed to decrypt integration data');
  }
}

/**
 * Create integration with encrypted data
 */
export async function createEncryptedIntegration(
  prisma: {
    integration: {
      create: (args: { data: Record<string, unknown> }) => Promise<unknown>;
    };
  },
  data: {
    name: string;
    enabled?: boolean;
    config: Prisma.JsonValue;
    webhookUrl?: string;
    apiKey?: string;
  }
) {
  const encrypted = encryptIntegrationData({
    config: data.config,
    apiKey: data.apiKey,
  });

  return prisma.integration.create({
    data: {
      name: data.name,
      enabled: data.enabled ?? true,
      webhookUrl: data.webhookUrl,
      config: encrypted.config,
      apiKey: encrypted.apiKey ? JSON.stringify(encrypted.apiKey) : null,
    },
  });
}

/**
 * Update integration with encrypted data
 */
export async function updateEncryptedIntegration(
  prisma: {
    integration: {
      findUnique: (args: { where: { id: string } }) => Promise<{
        config: Prisma.JsonValue;
        apiKey: string | null;
      } | null>;
      update: (args: { where: { id: string }; data: Record<string, unknown> }) => Promise<unknown>;
    };
  },
  id: string,
  data: {
    name?: string;
    enabled?: boolean;
    config?: Prisma.JsonValue;
    webhookUrl?: string;
    apiKey?: string;
  }
) {
  const updateData: Record<string, unknown> = {};

  if (data.name !== undefined) updateData.name = data.name;
  if (data.enabled !== undefined) updateData.enabled = data.enabled;
  if (data.webhookUrl !== undefined) updateData.webhookUrl = data.webhookUrl;

  // Encrypt config and apiKey if provided
  if (data.config !== undefined || data.apiKey !== undefined) {
    // Get current integration to preserve existing encrypted data if not updating both
    const current = await prisma.integration.findUnique({ where: { id } });

    const toEncrypt = {
      config: data.config !== undefined ? data.config : (
        current?.config ? decryptIntegrationData({ config: current.config, apiKey: null }).config : {}
      ),
      apiKey: data.apiKey !== undefined ? data.apiKey : (
        current?.apiKey ? decryptIntegrationData({ config: {}, apiKey: current.apiKey }).apiKey : null
      ),
    };

    const encrypted = encryptIntegrationData(toEncrypt);

    if (data.config !== undefined) {
      updateData.config = encrypted.config;
    }

    if (data.apiKey !== undefined) {
      updateData.apiKey = encrypted.apiKey ? JSON.stringify(encrypted.apiKey) : null;
    }
  }

  return prisma.integration.update({
    where: { id },
    data: updateData,
  });
}

/**
 * Get integration with decrypted data
 */
export async function getDecryptedIntegration(
  prisma: {
    integration: {
      findFirst: (args: {
        where: {
          OR: Array<{ id: string } | { name: string }>;
        };
      }) => Promise<{
        id: string;
        name: string;
        config: Prisma.JsonValue;
        apiKey: string | null;
      } | null>;
    };
  },
  nameOrId: string
) {
  const integration = await prisma.integration.findFirst({
    where: {
      OR: [
        { id: nameOrId },
        { name: nameOrId },
      ],
    },
  });

  if (!integration) {
    return null;
  }

  const decrypted = decryptIntegrationData({
    config: integration.config,
    apiKey: integration.apiKey,
  });

  return {
    ...integration,
    config: decrypted.config,
    apiKey: decrypted.apiKey,
  };
}
