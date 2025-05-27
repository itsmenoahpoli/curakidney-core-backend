import { Controller, Get, Post, Param, UseGuards, Query } from '@nestjs/common';
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
  getPatientsMasterListWithPrcNumber(
    @Param('prcNumber') prcNumber: string,
  ): Promise<MedipadPatient[]> {
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
    @Query('month') month: number = 0,
    @Query('year') year: number = new Date().getFullYear(),
  ): Promise<MedipadPatientTreatmentOverview[]> {
    return this.medipadService.getPatientTreatmentOverview(prcNumber, month, year);
  }

  @Post('/get-patient-treatment-overview-all-months/:prcNumber')
  @ApiOperation({ summary: 'Get patient treatments overview list for all months of current year' })
  @ApiResponse({
    status: 200,
    description: 'Return patient treatments overview list for all months of current year',
    type: MedipadPatientTreatmentOverview,
    isArray: true,
  })
  @ApiResponse({ status: 401, description: 'Unauthenticated' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  getPatientTreatmentOverviewAllMonths(
    @Param('prcNumber') prcNumber: string,
  ): Promise<MedipadPatientTreatmentOverview[]> {
    return this.medipadService.getPatientTreatmentOverviewAllMonths(
      prcNumber,
      new Date().getFullYear(),
    );
  }

  @Post('/get-patient-treatments/:prcNumber')
  @ApiOperation({ summary: 'Get list of patients with their treatments conducted' })
  @ApiResponse({
    status: 200,
    description: 'Return list of patients with their treatments',
    isArray: true,
  })
  @ApiResponse({ status: 401, description: 'Unauthenticated' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  getPatientTreatments(
    @Param('prcNumber') prcNumber: string,
    @Query('month') month: number = 0,
    @Query('year') year: number = new Date().getFullYear(),
    @Query('pageIndex') pageIndex: number = 0,
    @Query('pageTotalRecords') pageTotalRecords: number = 10,
    @Query('sortField')
    sortField: 'patientname' | 'lasttreatmentdate' | 'nooftreatments' = 'patientname',
    @Query('sortType') sortType: 'asc' | 'desc' = 'asc',
  ) {
    return this.medipadService.getPatientTreatments(
      prcNumber,
      month,
      year,
      pageIndex,
      pageTotalRecords,
      sortField,
      sortType,
    );
  }

  @Post('/get-treatments/:prcNumber')
  @ApiOperation({ summary: 'Get list of treatments conducted per month/year' })
  @ApiResponse({
    status: 200,
    description: 'Return list of treatments conducted',
    isArray: true,
  })
  @ApiResponse({ status: 401, description: 'Unauthenticated' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  getTreatments(
    @Param('prcNumber') prcNumber: string,
    @Query('month') month: number = 0,
    @Query('year') year: number = new Date().getFullYear(),
    @Query('pageIndex') pageIndex: number = 0,
    @Query('pageTotalRecords') pageTotalRecords: number = 10,
    @Query('sortField')
    sortField: 'patientname' | 'lasttreatmentdate' | 'nooftreatments' = 'patientname',
    @Query('sortType') sortType: 'asc' | 'desc' = 'asc',
  ) {
    return this.medipadService.getTreatments(
      prcNumber,
      month,
      year,
      pageIndex,
      pageTotalRecords,
      sortField,
      sortType,
    );
  }

  @Post('/get-treatment-link/:prcNumber')
  @ApiOperation({
    summary: 'Get encrypted link to generate Treatment Sheet (valid for 20 seconds)',
  })
  @ApiResponse({
    status: 200,
    description: 'Return encrypted treatment sheet link',
  })
  @ApiResponse({ status: 401, description: 'Unauthenticated' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  getTreatmentLink(
    @Param('prcNumber') prcNumber: string,
    @Query('treatmentOrderId') treatmentOrderId: number,
    @Query('patientId') patientId: number,
  ) {
    return this.medipadService.getTreatmentLink(prcNumber, treatmentOrderId, patientId);
  }

  @Post('/get-patient-health-details/:prcNumber')
  @ApiOperation({ summary: 'Get health details of the patient' })
  @ApiResponse({
    status: 200,
    description: 'Return patient health details',
  })
  @ApiResponse({ status: 401, description: 'Unauthenticated' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  getPatientHealthDetails(
    @Param('prcNumber') prcNumber: string,
    @Query('patientId') patientId: string,
    @Query('conversion') conversion: 'CO' | 'SI' = 'CO',
  ) {
    return this.medipadService.getPatientHealthDetails(prcNumber, patientId, conversion);
  }
}
