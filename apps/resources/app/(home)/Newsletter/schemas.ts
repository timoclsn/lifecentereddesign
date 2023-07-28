import { z } from 'zod';

export type NewsletterFormSchema = z.infer<typeof newsletterFormSchema>;

export const newsletterFormSchema = z.object({
  email: z.string().min(1, { message: 'Email address is required' }).email({
    message: 'Must be a valid email address',
  }),
  consens: z.literal(true, {
    errorMap: () => ({
      message: 'You must confirm that you want to subscribe',
    }),
  }),
});
