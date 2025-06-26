import { Module } from '@nestjs/common';
import { AssistidosService } from './assistidos.service';
import { AssistidosController } from './assistidos.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { PerguntasModule } from '../perguntas/perguntas.module';
import { PermissoesPerguntaModule } from './permissoes-pergunta/permissoes-pergunta.module';

@Module({
  imports: [PrismaModule, PerguntasModule, PermissoesPerguntaModule],
  providers: [AssistidosService],
  controllers: [AssistidosController],
})
export class AssistidosModule {}