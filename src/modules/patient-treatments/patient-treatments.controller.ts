import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { PatientTreatmentsService } from './patient-treatments.service';
import { PatientTreatment } from './entities/patient-treatment.entity';

@ApiTags('patient-treatments')
@ApiBearerAuth('bearer')
@Controller('patient-treatments')
@UseGuards(JwtAuthGuard)
export class PatientTreatmentsController {
  constructor(
    private readonly patientTreatmentsService: PatientTreatmentsService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get all patient treatments' })
  @ApiResponse({
    status: 200,
    description: 'Return all patient treatments',
    type: PatientTreatment,
    isArray: true,
  })
  findAll(): PatientTreatment[] {
    return this.patientTreatmentsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a patient treatment by id' })
  @ApiResponse({
    status: 200,
    description: 'Return a patient treatment by id',
    type: PatientTreatment,
  })
  findOne(@Param('id') id: string): PatientTreatment {
    return this.patientTreatmentsService.findOne(+id);
  }
}
