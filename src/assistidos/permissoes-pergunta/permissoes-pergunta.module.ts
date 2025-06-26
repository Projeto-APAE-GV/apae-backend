import { Module } from '@nestjs/common';
import { PerguntasModule } from '../../perguntas/perguntas.module';
import { PermissoesPerguntaService } from './permissoes-pergunta.service';
import { PermissoesPerguntaController } from './permissoes-pergunta.controller';

@Module({
  imports:  [ PerguntasModule ], 
  providers: [ PermissoesPerguntaService ],
  controllers: [ PermissoesPerguntaController ],
  exports:  [ PermissoesPerguntaService ],
})
export class PermissoesPerguntaModule {}