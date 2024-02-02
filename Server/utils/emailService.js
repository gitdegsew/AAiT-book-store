import nodemailer from 'nodemailer';

export default class MailService {
  static async sendMail(options) {
    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: options.to,
      cc: options.cc,
      bcc: options.bcc,
      subject: options.subject,
      text: options.text,
      html: options.html,
    };

    const transporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE,
      auth: {
        user: process.env.SENDER_EMAIL,
        pass: process.env.EMAIL_PASS,
      },
    });

    const info = await transporter.sendMail(mailOptions);

    return info;
  }
}
