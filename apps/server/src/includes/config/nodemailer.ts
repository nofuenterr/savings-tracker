import nodemailer, { type Transporter, TestAccount } from 'nodemailer';

import { GMAIL_USER, GMAIL_APP_PASSWORD } from './mainConfig';

let transporter: Transporter;
let testAccount: TestAccount;
let usingGmail = false;

export const initMailer = async () => {
  const hasGmail = GMAIL_USER && GMAIL_APP_PASSWORD;

  if (hasGmail) {
    transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: GMAIL_USER,
        pass: GMAIL_APP_PASSWORD,
      },
    });
    usingGmail = true;
    console.log('[Mailer] Using Gmail:', GMAIL_USER);
  } else {
    testAccount = await nodemailer.createTestAccount();
    transporter = nodemailer.createTransport({
      host: testAccount.smtp.host,
      port: testAccount.smtp.port,
      secure: testAccount.smtp.secure,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });
    console.log('[Mailer] Using Ethereal (test):', testAccount.user);
  }
};

export const getTransporter = () => {
  if (!transporter) throw new Error('Mailer not initialized');
  return transporter;
};

export const getTestAccount = () => {
  if (!testAccount) throw new Error('No test account — mailer is using Gmail');
  return testAccount;
};

export const isUsingGmail = () => usingGmail;
