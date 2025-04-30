import { Injectable, NotFoundException } from '@nestjs/common';
import { Doctor } from './entities/doctor.entity';

@Injectable()
export class DoctorsService {
  private readonly mockDoctors: Doctor[] = [
    {
      id: 1,
      name: 'Dr. Patrick Policarpio',
      email: 'patrickpolicarpio08@gmail.com',
    },
    {
      id: 2,
      name: 'Dr. Anurag Verma',
      email: 'anurag.verma@curakidney.com',
    },
  ];

  async findAll(): Promise<Doctor[]> {
    return this.mockDoctors;
  }

  async findOne(id: number): Promise<Doctor> {
    const doctor = this.mockDoctors.find((d) => d.id === id);

    if (!doctor) {
      throw new NotFoundException('Doctor not found');
    }

    return doctor;
  }
}
