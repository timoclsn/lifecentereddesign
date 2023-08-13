'use server';

import nodemailer from 'nodemailer';
import { createAction } from '../../../lib/actions/createAction';
import { envSchema, suggestionFormSchema } from './schemas';

const { SUGGESTION_MAIL_PASSWORD } = envSchema.parse(process.env);

export const submit = createAction(suggestionFormSchema)(async ({
  link,
  message,
  name,
}) => {
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
    throw new Error(
      'There was an error submitting your suggestion. Please try again or send it via email at hello@lifecentereddesign.net.',
    );
  }
});
