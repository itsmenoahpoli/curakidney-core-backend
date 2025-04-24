import { Injectable, NotFoundException } from '@nestjs/common';
import { patients, Patient } from '@/mock-data/patients.mock';

@Injectable()
export class PatientsService {
  findAll(): Patient[] {
    return patients;
  }

  findOne(id: number): Patient {
    const patient = patients.find((p) => p.id === id);

    if (!patient) {
      throw new NotFoundException('Patient not found');
    }

    return patient;
  }
}
