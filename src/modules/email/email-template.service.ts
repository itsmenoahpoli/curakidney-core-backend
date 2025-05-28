import { Injectable, Logger } from '@nestjs/common';
import { readFileSync } from 'fs';
import { join } from 'path';
import * as handlebars from 'handlebars';
import { ConfigService } from '@nestjs/config';

interface BaseTemplateData {
  assetsUrl: string;
}

interface OtpTemplateData extends BaseTemplateData {
  code: string;
}

interface WelcomeTemplateData extends BaseTemplateData {
  name: string;
}

interface WelcomeDoctorTemplateData extends BaseTemplateData {
  name: string;
  email: string;
  redirectUri: string;
}

interface AccountCreatedNephrologistTemplateData extends BaseTemplateData {
  name: string;
  loginUri: string;
}

@Injectable()
export class EmailTemplateService {
  private readonly templatesDir: string;
  private readonly logger = new Logger(EmailTemplateService.name);
  private readonly templateCache: Map<string, HandlebarsTemplateDelegate> = new Map();

  constructor(private configService: ConfigService) {
    this.templatesDir = join(__dirname, 'templates');
  }

  private getTemplate(name: string): HandlebarsTemplateDelegate {
    if (this.templateCache.has(name)) {
      return this.templateCache.get(name);
    }

    try {
      const templatePath = join(this.templatesDir, `${name}.hbs`);
      this.logger.debug(`Loading email template: ${templatePath}`);

      const templateContent = readFileSync(templatePath, 'utf-8');
      const template = handlebars.compile(templateContent);

      this.templateCache.set(name, template);
      this.logger.debug(`Successfully compiled template: ${name}`);

      return template;
    } catch (error) {
      this.logger.error(`Failed to load template ${name}: ${error.message}`, error.stack);
      throw new Error(`Template ${name} not found: ${error.message}`);
    }
  }

  private compileTemplateWithData<T extends BaseTemplateData>(
    name: string,
    data: Omit<T, 'assetsUrl'>,
  ): string {
    try {
      const template = this.getTemplate(name);
      return template({
        ...data,
        assetsUrl: this.configService.get('ASSETS_URL'),
      });
    } catch (error) {
      this.logger.error(`Failed to compile template ${name}: ${error.message}`, error.stack);
      throw error;
    }
  }

  compileOtpTemplate(data: Omit<OtpTemplateData, 'assetsUrl'>): string {
    return this.compileTemplateWithData<OtpTemplateData>('otp-code', data);
  }

  compileWelcomeTemplate(data: Omit<WelcomeTemplateData, 'assetsUrl'>): string {
    return this.compileTemplateWithData<WelcomeTemplateData>('welcome', data);
  }

  compileWelcomeDoctorTemplate(
    data: Omit<WelcomeDoctorTemplateData, 'assetsUrl' | 'redirectUri'>,
  ): string {
    const templateData = {
      ...data,
      redirectUri: `${this.configService.get('DASHBOARD_URL')}/create-account/verify-details?account_type=nephrologist&email=${data.email}`,
    };
    return this.compileTemplateWithData<WelcomeDoctorTemplateData>(
      'welcome-nephrologist',
      templateData,
    );
  }

  compileAccountCreatedNephrologistTemplate(
    data: Omit<AccountCreatedNephrologistTemplateData, 'assetsUrl'>,
  ): string {
    return this.compileTemplateWithData<AccountCreatedNephrologistTemplateData>(
      'account-created-nephrologist',
      data,
    );
  }

  compileTemplate(name: string, data: Record<string, any>): string {
    return this.compileTemplateWithData(name, data);
  }
}
