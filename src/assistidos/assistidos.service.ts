import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAssistidoDto } from './dto/create-assistido.dto';
import { UpdateAssistidoDto } from './dto/update-assistido.dto';
import { PerguntasService } from 'perguntas/perguntas.service';
import { PermissoesPerguntaService } from './permissoes-pergunta/permissoes-pergunta.service';

@Injectable()
export class AssistidosService {
  constructor(private prisma: PrismaService, private perguntasSvc: PerguntasService, private permPergSvc: PermissoesPerguntaService) {}

  create(data: CreateAssistidoDto) {
    return this.prisma.assistidos.create({ data });
  }

  findAll() {
    return this.prisma.assistidos.findMany();
  }

  findOne(id: number) {
    return this.prisma.assistidos.findUnique({
      where: { id_assistido: id },
    });
  }

  update(id: number, data: UpdateAssistidoDto) {
    return this.prisma.assistidos.update({
      where: { id_assistido: id },
      data,
    });
  }

  remove(id: number) {
    return this.prisma.assistidos.delete({
      where: { id_assistido: id },
    });
  }
}