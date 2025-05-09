import { Controller, Get, Post, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import { MedipadService } from './medipad.service';
import {
  MedipadAuthKey,
  MedipadPatient,
  MedipadDoctor,
  MedipadPatientTreatmentOverview,
} from './entities/medipad.entity';

@ApiTags('medipad-external-data')
@ApiBearerAuth('bearer')
@Controller('medipad-external-data')
@UseGuards(JwtAuthGuard)
export class MedipadController {
  constructor(private readonly medipadService: MedipadService) {}

  @Get('/get-authenticationkey')
  @ApiOperation({ summary: 'Get medipad authentication key' })
  @ApiResponse({
    status: 200,
    description: 'Return medipad authentication key',
    type: MedipadAuthKey,
    isArray: false,
  })
  @ApiResponse({ status: 401, description: 'Invalid authentication' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  getAuthenticationKey(): Promise<MedipadAuthKey> {
    return this.medipadService.getAuthenticationKey();
  }

  @Post('/get-patients-master-list/:prcNumber')
  @ApiOperation({ summary: 'Get medipad patient master list' })
  @ApiResponse({
    status: 200,
    description: 'Return medipad patients master list',
    type: MedipadPatient,
    isArray: true,
  })
  @ApiResponse({ status: 401, description: 'Unauthenticated' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  getPatientsMasterList(@Param('prcNumber') prcNumber: string): Promise<MedipadPatient[]> {
    return this.medipadService.getPatientsMasterList(prcNumber);
  }

  @Post('/get-doctors-master-list')
  @ApiOperation({ summary: 'Get medipad doctor master list' })
  @ApiResponse({
    status: 200,
    description: 'Return medipad doctors master list',
    type: MedipadDoctor,
    isArray: true,
  })
  @ApiResponse({ status: 401, description: 'Unauthenticated' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  getDoctorsMasterList(): Promise<MedipadDoctor[]> {
    return this.medipadService.getDoctorsMasterList();
  }

  @Post('/get-patient-treatment-overview/:prcNumber')
  @ApiOperation({ summary: 'Get patient treatments overview list' })
  @ApiResponse({
    status: 200,
    description: 'Return patient treatments overview list',
    type: MedipadPatientTreatmentOverview,
    isArray: true,
  })
  @ApiResponse({ status: 401, description: 'Unauthenticated' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  getPatientTreatmentOverview(
    @Param('prcNumber') prcNumber: string,
  ): Promise<MedipadPatientTreatmentOverview[]> {
    return this.medipadService.getPatientTreatmentOverview(prcNumber);
  }
}
