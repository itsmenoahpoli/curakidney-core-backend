import { Injectable } from '@nestjs/common';
import { MedipadHttpClient } from './medipad.api';
import { MedipadAuthKey, MedipadHttpRequestArgs } from './entities/medipad.entity';

@Injectable()
export class MedipadService {
  constructor(private readonly medipadHttpClient: MedipadHttpClient) {}

  private async httpRequest(args: MedipadHttpRequestArgs) {
    return this.medipadHttpClient.httpInstance(args);
  }

  async getAuthenticationKey(): Promise<MedipadAuthKey> {
    const response = this.httpRequest({
      endpoint: '/GetAuthenticationKeyAPI',
      method: 'GET',
    });

    return response;
  }
}
