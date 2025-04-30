import { Module } from '@nestjs/common';
import { PatientTreatmentsService } from './patient-treatments.service';
import { PatientTreatmentsController } from './patient-treatments.controller';
import { EmailModule } from '../email/email.module';

@Module({
  imports: [EmailModule],
  controllers: [PatientTreatmentsController],
  providers: [PatientTreatmentsService],
  exports: [PatientTreatmentsService],
})
export class PatientTreatmentsModule {}
