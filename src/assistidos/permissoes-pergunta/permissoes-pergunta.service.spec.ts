import { Test, TestingModule } from '@nestjs/testing';
import { PermissoesPerguntaService } from './permissoes-pergunta.service';

describe('PermissoesPerguntaService', () => {
  let service: PermissoesPerguntaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PermissoesPerguntaService],
    }).compile();

    service = module.get<PermissoesPerguntaService>(PermissoesPerguntaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
