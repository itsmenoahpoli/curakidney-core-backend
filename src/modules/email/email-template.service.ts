import { Injectable } from '@nestjs/common';
import { readFileSync } from 'fs';
import { join } from 'path';
import * as handlebars from 'handlebars';

@Injectable()
export class EmailTemplateService {
  private readonly templatesDir: string;

  constructor() {
    this.templatesDir = join(__dirname, 'templates');
  }

  private getTemplate(name: string): HandlebarsTemplateDelegate {
    try {
      const templatePath = join(this.templatesDir, `${name}.hbs`);
      const templateContent = readFileSync(templatePath, 'utf-8');
      return handlebars.compile(templateContent);
    } catch (error) {
      throw new Error(`Template ${name} not found: ${error.message}`);
    }
  }

  compileOtpTemplate(data: { code: string }): string {
    const template = this.getTemplate('otp-code');
    return template(data);
  }

  compileWelcomeTemplate(data: { name: string }): string {
    const template = this.getTemplate('welcome');
    return template(data);
  }
}
