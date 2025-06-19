import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreatePermissaoPerguntaDto } from './dto/create-permissoes.dto';
import { UpdatePermissaoPerguntaDto } from './dto/update-permissoes.dto';

@Injectable()
export class PermissoesPerguntaService {
  constructor(private prisma: PrismaService) {}

  // Cria nova permissão
  create(data: CreatePermissaoPerguntaDto) {
    return this.prisma.permissoes_pergunta.create({ data });
  }

  // Lista todas as permissões
  findAll() {
    return this.prisma.permissoes_pergunta.findMany();
  }

  // Busca por ID
  findOne(id: number) {
    return this.prisma.permissoes_pergunta.findUnique({
      where: { id_permissao: id },
    });
  }

  // Atualiza permissão
  update(id: number, data: UpdatePermissaoPerguntaDto) {
    return this.prisma.permissoes_pergunta.update({
      where: { id_permissao: id },
      data,
    });
  }

  // Remove permissão
  remove(id: number) {
    return this.prisma.permissoes_pergunta.delete({
      where: { id_permissao: id },
    });
  }
}