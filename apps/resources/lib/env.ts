import { z } from 'zod';

const envSchema = z.object({
  PORT: z.string().min(1).optional(),
  MAILCHIMP_API_KEY: z.string().min(1),
  MAILCHIMP_API_SERVER: z.string().min(1),
  MAILCHIMP_AUDIENCE_ID: z.string().min(1),
  MAILCHIMP_MARKETING_PERMISSION_ID: z.string().min(1),
  SUGGESTION_MAIL_PASSWORD: z.string().min(1),
  NEXT_PUBLIC_VERCEL_ENV: z.enum(['preview', 'production']).optional(),
});

envSchema.parse(process.env);

declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof envSchema> {}
  }
}
