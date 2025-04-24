import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { Doctor } from './entities/doctor.entity';

@Injectable()
export class DoctorsService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Doctor[]> {
    const doctors = await this.prisma.user.findMany({
      where: {
        userRoleId: 2, // nephrologist role ID
      },
      select: {
        id: true,
        name: true,
        email: true,
        // Add other fields you want to expose
      },
    });

    return doctors;
  }

  async findOne(id: number): Promise<Doctor> {
    const doctor = await this.prisma.user.findFirst({
      where: {
        id: id,
        userRoleId: 2, // nephrologist role ID
      },
      select: {
        id: true,
        name: true,
        email: true,
        // Add other fields you want to expose
      },
    });

    if (!doctor) {
      throw new NotFoundException('Doctor not found');
    }

    return doctor;
  }
}
