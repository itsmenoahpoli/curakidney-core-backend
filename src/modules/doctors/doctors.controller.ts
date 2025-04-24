import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
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
  findAll(): Doctor[] {
    return this.doctorsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a doctor by id' })
  @ApiResponse({
    status: 200,
    description: 'Return a doctor by id',
    type: Doctor,
  })
  findOne(@Param('id') id: string): Doctor {
    return this.doctorsService.findOne(+id);
  }
}
