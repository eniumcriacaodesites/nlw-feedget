import { MailService, SendMailData } from "../mail-service";
import nodemailer from 'nodemailer';


const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "0c5671bb42b9bc",
    pass: "b26bc6804695e3"
  }
});

export class NodemailerMailService implements MailService {
  async sendMail({ subject, body }: SendMailData) {
    transport.sendMail({
      from: 'Equipe Feedget <oi@feedget.com>',
      to: 'Carlos da Silva <carlos@enium.com.br>',
      subject: subject,
      html: body,
    });
  };
}