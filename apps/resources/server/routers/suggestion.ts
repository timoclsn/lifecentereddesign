import { TRPCError } from '@trpc/server';
import { suggestionFormSchema } from 'components/Suggestion';
import nodemailer from 'nodemailer';
import { publicProcedure, router } from 'server/trpc';
import { z } from 'zod';

const envSchema = z.object({
  SUGGESTION_MAIL_PASSWORD: z.string(),
});

const { SUGGESTION_MAIL_PASSWORD } = envSchema.parse(process.env);

export const suggestionRouter = router({
  submit: publicProcedure
    .input(suggestionFormSchema)
    .mutation(async ({ input }) => {
      const { link, message, name } = input;

      const transporter = nodemailer.createTransport({
        port: 465,
        host: 'sslout.de',
        auth: {
          user: 'suggestion@lifecentereddesign.net',
          pass: SUGGESTION_MAIL_PASSWORD,
        },
        secure: true,
      });

      const mailData = {
        from: 'suggestion@lifecentereddesign.net',
        to: 'hello@lifecentereddesign.net',
        subject: 'Resource Suggestion',
        text: `Link: ${link}\nMessage: ${
          message ? message : 'No message provided'
        }\nName: ${name ? name : 'No name provided'}`,
      };

      try {
        await transporter.sendMail(mailData);
      } catch (e) {
        console.error(e);
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message:
            'There was an error submitting your suggestion. Please try again or send it via email at hello@lifecentereddesign.net.',
        });
      }
    }),
});
