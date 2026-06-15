import nodemailer from 'nodemailer';

import {
  getTransporter,
  getTestAccount,
  isUsingGmail,
} from '../includes/config/nodemailer';
import { GMAIL_USER } from '../includes/config/mainConfig';

export const sendEmail = async ({
  to,
  subject,
  text,
  html,
}: {
  to: string;
  subject: string;
  text: string;
  html?: string;
}) => {
  const transporter = getTransporter();

  const from = isUsingGmail()
    ? `"Savings Tracker" <${GMAIL_USER}>`
    : `"Savings Tracker" <${getTestAccount().user}>`;

  const info = await transporter.sendMail({ from, to, subject, text, html });

  console.log('[Mailer] Message ID:', info.messageId);

  if (!isUsingGmail()) {
    console.log('[Mailer] Preview URL:', nodemailer.getTestMessageUrl(info));
  }
};
