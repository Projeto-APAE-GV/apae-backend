import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { categorias } from '@prisma/client';

@Injectable()
export class CategoriasService {
  constructor(private prisma: PrismaService) {}

  // Cria uma nova categoria
  create(data: CreateCategoriaDto) {
    return this.prisma.categorias.create({ data });
  }

  // Retorna todas as categorias
  findAll() {
    return this.prisma.categorias.findMany();
  }

  // Retorna uma categoria por ID
  findOne(id: number) {
    return this.prisma.categorias.findUnique({
      where: { id_categoria: id },
    });
  }

  // Atualiza uma categoria
  update(id: number, data: UpdateCategoriaDto) {
    return this.prisma.categorias.update({
      where: { id_categoria: id },
      data,
    });
  }

  // Deleta (hard delete) uma categoria
  remove(id: number) {
    return this.prisma.categorias.delete({
      where: { id_categoria: id },
    });
  }
}