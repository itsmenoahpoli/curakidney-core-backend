import { IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SendWelcomeEmailDto {
  @ApiProperty({
    example: 'doctor@example.com',
    description: 'Nephrologist email address',
  })
  @IsEmail()
  email: string;
}
