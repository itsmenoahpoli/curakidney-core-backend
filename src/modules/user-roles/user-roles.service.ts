import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { CreateUserRoleDto } from './dto/create-user-role.dto';
import { UpdateUserRoleDto } from './dto/update-user-role.dto';

@Injectable()
export class UserRolesService {
  constructor(private prisma: PrismaService) {}

  async create(createUserRoleDto: CreateUserRoleDto) {
    const existingRole = await this.prisma.userRole.findUnique({
      where: { name: createUserRoleDto.name },
    });

    if (existingRole) {
      throw new ConflictException('User role already exists');
    }

    return this.prisma.userRole.create({
      data: createUserRoleDto,
    });
  }

  async findAll() {
    return this.prisma.userRole.findMany();
  }

  async findOne(id: number) {
    const userRole = await this.prisma.userRole.findUnique({
      where: { id },
      include: { users: true },
    });

    if (!userRole) {
      throw new NotFoundException('User role not found');
    }

    return userRole;
  }

  async update(id: number, updateUserRoleDto: UpdateUserRoleDto) {
    const userRole = await this.prisma.userRole.findUnique({
      where: { id },
    });

    if (!userRole) {
      throw new NotFoundException('User role not found');
    }

    return this.prisma.userRole.update({
      where: { id },
      data: updateUserRoleDto,
    });
  }

  async remove(id: number) {
    const userRole = await this.prisma.userRole.findUnique({
      where: { id },
      include: { users: true },
    });

    if (!userRole) {
      throw new NotFoundException('User role not found');
    }

    if (userRole.users.length > 0) {
      throw new ConflictException('Cannot delete role with assigned users');
    }

    return this.prisma.userRole.delete({
      where: { id },
    });
  }
}
