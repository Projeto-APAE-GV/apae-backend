import { Module } from '@nestjs/common';
import { PerguntasService } from './perguntas.service';
import { PerguntasController } from './perguntas.controller';

@Module({
  providers: [PerguntasService],
  controllers: [PerguntasController]
})
export class PerguntasModule {}
