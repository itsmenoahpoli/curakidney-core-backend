import { IsEmail, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterNephrologistDto {
  @ApiProperty({
    example: 'Dr. John Doe',
    description: 'Nephrologist full name',
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: 'doctor@example.com',
    description: 'Nephrologist email address',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'password123',
    description: 'Password',
    minLength: 6,
  })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({
    example: '123-456-789-000',
    description: 'Tax Identification Number',
  })
  @IsString()
  tinNumber: string;

  @ApiProperty({
    example: '0123456',
    description: 'PRC License Number',
  })
  @IsString()
  prcLicenseNumber: string;
}
