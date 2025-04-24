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

  @ApiProperty({ example: '2023-01-15', description: 'Patient diagnosis date' })
  diagnosisDate: string;

  @ApiProperty({
    example: '+1234567890',
    description: 'Patient contact number',
  })
  contactNumber: string;
}
