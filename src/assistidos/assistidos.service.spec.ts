import { Test, TestingModule } from '@nestjs/testing';
import { AssistidosService } from './assistidos.service';

describe('AssistidosService', () => {
  let service: AssistidosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AssistidosService],
    }).compile();

    service = module.get<AssistidosService>(AssistidosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
