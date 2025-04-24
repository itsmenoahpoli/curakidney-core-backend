import { Injectable, NotFoundException } from '@nestjs/common';
import {
  patientTreatments,
  PatientTreatment,
} from '@/mock-data/patient-treatments.mock';

@Injectable()
export class PatientTreatmentsService {
  findAll(): PatientTreatment[] {
    return patientTreatments;
  }

  findOne(id: number): PatientTreatment {
    const treatment = patientTreatments.find((t) => t.id === id);

    if (!treatment) {
      throw new NotFoundException('Patient treatment not found');
    }

    return treatment;
  }
}
