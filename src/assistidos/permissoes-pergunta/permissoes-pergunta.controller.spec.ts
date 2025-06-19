import { Test, TestingModule } from '@nestjs/testing';
import { PermissoesPerguntaController } from './permissoes-pergunta.controller';

describe('PermissoesPerguntaController', () => {
  let controller: PermissoesPerguntaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PermissoesPerguntaController],
    }).compile();

    controller = module.get<PermissoesPerguntaController>(PermissoesPerguntaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
