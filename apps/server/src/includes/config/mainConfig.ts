import 'dotenv/config';

declare const process: {
  env: Record<string, string | undefined>;
};

function getEnvVar(name: string, defaultValue?: string): string {
  const value = process.env[name] ?? defaultValue;
  if (value === undefined) {
    throw new Error(
      `Environment variable ${name} is required but was not provided.`,
    );
  }
  return value;
}

export const NODE_ENV = getEnvVar('NODE_ENV', 'development');
export const PORT = parseInt(getEnvVar('PORT', '3000'), 10);

export const DATABASE_URL = getEnvVar('DATABASE_URL', '');
export const CLIENT_URL = getEnvVar('CLIENT_URL', 'http://localhost:5173');

export const DB_HOST = getEnvVar('DB_HOST', 'localhost');
export const DB_USER = getEnvVar('DB_USER', 'postgres');
export const DB_PASSWORD = getEnvVar('DB_PASSWORD');
export const DB_NAME = getEnvVar('DB_NAME');
export const DB_PORT = parseInt(getEnvVar('DB_PORT', '5432'), 10);

export const JWT_SECRET = getEnvVar('JWT_SECRET');
export const CSRF_SECRET = getEnvVar('CSRF_SECRET');
export const COOKIE_SECRET = getEnvVar('COOKIE_SECRET');

export const GMAIL_USER = process.env['GMAIL_USER'];
export const GMAIL_APP_PASSWORD = process.env['GMAIL_APP_PASSWORD'];
