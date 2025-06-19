import { Test, TestingModule } from '@nestjs/testing';
import { AssistidosController } from './assistidos.controller';

describe('AssistidosController', () => {
  let controller: AssistidosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AssistidosController],
    }).compile();

    controller = module.get<AssistidosController>(AssistidosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
