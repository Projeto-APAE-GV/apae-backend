import { Module } from '@nestjs/common';
import { AssistidosService } from './assistidos.service';
import { AssistidosController } from './assistidos.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [AssistidosService],
  controllers: [AssistidosController],
})
export class AssistidosModule {}