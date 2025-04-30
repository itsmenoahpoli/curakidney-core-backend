import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class VerifyDoctorDto {
  @ApiProperty({
    example: 'Smith',
    description: "Doctor's last name",
  })
  @IsString()
  @IsNotEmpty()
  last_name: string;

  @ApiProperty({
    example: '123-456-789-000',
    description: 'Tax Identification Number',
  })
  @IsString()
  @IsNotEmpty()
  tin_number: string;

  @ApiProperty({
    example: '0123456',
    description: 'Professional Regulation Commission License Number',
  })
  @IsString()
  @IsNotEmpty()
  prc_license_number: string;
}
