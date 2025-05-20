import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { Doctor } from './entities/doctor.entity';
import { MedipadService } from '../external-data/medipad/medipad.service';
import { VerifyDoctorDto } from './dto/verify-doctor.dto';

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

  async verifyDoctor(verifyDoctorDto: VerifyDoctorDto): Promise<Doctor> {
    const doctor = await this.findOne(verifyDoctorDto.PRCNumber);

    const doctorLastName = doctor.PhysicianName.split(' ').pop()?.toUpperCase();
    const providedLastName = verifyDoctorDto.lastName.toUpperCase();

    if (doctorLastName !== providedLastName || doctor.TIN !== verifyDoctorDto.TIN) {
      throw new BadRequestException('Doctor verification failed');
    }

    return doctor;
  }
}
