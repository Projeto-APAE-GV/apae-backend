import { Module } from '@nestjs/common';
import { PerguntasService } from './perguntas.service';
import { PerguntasController } from './perguntas.controller';
import { PrismaService } from '../prisma/prisma.service';
import { PermissoesPerguntaService } from './permissoes-pergunta.service';
import { PermissoesPerguntaController } from './permissoes-pergunta.controller';

@Module({
  controllers: [PerguntasController, PermissoesPerguntaController],
  providers: [PerguntasService, PrismaService, PermissoesPerguntaService],
  exports: [PerguntasService, PermissoesPerguntaService],
})
export class PerguntasModule {} 