import { z } from 'zod';

export type SuggestionFormSchema = z.infer<typeof suggestionFormSchema>;

export const suggestionFormSchema = z.object({
  link: z.string().min(1, { message: 'Link is required' }).url({
    message: 'Must be a valid URL',
  }),
  message: z.string().optional(),
  name: z.string().optional(),
});

export const envSchema = z.object({
  SUGGESTION_MAIL_PASSWORD: z.string(),
});
