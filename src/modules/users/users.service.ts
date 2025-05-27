import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto | any) {
    const existingUser = await this.findByEmail(createUserDto.email);
    if (existingUser) {
      throw new ConflictException('Email already associated with an account');
    }

    return this.prisma.user.create({
      data: createUserDto,
    });
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async findById(id: number) {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  async findDefaultUserRole() {
    const defaultRole = await this.prisma.userRole.findUnique({
      where: { name: 'user' },
    });

    if (!defaultRole) {
      throw new NotFoundException('Default user role not found');
    }

    return defaultRole;
  }

  async findNephrologistRole() {
    const nephrologistRole = await this.prisma.userRole.findUnique({
      where: { name: 'nephrologist' },
    });

    if (!nephrologistRole) {
      throw new NotFoundException('Nephrologist role not found');
    }

    return nephrologistRole;
  }
}
