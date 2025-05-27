import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { DoctorsService } from './doctors.service';
import { Doctor } from './entities/doctor.entity';

@ApiTags('doctors')
@ApiBearerAuth('bearer')
@Controller('doctors')
@UseGuards(JwtAuthGuard)
export class DoctorsController {
  constructor(private readonly doctorsService: DoctorsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all doctors' })
  @ApiResponse({
    status: 200,
    description: 'Return all doctors',
    type: Doctor,
    isArray: true,
  })
  async findAll(): Promise<Doctor[]> {
    return this.doctorsService.findAll();
  }

  @Get(':prcNumber')
  @ApiOperation({ summary: 'Get a doctor by PRC number' })
  @ApiResponse({
    status: 200,
    description: 'Return a doctor by PRC number',
    type: Doctor,
  })
  async findOne(@Param('prcNumber') prcNumber: string): Promise<Doctor> {
    return this.doctorsService.findOne(prcNumber);
  }
}
