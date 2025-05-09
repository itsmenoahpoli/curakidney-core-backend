import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import { MedipadService } from './medipad.service';
import { MedipadAuthKey } from './entities/medipad.entity';

@ApiTags('medipad-external-data')
@ApiBearerAuth('bearer')
@Controller('medipad-external-data')
@UseGuards(JwtAuthGuard)
export class MedipadController {
  constructor(private readonly medipadService: MedipadService) {}

  @Get()
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

  @Post()
  @ApiOperation({ summary: 'Get medipad authentication key' })
  @ApiResponse({
    status: 200,
    description: 'Return medipad authentication key',
    type: MedipadAuthKey,
    isArray: false,
  })
  @ApiResponse({ status: 401, description: 'Invalid authentication' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  getPatientTreatmentOverviews(): any {
    return this.medipadService.getAuthenticationKey();
  }
}
