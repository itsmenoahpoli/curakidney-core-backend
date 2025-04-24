import { ApiProperty } from '@nestjs/swagger';

export class Doctor {
  @ApiProperty({ example: 1, description: 'Doctor ID' })
  id: number;

  @ApiProperty({ example: 'Dr. Sarah Wilson', description: 'Doctor name' })
  name: string;

  @ApiProperty({ example: 'Nephrology', description: 'Doctor specialization' })
  specialization: string;

  @ApiProperty({ example: 15, description: 'Years of experience' })
  experience: number;

  @ApiProperty({ example: '+1234567893', description: 'Contact number' })
  contactNumber: string;

  @ApiProperty({
    example: 'sarah.wilson@hospital.com',
    description: 'Email address',
  })
  email: string;
}
