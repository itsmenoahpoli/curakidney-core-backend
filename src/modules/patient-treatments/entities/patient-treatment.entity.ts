import { ApiProperty } from '@nestjs/swagger';

export class PatientTreatment {
  @ApiProperty({ example: 1, description: 'Treatment ID' })
  id: number;

  @ApiProperty({ example: 1, description: 'Patient ID' })
  patientId: number;

  @ApiProperty({ example: 1, description: 'Doctor ID' })
  doctorId: number;

  @ApiProperty({ example: 'Hemodialysis', description: 'Type of treatment' })
  treatmentType: string;

  @ApiProperty({ example: '2023-01-20', description: 'Treatment start date' })
  startDate: string;

  @ApiProperty({
    example: null,
    description: 'Treatment end date',
    nullable: true,
  })
  endDate: string | null;

  @ApiProperty({
    example: 'ONGOING',
    description: 'Treatment status',
    enum: ['ONGOING', 'COMPLETED', 'SCHEDULED'],
  })
  status: 'ONGOING' | 'COMPLETED' | 'SCHEDULED';

  @ApiProperty({
    example: 'Three sessions per week',
    description: 'Treatment notes',
  })
  notes: string;
}
