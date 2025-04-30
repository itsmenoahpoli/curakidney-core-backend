import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '@/modules/users/users.service';
import { EmailService } from '@/modules/email/email.service';
import { PrismaService } from '@/prisma/prisma.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { RequestOtpCodeDto, VerifyOtpCodeDto } from './dto/otp.dto';
import { VerifyDoctorDto } from './dto/verify-doctor.dto';
import { RegisterNephrologistDto } from './dto/register-nephrologist.dto';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly emailService: EmailService,
    private readonly prisma: PrismaService,
  ) {}

  private generateTokens(payload: { sub: number; email: string }) {
    const accessToken = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_SECRET'),
      expiresIn: this.configService.get<string>('JWT_EXPIRATION', '15m'),
    });

    const refreshToken = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_SECRET'),
      expiresIn: this.configService.get<string>('JWT_REFRESH_EXPIRATION', '7d'),
    });

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  async login(loginDto: LoginDto) {
    const user = await this.usersService.findByEmail(loginDto.email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(
      loginDto.password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Fetch user with role information
    const userWithRole = await this.prisma.user.findUnique({
      where: { id: user.id },
      include: {
        userRole: true,
      },
    });

    const payload = { sub: user.id, email: user.email };
    const tokens = this.generateTokens(payload);

    return {
      ...tokens,
      user: {
        id: userWithRole.id,
        email: userWithRole.email,
        name: userWithRole.name,
        role: {
          id: userWithRole.userRole.id,
          name: userWithRole.userRole.name,
        },
      },
    };
  }

  async register(registerDto: RegisterDto) {
    const hashedPassword = await bcrypt.hash(registerDto.password, 10);
    const defaultRole = await this.usersService.findDefaultUserRole();

    const user = await this.usersService.create({
      ...registerDto,
      password: hashedPassword,
      userRoleId: defaultRole.id,
    });

    const payload = { sub: user.id, email: user.email };
    const tokens = this.generateTokens(payload);

    return {
      ...tokens,
      user: {
        id: user.id,
        email: user.email,
      },
    };
  }

  async registerNephrologist(registerDto: RegisterNephrologistDto) {
    const hashedPassword = await bcrypt.hash(registerDto.password, 10);

    // Find nephrologist role
    const nephrologistRole = await this.prisma.userRole.findUnique({
      where: { name: 'nephrologist' },
    });

    if (!nephrologistRole) {
      throw new NotFoundException('Nephrologist role not found');
    }

    const user = await this.usersService.create({
      email: registerDto.email,
      password: hashedPassword,
      name: registerDto.name,
      userRoleId: nephrologistRole.id,
      tinNumber: registerDto.tinNumber,
      prcLicense: registerDto.prcLicenseNumber,
    });

    const payload = { sub: user.id, email: user.email };
    const tokens = this.generateTokens(payload);

    // Send account created email
    await this.emailService.sendAccountCreatedNephrologistEmail(
      user.email,
      user.name,
    );

    return {
      ...tokens,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: {
          id: nephrologistRole.id,
          name: nephrologistRole.name,
        },
      },
    };
  }

  async sendWelcomeNephrologistEmail(email: string) {
    await this.emailService.sendWelcomeDoctorEmail(email, 'Doctor');

    return { message: 'Welcome email sent successfully' };
  }

  async refreshTokens(refreshToken: string) {
    try {
      const payload = this.jwtService.verify(refreshToken, {
        secret: this.configService.get<string>('JWT_SECRET'),
      });

      const user = await this.usersService.findById(payload.sub);
      if (!user) {
        throw new UnauthorizedException('Invalid refresh token');
      }

      const newPayload = { sub: user.id, email: user.email };
      return this.generateTokens(newPayload);
    } catch {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  private generateOtpCode(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  async requestOtpCode(dto: RequestOtpCodeDto) {
    const user = await this.usersService.findByEmail(dto.email);
    if (!user) {
      throw new UnauthorizedException('Invalid email');
    }

    const code = this.generateOtpCode();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    await this.prisma.otpCode.create({
      data: {
        code,
        userId: user.id,
        expiresAt,
      },
    });

    await this.emailService.sendOtpCode(user.email, code);

    return { message: 'Verification code sent to your email' };
  }

  async verifyOtpCode(dto: VerifyOtpCodeDto) {
    const user = await this.usersService.findByEmail(dto.email);
    if (!user) {
      throw new UnauthorizedException('Invalid email');
    }

    const otpCode = await this.prisma.otpCode.findFirst({
      where: {
        userId: user.id,
        code: dto.code,
        expiresAt: {
          gt: new Date(),
        },
        used: false,
      },
    });

    if (!otpCode) {
      throw new UnauthorizedException('Invalid or expired code');
    }

    await this.prisma.otpCode.update({
      where: { id: otpCode.id },
      data: { used: true },
    });

    const payload = { sub: user.id, email: user.email };
    return this.generateTokens(payload);
  }

  async verifyDoctor(verifyDoctorDto: VerifyDoctorDto) {
    const { last_name, tin_number, prc_license_number } = verifyDoctorDto;

    if (
      last_name.toLowerCase() === 'policarpio' &&
      tin_number === '123456' &&
      prc_license_number === '123456'
    ) {
      return {
        is_verified: true,
      };
    }

    return { is_verified: false };
  }
}
