import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class VerifyDoctorDto {
  @ApiProperty({
    example: 'STAR',
    description: 'Last name of the physician',
  })
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @ApiProperty({
    example: '852852',
    description: 'Professional Regulation Commission (PRC) Number',
  })
  @IsNotEmpty()
  @IsString()
  PRCNumber: string;

  @ApiProperty({
    example: '217917865',
    description: 'Tax Identification Number (TIN)',
  })
  @IsNotEmpty()
  @IsString()
  TIN: string;
}
