import { Module } from '@nestjs/common';
import { RespostasService } from './respostas.service';
import { RespostasController } from './respostas.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { HistoricoRespostasService } from './historico-respostas.service';
import { HistoricoRespostasController } from './historico-respostas.controller';

@Module({
  imports: [PrismaModule],
  controllers: [RespostasController, HistoricoRespostasController],
  providers: [RespostasService, HistoricoRespostasService],
  exports: [RespostasService, HistoricoRespostasService],
})
export class RespostasModule {}