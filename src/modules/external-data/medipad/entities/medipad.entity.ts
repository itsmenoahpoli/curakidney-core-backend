import { ApiProperty } from '@nestjs/swagger';

export type MedipadHttpRequestArgs = {
  endpoint: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  data?: any;
  params?: any;
  headers?: Record<string, string>;
};

export class MedipadAuthKey {
  @ApiProperty({
    example: 'authkeystring',
    description: 'Authentication key',
  })
  authenticationkey: string;
}
