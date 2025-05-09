import { Test, TestingModule } from '@nestjs/testing';
import { MedipadController } from './medipad.controller';

describe('MedipadController', () => {
  let controller: MedipadController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MedipadController],
    }).compile();

    controller = module.get<MedipadController>(MedipadController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
