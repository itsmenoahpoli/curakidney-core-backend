import * as crypto from 'crypto';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MedipadHttpClient } from './medipad.api';
import { MedipadHttpRequestArgs, MedipadAuthKey, MedipadPatient } from './entities/medipad.entity';
import { DEFAULT_PAGINATION } from './medipad.defaults';

@Injectable()
export class MedipadService {
  constructor(
    private readonly medipadHttpClient: MedipadHttpClient,
    private readonly configService: ConfigService,
  ) {}

  private async httpRequest(args: MedipadHttpRequestArgs) {
    return this.medipadHttpClient.httpInstance(args);
  }

  private decryptPayload(payload: string) {
    const key = crypto
      .createHash('sha256')
      .update(this.configService.get<string>('MEDIPAD_PASSWORD_DECRYPT_KEY'))
      .digest();
    const iv = Buffer.from(this.configService.get<string>('MEDIPAD_IV_DECRYPT_KEY'), 'utf8');

    const encryptedData = Buffer.from(payload, 'base64');
    const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
    let decrypted = decipher.update(encryptedData, null, 'utf8');

    decrypted += decipher.final('utf8');

    return JSON.parse(decrypted);
  }

  async getAuthenticationKey(): Promise<MedipadAuthKey> {
    const result = this.httpRequest({
      endpoint: '/GetAuthenticationKeyAPI',
      method: 'GET',
    });

    return result.then((data) => data);
  }

  async getPatientsMasterList(prcNumber: string): Promise<MedipadPatient[]> {
    const { authenticationkey } = await this.getAuthenticationKey();
    const result = this.httpRequest({
      authenticationKey: authenticationkey,
      endpoint: '/GetPatientMasterListAPI',
      method: 'POST',
      data: {
        ...DEFAULT_PAGINATION,
        PRCNumber: prcNumber,
        PatientName: '',
        SortField: 'patientname',
      },
    });

    return result.then((data) => this.decryptPayload(data.result));
  }

  async getDoctorsMasterList() {
    const { authenticationkey } = await this.getAuthenticationKey();
    const result = this.httpRequest({
      authenticationKey: authenticationkey,
      endpoint: '/GetDoctorsListAPI',
      method: 'POST',
      data: {
        ...DEFAULT_PAGINATION,
      },
    });

    return result.then((data) => this.decryptPayload(data.result));
  }

  async getPatientTreatmentOverview(prcNumber: string) {
    const { authenticationkey } = await this.getAuthenticationKey();
    const result = this.httpRequest({
      authenticationKey: authenticationkey,
      endpoint: '/GetPatientTreatmentOverviewAPI',
      method: 'POST',
      data: {
        PRCNumber: prcNumber,
        Month: 0,
        Year: new Date().getFullYear(),
      },
    });

    return result.then((data) => this.decryptPayload(data.result));
  }
}
