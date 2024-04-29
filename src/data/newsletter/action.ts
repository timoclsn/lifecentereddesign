'use server';

import { createAction } from '@/data/clients';
import { ActionError } from '@/lib/data/errors';
import { z } from 'zod';

const {
  MAILCHIMP_API_KEY,
  MAILCHIMP_API_SERVER,
  MAILCHIMP_AUDIENCE_ID,
  MAILCHIMP_MARKETING_PERMISSION_ID,
} = process.env;

const url = `https://${MAILCHIMP_API_SERVER}.api.mailchimp.com/3.0/lists/${MAILCHIMP_AUDIENCE_ID}/members`;

const apiErrorSchema = z.object({
  title: z.string(),
  status: z.number(),
  detail: z.string(),
  instance: z.string(),
});

const genericError =
  "There was an error subscribing to the newsletter. Send us an email at hello@lifecentereddesign.net and we'll add you to the list.";

export const subscribe = createAction({
  input: z.object({
    email: z.string().min(1, { message: 'Email address is required' }).email({
      message: 'Must be a valid email address',
    }),
    consens: z.boolean().refine((value) => value === true, {
      message: 'You must confirm that you want to subscribe',
    }),
  }),
  action: async ({ input }) => {
    const { consens, email } = input;

    const data = {
      email_address: email,
      status: 'pending',
      marketing_permissions: [
        {
          marketing_permission_id: MAILCHIMP_MARKETING_PERMISSION_ID,
          enabled: consens,
        },
      ],
    };

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `api_key ${MAILCHIMP_API_KEY}`,
      },
      body: JSON.stringify(data),
    }).catch((error) => {
      throw new ActionError({
        message: genericError,
        log: 'POST subscription failed',
        cause: error,
      });
    });

    if (!response.ok) {
      const responseJson = await response.json().catch((error) => {
        throw new ActionError({
          message: genericError,
          log: 'Failed to parse response JSON from Mailchimp API',
          cause: error,
        });
      });

      const result = apiErrorSchema.safeParse(responseJson);

      if (!result.success) {
        throw new ActionError({
          message: genericError,
          log: "Unexpected error response format from Mailchimp's API",
        });
      }

      const { title } = result.data;

      if (title === 'Member Exists') {
        throw new ActionError({
          message: `${email} is already subscribed to our newsletter.`,
          log: 'User is already subscribed to the newsletter',
        });
      }

      throw new ActionError({
        message: genericError,
        log: "Response from Mailchimp's API indicated an error",
      });
    }
  },
});
