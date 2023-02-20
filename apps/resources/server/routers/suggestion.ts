import { TRPCError } from '@trpc/server';
import nodemailer from 'nodemailer';
import { publicProcedure, router } from 'server/trpc';
import { z } from 'zod';

const envSchema = z.object({
  SUGGESTION_MAIL_PASSWORD: z.string(),
});

const { SUGGESTION_MAIL_PASSWORD } = envSchema.parse(process.env);

export const suggestionRouter = router({
  add: publicProcedure
    .input(
      z.object({
        link: z.string().url(),
        message: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const { link, message } = input;

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
        }`,
      };

      try {
        await transporter.sendMail(mailData);
      } catch (e) {
        console.log(e);
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message:
            'There was an error submitting your suggestion. Please try again or send it via email at hello@lifecentereddesign.net.',
        });
      }
    }),
});
