import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';

@Injectable()
export class CategoriasService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateCategoriaDto) {
    return this.prisma.categorias.create({ data });
  }

  findAll(retornarApenasInativas?: boolean) {
    return this.prisma.categorias.findMany({
      where: retornarApenasInativas === true
        ? { ativa: false }
        : { ativa: true },
      orderBy: { ordem_exibicao: 'asc' },
    });
  }

  findOne(id: number) {
    return this.prisma.categorias.findUnique({
      where: { id_categoria: id },
    });
  }

  update(id: number, data: UpdateCategoriaDto) {
    return this.prisma.categorias.update({
      where: { id_categoria: id },
      data,
    });
  }

  async remove(id: number) {
    const categoria = await this.findOne(id);
    
    if (!categoria) {
      throw new NotFoundException('Categoria não encontrada');
    }

    await this.prisma.categorias.update({
      where: { id_categoria: id },
      data: { ativa: false },
    });

    return { message: 'Categoria desativada com sucesso' };
  }
}