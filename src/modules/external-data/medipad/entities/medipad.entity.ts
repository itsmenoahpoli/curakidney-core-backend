import { ApiProperty } from '@nestjs/swagger';

export type MedipadHttpRequestArgs = {
  authenticationKey?: string;
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

export class MedipadPatient {
  @ApiProperty({
    example: 1,
    description: 'Patient ID',
  })
  PatientID: number;

  @ApiProperty({
    example: 'Juan Dela Cruz',
    description: 'Full name of the patient',
  })
  PatientFullName: string;

  @ApiProperty({
    example: 'Male',
    description: 'Gender of the patient',
  })
  Gender: string;

  @ApiProperty({
    example: 45,
    description: 'Age of the patient',
  })
  Age: number;

  @ApiProperty({
    example: 'Stroke',
    description: 'Diagnosis of the patient',
  })
  Diagnosis: string;

  @ApiProperty({
    example: '3 times a week',
    description: 'Session frequency',
  })
  Frequency: string;

  @ApiProperty({
    example: 12,
    description: 'Total number of sessions',
  })
  TotalSessions: number;

  @ApiProperty({
    example: '2025-01-15',
    description: 'Date of the first session',
  })
  FirstSession: string;

  @ApiProperty({
    example: '2025-02-15',
    description: 'Date of the last session',
  })
  LastSession: string;
}

export class MedipadDoctor {
  @ApiProperty({
    example: '1234567',
    description: 'Professional Regulation Commission (PRC) Number',
  })
  PRCNumber: string;

  @ApiProperty({
    example: 'Dr. Maria Santos',
    description: 'Full name of the physician',
  })
  PhysicianName: string;

  @ApiProperty({
    example: 'maria.santos@example.com',
    description: 'Email address of the physician',
  })
  Email: string;

  @ApiProperty({
    example: '09171234567',
    description: 'Contact number of the physician',
  })
  ContactNumber: string;

  @ApiProperty({
    example: '4545545545454545',
    description: 'Professional Tax Receipt document filename or URL',
    nullable: true,
  })
  ProfessionalTaxReceipt: string | null;

  @ApiProperty({
    example: 'PH1234567890',
    description: 'PhilHealth accreditation number',
  })
  PhilHealthAccreditationNumber: string;

  @ApiProperty({
    example: '90809890809890',
    description: 'S2 License document filename or URL',
    nullable: true,
  })
  S2LicenseNumber: string | null;

  @ApiProperty({
    example: '123-456-789-000',
    description: 'Tax Identification Number (TIN)',
  })
  TIN: string;
}

export class MedipadPatientTreatmentOverview {
  @ApiProperty({
    example: 101,
    description: 'ID of the medical center',
  })
  MedicalCenterID: number;

  @ApiProperty({
    example: 2025,
    description: 'ID of the user (e.g., physician or staff)',
  })
  UserID: number;

  @ApiProperty({
    example: 2025,
    description: 'Year of the report or record',
  })
  Year: number;

  @ApiProperty({
    example: 5,
    description: 'Month of the report (1-12)',
  })
  Month: number;

  @ApiProperty({
    example: 50,
    description: 'Total number of patients treated in the given month',
  })
  PatientCount: number;

  @ApiProperty({
    example: 120,
    description: 'Total number of treatments provided in the given month',
  })
  TreatmentCount: number;
}
