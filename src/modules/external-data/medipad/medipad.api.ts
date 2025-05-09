import { firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import {
  Injectable,
  HttpException,
  UnauthorizedException,
  MethodNotAllowedException,
  InternalServerErrorException,
} from '@nestjs/common';
import { MedipadHttpRequestArgs } from './entities/medipad.entity';

const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
};

@Injectable()
export class MedipadHttpClient {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async httpInstance(args: MedipadHttpRequestArgs) {
    try {
      const {
        endpoint,
        method,
        data = undefined,
        params = undefined,
        headers = {
          ...DEFAULT_HEADERS,
          'medipad-api-key': this.configService.get<string>('MEDIPAD_API_KEY'),
        },
      } = args;

      const url = this.configService.get<string>('MEDIPAD_API_BASEURL') + endpoint;

      const rxResponse = this.httpService.request({
        url,
        method,
        data,
        params,
        headers,
      });

      const response = await firstValueFrom(rxResponse);
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        const status = error.response.status;
        const message = error.response.data?.message || error.message;

        switch (status) {
          case 401:
            throw new UnauthorizedException(message);
          case 405:
            throw new MethodNotAllowedException(message);
          case 500:
            throw new InternalServerErrorException(message);
          default:
            throw new HttpException(message, status);
        }
      }

      throw new InternalServerErrorException('Unexpected error occurred');
    }
  }
}
