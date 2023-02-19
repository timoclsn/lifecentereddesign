import { TRPCError } from '@trpc/server';
import nodemailer from 'nodemailer';
import { publicProcedure, router } from 'server/trpc';
import { z } from 'zod';

const envSchema = z.object({
  SUGGESTION_MAIL_SMTP: z.string(),
  SUGGESTION_MAIL_ACCOUNT: z.string(),
  SUGGESTION_MAIL_PASSWORD: z.string(),
});

const {
  SUGGESTION_MAIL_SMTP,
  SUGGESTION_MAIL_ACCOUNT,
  SUGGESTION_MAIL_PASSWORD,
} = envSchema.parse(process.env);

export const suggestionRouter = router({
  add: publicProcedure
    .input(
      z.object({
        title: z.string(),
        description: z.string(),
        url: z.string().url(),
      })
    )
    .mutation(async ({ input }) => {
      const { title, description, url } = input;

      const text = `
        Title: ${title}
        Description: ${description}
        URL: ${url}
      `;

      const transporter = nodemailer.createTransport({
        port: 465,
        host: SUGGESTION_MAIL_SMTP,
        auth: {
          user: SUGGESTION_MAIL_ACCOUNT,
          pass: SUGGESTION_MAIL_PASSWORD,
        },
        secure: true,
      });

      const mailData = {
        from: 'Website Resource Suggestion Form',
        to: 'hello@lifecentereddesign.net',
        subject: `New Resource Suggestion From Website Form`,
        text,
        html: `<div>${text}</div>`,
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
