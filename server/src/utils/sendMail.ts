import nodemailer from 'nodemailer';

export const sendMail = async (subject: string, to: string, html: string) => {
  let transporter = nodemailer.createTransport({
    host: process.env.SMPT_HOST,
    port: parseInt(process.env.SMTP_PORT),
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  await transporter.sendMail({
    from: `"${subject}" < ${process.env.SMTP_USER} >`,
    to: to,
    subject: subject,
    html: html,
  });
};
// Backblaze B2