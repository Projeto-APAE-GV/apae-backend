import { Module } from '@nestjs/common';
import { AssistidosService } from './assistidos.service';
import { AssistidosController } from './assistidos.controller';
import { CategoriasModule } from '../categorias/categorias.module';
import { PermissoesPerguntaModule } from './permissoes-pergunta/permissoes-pergunta.module';
import { PerguntasModule } from './dto/perguntas/perguntas.module';

@Module({
  providers: [AssistidosService],
  controllers: [AssistidosController],
  imports: [CategoriasModule, PerguntasModule, PermissoesPerguntaModule]
})
export class AssistidosModule {}
