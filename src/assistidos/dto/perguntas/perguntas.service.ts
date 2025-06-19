import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreatePerguntaDto } from './dto/create-pergunta.dto';
import { UpdatePerguntaDto } from './dto/update-pergunta.dto';

@Injectable()
export class PerguntasService {
  constructor(private prisma: PrismaService) {}

  // Cria nova pergunta
  create(data: CreatePerguntaDto) {
    return this.prisma.perguntas.create({ data });
  }

  // Lista todas as perguntas
  findAll() {
    return this.prisma.perguntas.findMany();
  }

  // Busca uma pergunta por ID
  findOne(id: number) {
    return this.prisma.perguntas.findUnique({
      where: { id_pergunta: id },
    });
  }

  // Atualiza pergunta
  update(id: number, data: UpdatePerguntaDto) {
    return this.prisma.perguntas.update({
      where: { id_pergunta: id },
      data,
    });
  }

  // Exclui pergunta
  remove(id: number) {
    return this.prisma.perguntas.delete({
      where: { id_pergunta: id },
    });
  }
}