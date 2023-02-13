import { TRPCError } from '@trpc/server';
import { newsletterFormSchema } from 'components/Newsletter/Newsletter';
import { publicProcedure, router } from 'server/trpc';
import { z } from 'zod';

const envSchema = z.object({
  MAILCHIMP_API_KEY: z.string(),
  MAILCHIMP_API_SERVER: z.string(),
  MAILCHIMP_AUDIENCE_ID: z.string(),
});

const {
  MAILCHIMP_API_KEY: apiKey,
  MAILCHIMP_API_SERVER: apiServer,
  MAILCHIMP_AUDIENCE_ID: audienceId,
} = envSchema.parse(process.env);

const url = `https://${apiServer}.api.mailchimp.com/3.0/lists/${audienceId}/members`;

export const newsletterRouter = router({
  subscribe: publicProcedure
    .input(newsletterFormSchema)
    .mutation(async ({ input }) => {
      const { email } = input;

      const data = {
        email_address: email,
        status: 'pending',
      };

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `api_key ${apiKey}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        console.log(response);
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message:
            "There was an error subscribing to the newsletter. Send me an email at katharina@katharinaclasen.de and I'll add you to the list.",
        });
      }
    }),
});
