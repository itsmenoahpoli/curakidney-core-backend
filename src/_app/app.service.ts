import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(private configService: ConfigService) {}

  healthcheck() {
    const nodeEnv = this.configService.get<string>('NODE_ENV');

    return {
      is_online: true,
      environment: nodeEnv,
    };
  }
}
