import type { Transporter } from 'nodemailer';
import nodemailer from 'nodemailer';
import { logger } from './logger';

let transporter: Transporter;

export const getMailer = (): Transporter => {
  if (transporter) return transporter;

  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: process.env.SMTP_SECURE === 'true', // true for 465, false for 587
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  transporter.verify((error) => {
    if (error) {
      logger.error({ error }, 'Mailer connection failed');
    } else {
      logger.info('Mailer ready');
    }
  });

  return transporter;
};
