import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAssistidoDto } from './dto/create-assistido.dto';
import { UpdateAssistidoDto } from './dto/update-assistido.dto';

@Injectable()
export class AssistidosService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateAssistidoDto) {
    const prismaData = {
      ...data,
      data_nascimento: data.data_nascimento ? new Date(data.data_nascimento) : undefined,
    };
    return this.prisma.assistidos.create({ data: prismaData });
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
    const prismaData = {
      ...data,
      data_nascimento: data.data_nascimento ? new Date(data.data_nascimento) : undefined,
    };
    return this.prisma.assistidos.update({
      where: { id_assistido: id },
      data: prismaData,
    });
  }

  remove(id: number) {
    return this.prisma.assistidos.delete({
      where: { id_assistido: id },
    });
  }
}