import { Test, TestingModule } from '@nestjs/testing';
import { MedipadService } from './medipad.service';

describe('MedipadService', () => {
  let service: MedipadService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MedipadService],
    }).compile();

    service = module.get<MedipadService>(MedipadService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
