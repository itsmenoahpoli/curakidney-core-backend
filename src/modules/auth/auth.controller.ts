import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { RequestOtpCodeDto, VerifyOtpCodeDto } from './dto/otp.dto';
import { SendWelcomeEmailDto } from './dto/send-welcome-email.dto';
import { VerifyDoctorDto } from './dto/verify-doctor.dto';
import { RegisterNephrologistDto } from './dto/register-nephrologist.dto';
import { DoctorsService } from '../doctors/doctors.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly doctorsService: DoctorsService,
  ) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'User login' })
  @ApiBody({ type: LoginDto })
  @ApiResponse({ status: 200, description: 'User successfully logged in' })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('register')
  @ApiOperation({ summary: 'User registration' })
  @ApiBody({ type: RegisterDto })
  @ApiResponse({ status: 201, description: 'User successfully registered' })
  @ApiResponse({
    status: 409,
    description: 'Email already associated with an account',
  })
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('nephrologist/register')
  @ApiOperation({ summary: 'Register new nephrologist' })
  @ApiBody({ type: RegisterNephrologistDto })
  @ApiResponse({
    status: 201,
    description: 'Nephrologist successfully registered',
  })
  @ApiResponse({
    status: 409,
    description: 'Email already associated with an account',
  })
  registerNephrologist(@Body() registerDto: RegisterNephrologistDto) {
    return this.authService.registerNephrologist(registerDto);
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Refresh access token' })
  @ApiBody({ type: RefreshTokenDto })
  @ApiResponse({ status: 200, description: 'Tokens successfully refreshed' })
  @ApiResponse({ status: 401, description: 'Invalid refresh token' })
  refreshTokens(@Body() refreshTokenDto: RefreshTokenDto) {
    return this.authService.refreshTokens(refreshTokenDto.refresh_token);
  }

  @Post('otp/request')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Request OTP code' })
  @ApiBody({ type: RequestOtpCodeDto })
  @ApiResponse({ status: 200, description: 'Code sent successfully' })
  @ApiResponse({ status: 401, description: 'Invalid email' })
  requestOtpCode(@Body() dto: RequestOtpCodeDto) {
    return this.authService.requestOtpCode(dto);
  }

  @Post('otp/verify')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Verify OTP code' })
  @ApiBody({ type: VerifyOtpCodeDto })
  @ApiResponse({ status: 200, description: 'Code verified successfully' })
  @ApiResponse({ status: 401, description: 'Invalid code' })
  verifyOtpCode(@Body() dto: VerifyOtpCodeDto) {
    return this.authService.verifyOtpCode(dto);
  }

  @Post('nephrologist/welcome-email')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Send welcome email to nephrologist' })
  @ApiBody({ type: SendWelcomeEmailDto })
  @ApiResponse({ status: 200, description: 'Welcome email sent successfully' })
  @ApiResponse({
    status: 401,
    description: 'User not found or is not a nephrologist',
  })
  async sendWelcomeNephrologistEmail(@Body() dto: SendWelcomeEmailDto) {
    return this.authService.sendWelcomeNephrologistEmail(dto.email);
  }

  @Post('/nephrologist/verify-credentials')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Verify doctor credentials' })
  @ApiBody({ type: VerifyDoctorDto })
  @ApiResponse({
    status: 200,
    description: 'Doctor credentials verified successfully',
  })
  @ApiResponse({ status: 400, description: 'Invalid credentials' })
  verifyDoctor(@Body() verifyDoctorDto: VerifyDoctorDto) {
    return this.doctorsService.verifyDoctor({
      lastName: verifyDoctorDto.last_name,
      PRCNumber: verifyDoctorDto.prc_license_number,
      TIN: verifyDoctorDto.tin_number,
    });
  }
}
