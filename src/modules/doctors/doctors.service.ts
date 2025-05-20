import { Injectable, NotFoundException } from '@nestjs/common';
import { Doctor } from './entities/doctor.entity';
import { MedipadService } from '../external-data/medipad/medipad.service';

@Injectable()
export class DoctorsService {
  constructor(private readonly medipadService: MedipadService) {}

  async findAll(): Promise<Doctor[]> {
    const medipadDoctors = await this.medipadService.getDoctorsMasterList();
    return medipadDoctors.map((doctor) => ({
      ...doctor,
    }));
  }

  async findOne(PRCNumber: string): Promise<Doctor> {
    const doctors = await this.findAll();
    const doctor = doctors.find((d) => d.PRCNumber === PRCNumber);

    if (!doctor) {
      throw new NotFoundException('Doctor not found');
    }

    return doctor;
  }
}
