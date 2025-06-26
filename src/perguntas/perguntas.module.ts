import { Module } from '@nestjs/common';
import { PerguntasService } from './perguntas.service';
import { PerguntasController } from './perguntas.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [PerguntasController],
  providers: [PerguntasService, PrismaService],
  exports: [PerguntasService],
})
export class PerguntasModule {}