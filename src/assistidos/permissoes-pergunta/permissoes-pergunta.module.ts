import { Module } from '@nestjs/common';
import { PermissoesPerguntaService } from './permissoes-pergunta.service';
import { PermissoesPerguntaController } from './permissoes-pergunta.controller';

@Module({
  providers: [PermissoesPerguntaService],
  controllers: [PermissoesPerguntaController]
})
export class PermissoesPerguntaModule {}
