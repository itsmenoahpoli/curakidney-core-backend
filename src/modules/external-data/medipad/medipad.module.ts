import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { MedipadController } from './medipad.controller';
import { MedipadService } from './medipad.service';
import { MedipadHttpClient } from './medipad.api';

@Module({
  controllers: [MedipadController],
  providers: [MedipadService, MedipadHttpClient],
  exports: [MedipadService],
  imports: [HttpModule],
})
export class MedipadModule {}
