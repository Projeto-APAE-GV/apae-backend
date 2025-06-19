// src/assistidos/assistidos.service.ts

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAssistidoDto } from './dto/create-assistido.dto';
import { UpdateAssistidoDto } from './dto/update-assistido.dto';
import { assistidos } from '@prisma/client';

@Injectable()
export class AssistidosService {
  constructor(private prisma: PrismaService) {}

  // Cria um novo assistido
  create(data: CreateAssistidoDto) {
    return this.prisma.assistidos.create({ data });
  }

  // Retorna todos os assistidos
  findAll() {
    return this.prisma.assistidos.findMany();
  }

  // Retorna um assistido por ID
  findOne(id: number) {
    return this.prisma.assistidos.findUnique({
      where: { id_assistido: id },
    });
  }

  // Atualiza um assistido
  update(id: number, data: UpdateAssistidoDto) {
    return this.prisma.assistidos.update({
      where: { id_assistido: id },
      data,
    });
  }

  // Deleta (hard delete) um assistido
  remove(id: number) {
    return this.prisma.assistidos.delete({
      where: { id_assistido: id },
    });
  }
}