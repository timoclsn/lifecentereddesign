'use server';

import nodemailer from 'nodemailer';
import {
  SuggestionFormSchema,
  envSchema,
  suggestionFormSchema,
} from './schemas';

const { SUGGESTION_MAIL_PASSWORD } = envSchema.parse(process.env);

export const submit = async (input: SuggestionFormSchema) => {
  const result = suggestionFormSchema.safeParse(input);
  if (!result.success) {
    return {
      error: 'Please enter a valid link.',
    };
  }
  const { link, message, name } = result.data;

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
    return {
      error:
        'There was an error submitting your suggestion. Please try again or send it via email at hello@lifecentereddesign.net.',
    };
  }

  return {
    error: '',
  };
};
