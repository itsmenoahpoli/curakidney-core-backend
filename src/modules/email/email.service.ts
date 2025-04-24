import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import { EmailTemplateService } from './email-template.service';

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor(
    private configService: ConfigService,
    private emailTemplateService: EmailTemplateService,
  ) {
    this.transporter = nodemailer.createTransport({
      host: this.configService.get<string>('SMTP_HOST'),
      port: this.configService.get<number>('SMTP_PORT'),
      secure: false, // Changed from true to false
      auth: {
        user: this.configService.get<string>('SMTP_USER'),
        pass: this.configService.get<string>('SMTP_PASS'),
      },
      tls: {
        ciphers: 'SSLv3',
        rejectUnauthorized: false,
      },
    });
  }

  async sendOtpCode(email: string, code: string): Promise<void> {
    const html = this.emailTemplateService.compileOtpTemplate({ code });

    await this.transporter.sendMail({
      from: this.configService.get<string>('SMTP_FROM'),
      to: email,
      subject: 'Your verification code',
      text: `Your verification code is: ${code}`,
      html,
    });
  }

  async sendWelcomeEmail(email: string, name: string): Promise<void> {
    const html = this.emailTemplateService.compileWelcomeTemplate({ name });

    await this.transporter.sendMail({
      from: this.configService.get<string>('SMTP_FROM'),
      to: email,
      subject: 'Welcome to CuraKidney',
      text: `Welcome to CuraKidney, ${name}!`,
      html,
    });
  }
}
