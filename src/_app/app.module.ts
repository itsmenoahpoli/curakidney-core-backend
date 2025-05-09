import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from '@/modules/auth/auth.module';
import { UsersModule } from '@/modules/users/users.module';
import { UserRolesModule } from '@/modules/user-roles/user-roles.module';
import { PrismaModule } from '@/prisma/prisma.module';
import { PatientsModule } from '@/modules/patients/patients.module';
import { PatientTreatmentsModule } from '@/modules/patient-treatments/patient-treatments.module';
import { DoctorsModule } from '@/modules/doctors/doctors.module';
import { MedipadModule } from '@/modules/external-data/medipad/medipad.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    PrismaModule,
    AuthModule,
    UsersModule,
    UserRolesModule,
    PatientsModule,
    PatientTreatmentsModule,
    DoctorsModule,
    MedipadModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
