import { IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserRoleDto {
  @ApiProperty({ example: 'admin', description: 'The name of the user role' })
  @IsString()
  name: string;

  @ApiProperty({
    example: 'Administrator role',
    description: 'Role description',
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;
}
