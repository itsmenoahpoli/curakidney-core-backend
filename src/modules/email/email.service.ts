import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import { EmailTemplateService } from './email-template.service';

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;
  private readonly logger = new Logger(EmailService.name);

  constructor(
    private configService: ConfigService,
    private emailTemplateService: EmailTemplateService,
  ) {
    this.transporter = nodemailer.createTransport({
      host: this.configService.get<string>('SMTP_HOST'),
      port: this.configService.get<number>('SMTP_PORT'),
      secure: false,
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
    try {
      const html = this.emailTemplateService.compileOtpTemplate({ code });

      await this.transporter.sendMail({
        from: this.configService.get<string>('SMTP_FROM'),
        to: email,
        subject: 'Your verification code',
        text: `Your verification code is: ${code}`,
        html,
      });

      this.logger.log(`OTP email sent successfully to ${email}`);
    } catch (error) {
      this.logger.error(`Failed to send OTP email to ${email}: ${error.message}`, error.stack);
      throw error;
    }
  }

  async sendWelcomeEmail(email: string, name: string): Promise<void> {
    try {
      const html = this.emailTemplateService.compileWelcomeTemplate({ name });

      await this.transporter.sendMail({
        from: this.configService.get<string>('SMTP_FROM'),
        to: email,
        subject: 'Welcome to CuraKidney',
        text: `Welcome to CuraKidney, ${name}!`,
        html,
      });

      this.logger.log(`Welcome email sent successfully to ${email}`);
    } catch (error) {
      this.logger.error(`Failed to send welcome email to ${email}: ${error.message}`, error.stack);
      throw error;
    }
  }

  async sendWelcomeDoctorEmail(email: string, name: string): Promise<void> {
    try {
      const html = this.emailTemplateService.compileWelcomeDoctorTemplate({
        name,
        email,
      });

      await this.transporter.sendMail({
        from: this.configService.get<string>('SMTP_FROM'),
        to: email,
        subject: 'Welcome to CuraKidney - Complete Your Account Setup',
        text: `Welcome to CuraKidney, Dr. ${name}! Please complete your account setup.`,
        html,
      });

      this.logger.log(`Welcome doctor email sent successfully to ${email}`);
    } catch (error) {
      this.logger.error(
        `Failed to send welcome doctor email to ${email}: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  async sendAccountCreatedNephrologistEmail(email: string, name: string): Promise<void> {
    try {
      const html = this.emailTemplateService.compileAccountCreatedNephrologistTemplate({
        name,
        loginUri: `${this.configService.get('DASHBOARD_URL')}/signin`,
      });

      await this.transporter.sendMail({
        from: this.configService.get<string>('SMTP_FROM'),
        to: email,
        subject: 'Welcome to CuraKidney - Account Created Successfully',
        text: `Welcome to CuraKidney, Dr. ${name}! Your account has been created successfully.`,
        html,
      });

      this.logger.log(`Account created email sent successfully to ${email}`);
    } catch (error) {
      this.logger.error(
        `Failed to send account created email to ${email}: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  async sendPaymentStatusUpdateEmail(
    email: string,
    doctorName: string,
    treatmentIds: string[],
    amount: number,
  ): Promise<void> {
    try {
      const html = this.emailTemplateService.compileTemplate('treatments-paymentstatus-update', {
        name: doctorName,
        treatmentIds,
        amount,
      });

      await this.transporter.sendMail({
        from: this.configService.get<string>('SMTP_FROM'),
        to: email,
        subject: 'Treatment Payment Status Update',
        html,
      });

      this.logger.log(`Payment status update email sent successfully to ${email}`);
    } catch (error) {
      this.logger.error(
        `Failed to send payment status update email to ${email}: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }
}
