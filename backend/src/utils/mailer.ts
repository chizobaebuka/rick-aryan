import nodemailer from 'nodemailer';
import { logger } from './logger';

function hasSmtp(): boolean {
  return Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS);
}

export async function sendRfqNotificationEmail(params: {
  rfqCode: string;
  companyName: string;
  contactEmail: string;
  location: string;
  productRequested: string;
  quantityMT: string;
  notes?: string | null;
}): Promise<void> {
  if (!hasSmtp()) {
    logger.info('RFQ created; SMTP not configured — no email sent. Set SMTP_* and RFQ_NOTIFICATION_EMAIL.');
    return;
  }

  const to =
    process.env.RFQ_NOTIFICATION_EMAIL ||
    process.env.ADMIN_NOTIFICATION_EMAIL ||
    process.env.SMTP_USER;
  if (!to) {
    logger.warn('RFQ email skipped: set RFQ_NOTIFICATION_EMAIL or ADMIN_NOTIFICATION_EMAIL');
    return;
  }

  const port = Number(process.env.SMTP_PORT) || 587;
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port,
    secure: port === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const from = process.env.SMTP_FROM || `"Rick Aryan RFQ" <${process.env.SMTP_USER}>`;
  const subject = `New RFQ ${params.rfqCode} — ${params.companyName}`;
  const text = [
    `New quote request received.`,
    ``,
    `RFQ code: ${params.rfqCode}`,
    `Company: ${params.companyName}`,
    `Contact: ${params.contactEmail}`,
    `Location: ${params.location}`,
    `Product: ${params.productRequested}`,
    `Quantity (MT): ${params.quantityMT}`,
    params.notes ? `Notes: ${params.notes}` : '',
  ]
    .filter(Boolean)
    .join('\n');

  await transporter.sendMail({ from, to, subject, text });
  logger.info(`RFQ notification email sent to ${to} for ${params.rfqCode}`);
}
