import { Module } from '@nestjs/common';
import { RespostasService } from './respostas.service';
import { RespostasController } from './respostas.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [RespostasController],
  providers: [RespostasService],
  exports: [RespostasService],
})
export class RespostasModule {}