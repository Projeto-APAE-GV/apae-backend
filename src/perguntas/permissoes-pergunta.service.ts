import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePermissaoPerguntaDto } from './dto/create-permissao-pergunta.dto';
import { UpdatePermissaoPerguntaDto } from './dto/update-permissao-pergunta.dto';

@Injectable()
export class PermissoesPerguntaService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.permissoes_pergunta.findMany();
  }

  async create(dto: CreatePermissaoPerguntaDto) {
    try {
      return await this.prisma.permissoes_pergunta.create({ data: dto });
    } catch (error) {
      if (error.code === 'P2002') {
        throw new BadRequestException('Permissão já existe para esse tipo de usuário nesta pergunta');
      }
      throw error;
    }
  }

  async update(id: number, dto: UpdatePermissaoPerguntaDto) {
    try {
      return await this.prisma.permissoes_pergunta.update({
        where: { id_permissao: id },
        data: dto,
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException('Permissão não encontrada');
      }
      throw error;
    }
  }

  async remove(id: number) {
    try {
      await this.prisma.permissoes_pergunta.delete({ where: { id_permissao: id } });
      return { message: 'Permissão removida com sucesso' };
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException('Permissão não encontrada');
      }
      throw error;
    }
  }
}