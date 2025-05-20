import { ApiProperty } from '@nestjs/swagger';

export class Doctor {
  @ApiProperty({
    example: '852852',
    description: 'Professional Regulation Commission (PRC) Number',
  })
  PRCNumber: string;

  @ApiProperty({
    example: 'TWINKLE LITTLE STAR Jr',
    description: 'Full name of the physician',
  })
  PhysicianName: string;

  @ApiProperty({
    example: 'bvbarredo@westpac-sfi.com',
    description: 'Email address of the physician',
  })
  Email: string;

  @ApiProperty({
    example: '09173500662',
    description: 'Contact number of the physician',
  })
  ContactNumber: string;

  @ApiProperty({
    example: null,
    description: 'Professional Tax Receipt document filename or URL',
    nullable: true,
  })
  ProfessionalTaxReceipt: string | null;

  @ApiProperty({
    example: '1501-0500001-1',
    description: 'PhilHealth accreditation number',
  })
  PhilHealthAccreditationNumber: string;

  @ApiProperty({
    example: null,
    description: 'S2 License document filename or URL',
    nullable: true,
  })
  S2LicenseNumber: string | null;

  @ApiProperty({
    example: '217917865',
    description: 'Tax Identification Number (TIN)',
  })
  TIN: string;
}
