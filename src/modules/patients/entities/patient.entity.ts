import { ApiProperty } from '@nestjs/swagger';

export class Patient {
  @ApiProperty({ example: 1, description: 'Patient ID' })
  id: number;

  @ApiProperty({ example: 'John Doe', description: 'Patient name' })
  name: string;

  @ApiProperty({ example: 45, description: 'Patient age' })
  age: number;

  @ApiProperty({ example: 'Male', description: 'Patient gender' })
  gender: string;

  @ApiProperty({ example: 'A+', description: 'Patient blood type' })
  bloodType: string;

  @ApiProperty({ example: '2023-01-01', description: 'Patient diagnosis date' })
  diagnosisDate: string;

  @ApiProperty({
    example: '+1234567890',
    description: 'Patient contact number',
  })
  contactNumber: string;

  @ApiProperty({
    example: 'End-Stage Renal Disease',
    description: 'Patient diagnosis',
  })
  diagnosis: string;

  @ApiProperty({ example: 156, description: 'Total number of sessions' })
  totalSessions: number;

  @ApiProperty({ example: '2023-01-15', description: 'First session date' })
  firstSession: string;

  @ApiProperty({ example: '2024-01-15', description: 'Last session date' })
  lastSession: string;

  @ApiProperty({ example: '3x per week', description: 'Treatment frequency' })
  frequency: string;
}
