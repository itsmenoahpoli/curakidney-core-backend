import { firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import {
  Injectable,
  HttpException,
  HttpStatus,
  UnauthorizedException,
  MethodNotAllowedException,
  InternalServerErrorException,
} from '@nestjs/common';
import { MedipadHttpRequestArgs } from './entities/medipad.entity';
import { DEFAULT_HEADERS } from './medipad.defaults';

@Injectable()
export class MedipadHttpClient {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async httpInstance(args: MedipadHttpRequestArgs) {
    try {
      const {
        authenticationKey,
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
        headers: {
          ...headers,
          ...(authenticationKey && { 'auth-key': authenticationKey }),
        },
      });

      const response = await firstValueFrom(rxResponse);
      return response.data;
    } catch (error) {
      console.log('[MEDIPAD API ERROR] -', error);
      if (error instanceof AxiosError && error.response) {
        const status = error.response.status;
        const message = error.response.data?.message || error.message;

        switch (status) {
          case HttpStatus.UNAUTHORIZED:
            throw new UnauthorizedException(message);
          case HttpStatus.METHOD_NOT_ALLOWED:
            throw new MethodNotAllowedException(message);
          case HttpStatus.INTERNAL_SERVER_ERROR:
            throw new InternalServerErrorException(message);
          default:
            throw new HttpException(message, status);
        }
      }

      throw new InternalServerErrorException('Unexpected error occurred');
    }
  }
}
