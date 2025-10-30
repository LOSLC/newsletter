type EnvKey =
  | "DATABASE_URL"
  | "APP_BASE_URL"
  | "DEBUG"
  | "SMTP_HOST"
  | "SMTP_LOGIN"
  | "SMTP_PASSWORD"
  | "SMTP_EMAIL"
  | "SUPPORT_EMAIL";


export function getEnv(key: EnvKey, fallback?: string): string {
  const value = process.env[key] || fallback;
  if (!value) {
    throw new Error(`Environment variable ${key} is not set.`);
  }
  return value;
}
console.log("Email", getEnv("SMTP_HOST"));
