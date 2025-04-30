import { Injectable, Logger } from '@nestjs/common';
import { readFileSync } from 'fs';
import { join } from 'path';
import * as handlebars from 'handlebars';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EmailTemplateService {
  private readonly templatesDir: string;
  private readonly logger = new Logger(EmailTemplateService.name);

  constructor(private configService: ConfigService) {
    this.templatesDir = join(__dirname, 'templates');
  }

  private getTemplate(name: string): HandlebarsTemplateDelegate {
    try {
      const templatePath = join(this.templatesDir, `${name}.hbs`);
      this.logger.debug(`Loading email template: ${templatePath}`);

      const templateContent = readFileSync(templatePath, 'utf-8');
      const template = handlebars.compile(templateContent);

      this.logger.debug(`Successfully compiled template: ${name}`);
      return template;
    } catch (error) {
      this.logger.error(
        `Failed to load template ${name}: ${error.message}`,
        error.stack,
      );
      throw new Error(`Template ${name} not found: ${error.message}`);
    }
  }

  compileOtpTemplate(data: { code: string }): string {
    try {
      const template = this.getTemplate('otp-code');
      return template({
        ...data,
        assetsUrl: this.configService.get('ASSETS_URL'),
      });
    } catch (error) {
      this.logger.error(
        `Failed to compile OTP template: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  compileWelcomeTemplate(data: { name: string }): string {
    try {
      const template = this.getTemplate('welcome');
      return template({
        ...data,
        assetsUrl: this.configService.get('ASSETS_URL'),
      });
    } catch (error) {
      this.logger.error(
        `Failed to compile welcome template: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  compileWelcomeDoctorTemplate(data: { name: string; email: string }): string {
    try {
      const template = this.getTemplate('welcome-nephrologist');
      return template({
        ...data,
        redirectUri: `https://curakidneydashboardv2.up.railway.app/create-account/verify-details?account_type=nephrologist&email=${data.email}`,
        assetsUrl: this.configService.get('ASSETS_URL'),
      });
    } catch (error) {
      this.logger.error(
        `Failed to compile welcome doctor template: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  compileAccountCreatedNephrologistTemplate(data: {
    name: string;
    loginUri: string;
  }): string {
    try {
      const template = this.getTemplate('account-created-nephrologist');
      return template({
        ...data,
        assetsUrl: this.configService.get('ASSETS_URL'),
      });
    } catch (error) {
      this.logger.error(
        `Failed to compile account created nephrologist template: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }
}
