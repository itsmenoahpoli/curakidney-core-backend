import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { PatientsService } from './patients.service';
import { Patient } from './entities/patient.entity';

@ApiTags('patients')
@ApiBearerAuth('bearer')
@Controller('patients')
@UseGuards(JwtAuthGuard)
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all patients' })
  @ApiResponse({
    status: 200,
    description: 'Return all patients',
    type: Patient,
    isArray: true,
  })
  findAll(): Patient[] {
    return this.patientsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a patient by id' })
  @ApiResponse({
    status: 200,
    description: 'Return a patient by id',
    type: Patient,
  })
  findOne(@Param('id') id: string): Patient {
    return this.patientsService.findOne(+id);
  }
}
