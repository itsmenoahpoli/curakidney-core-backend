import { Injectable, NotFoundException } from '@nestjs/common';
import { doctors, Doctor } from '@/mock-data/doctors.mock';

@Injectable()
export class DoctorsService {
  findAll(): Doctor[] {
    return doctors;
  }

  findOne(id: number): Doctor {
    const doctor = doctors.find((d) => d.id === id);

    if (!doctor) {
      throw new NotFoundException('Doctor not found');
    }

    return doctor;
  }
}
