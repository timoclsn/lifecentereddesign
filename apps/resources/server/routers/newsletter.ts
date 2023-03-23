import { TRPCError } from '@trpc/server';
import { newsletterFormSchema } from 'components/Newsletter';
import { publicProcedure, router } from 'server/trpc';
import { z } from 'zod';

const envSchema = z.object({
  MAILCHIMP_API_KEY: z.string(),
  MAILCHIMP_API_SERVER: z.string(),
  MAILCHIMP_AUDIENCE_ID: z.string(),
  MAILCHIMP_MARKETING_PERMISSION_ID: z.string(),
});

const {
  MAILCHIMP_API_KEY: apiKey,
  MAILCHIMP_API_SERVER: apiServer,
  MAILCHIMP_AUDIENCE_ID: audienceId,
  MAILCHIMP_MARKETING_PERMISSION_ID: marketingPermissionId,
} = envSchema.parse(process.env);

const url = `https://${apiServer}.api.mailchimp.com/3.0/lists/${audienceId}/members`;

const apiErrorSchema = z.object({
  title: z.string(),
  status: z.number(),
  detail: z.string(),
  instance: z.string(),
});

const errorSchema = z.object({
  name: z.string(),
  message: z.string(),
});

export const newsletterRouter = router({
  subscribe: publicProcedure
    .input(newsletterFormSchema)
    .mutation(async ({ input }) => {
      const { email, consens } = input;

      const data = {
        email_address: email,
        status: 'pending',
        marketing_permissions: [
          {
            marketing_permission_id: marketingPermissionId,
            enabled: consens,
          },
        ],
      };

      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `api_key ${apiKey}`,
          },
          body: JSON.stringify(data),
        });

        if (!response.ok) {
          const responseJson = await response.json();
          const error = apiErrorSchema.parse(responseJson);

          if (error.title === 'Member Exists') {
            throw new Error(error.title);
          }

          throw new Error();
        }
      } catch (e) {
        const error = errorSchema.parse(e);

        if (error.message === 'Member Exists') {
          throw new TRPCError({
            code: 'BAD_REQUEST',
            message: `${email} is already subscribed to our newsletter.`,
          });
        }

        throw new TRPCError({
          code: 'BAD_REQUEST',
          message:
            "There was an error subscribing to the newsletter. Send us an email at hello@lifecentereddesign.net and we'll add you to the list.",
        });
      }
    }),
});
