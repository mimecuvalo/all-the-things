function readEnv(key: string): string | undefined {
  const metaEnv = import.meta.env as unknown as Record<string, string | undefined>;
  return metaEnv[key] ?? process.env[key];
}

export const AUTH_SECRET = readEnv('AUTH_SECRET') ?? readEnv('NEXTAUTH_SECRET');
export const AUTH_GOOGLE_ID = readEnv('AUTH_GOOGLE_ID');
export const AUTH_GOOGLE_SECRET = readEnv('AUTH_GOOGLE_SECRET');
export const SENTRY_DSN = readEnv('SENTRY_DSN');
export const NODE_ENV = readEnv('NODE_ENV') ?? 'development';
export const DATABASE_URL = readEnv('DATABASE_URL') ?? '';
