import { ApiProperty } from '@nestjs/swagger';

export class Doctor {
  @ApiProperty({ example: 1, description: 'Doctor ID' })
  id: number;

  @ApiProperty({ example: 'Dr. Sarah Wilson', description: 'Doctor name' })
  name: string;

  @ApiProperty({
    example: 'sarah.wilson@hospital.com',
    description: 'Email address',
  })
  email: string;
}
