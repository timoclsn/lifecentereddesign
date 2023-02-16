import mailchimp from '@mailchimp/mailchimp_marketing';
import { TRPCError } from '@trpc/server';
import { newsletterFormSchema } from 'components/Newsletter/Newsletter';
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

mailchimp.setConfig({
  apiKey: apiKey,
  server: apiServer,
});

export const newsletterRouter = router({
  subscribe: publicProcedure
    .input(newsletterFormSchema)
    .mutation(async ({ input }) => {
      const { email, consens } = input;

      try {
        await mailchimp.lists.addListMember(audienceId, {
          email_address: email,
          status: 'pending',
          marketing_permissions: [
            {
              marketing_permission_id: marketingPermissionId,
              enabled: consens,
            },
          ],
        });
      } catch (e) {
        console.log(e);
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message:
            "There was an error subscribing to the newsletter. Send me an email at katharina@katharinaclasen.de and I'll add you to the list.",
        });
      }
    }),
});
