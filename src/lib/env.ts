import { z } from 'zod';

const envVarSchema = z.string().min(1);

const envSchema = z.object({
  // Server

  // Node.js
  PORT: envVarSchema.optional(),

  // Mailchimp
  MAILCHIMP_API_KEY: envVarSchema,
  MAILCHIMP_API_SERVER: envVarSchema,
  MAILCHIMP_AUDIENCE_ID: envVarSchema,
  MAILCHIMP_MARKETING_PERMISSION_ID: envVarSchema,

  // Mail
  SUGGESTION_MAIL_PASSWORD: envVarSchema,

  // Open AI
  OPENAI_API_KEY: envVarSchema,

  // Turso DB
  TURSO_DATABASE_URL: envVarSchema,
  TURSO_AUTH_TOKEN: envVarSchema,

  // Client

  // Vercel
  NEXT_PUBLIC_VERCEL_ENV: z
    .enum(['production', 'preview', 'development'])
    .optional(),
});

envSchema.parse(process.env);

declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.input<typeof envSchema> {}
  }
}
