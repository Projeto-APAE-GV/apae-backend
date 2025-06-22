import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePerguntaDto } from './dto/create-pergunta.dto';
import { UpdatePerguntaDto } from './dto/update-pergunta.dto';
import { Request as ExpressRequest } from 'express';

@Injectable()
export class PerguntasService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createPerguntaDto: CreatePerguntaDto, request: ExpressRequest) {
    const categoria = await this.prisma.categorias.findUnique({
      where: { id_categoria: createPerguntaDto.id_categoria },
    });

    if (!categoria) {
      throw new BadRequestException('Categoria não encontrada');
    }

    const usuario = request.user as any;
    const criada_por = usuario.id_usuario;

    const { permissoes, ...perguntaData } = createPerguntaDto;

    const pergunta = await this.prisma.perguntas.create({
      data: {
        ...perguntaData,
        criada_por,
      },
      include: {
        categoria: true,
        usuario: {
          select: {
            nome: true,
            email: true,
            tipo_usuario: true,
          },
        },
        permissoes_pergunta: true,
      },
    });

    if (permissoes && permissoes.length > 0) {
      const permissoesData = permissoes.map(permissao => ({
        id_pergunta: pergunta.id_pergunta,
        ...permissao,
      }));

      await this.prisma.permissoes_pergunta.createMany({
        data: permissoesData,
      });
    }

    return this.findOne(pergunta.id_pergunta);
  }

  async findAll() {
    return this.prisma.perguntas.findMany({
      include: {
        categoria: true,
        usuario: {
          select: {
            nome: true,
            email: true,
            tipo_usuario: true,
          },
        },
        permissoes_pergunta: true,
      },
      orderBy: [
        { categoria: { ordem_exibicao: 'asc' } },
        { ordem_categoria: 'asc' },
      ],
    });
  }

  async findByCategoria(idCategoria: number) {
    const categoria = await this.prisma.categorias.findUnique({
      where: { id_categoria: idCategoria },
    });

    if (!categoria) {
      throw new NotFoundException('Categoria não encontrada');
    }

    return this.prisma.perguntas.findMany({
      where: { id_categoria: idCategoria },
      include: {
        categoria: true,
        usuario: {
          select: {
            nome: true,
            email: true,
            tipo_usuario: true,
          },
        },
        permissoes_pergunta: true,
      },
      orderBy: { ordem_categoria: 'asc' },
    });
  }

  async findOne(id: number) {
    const pergunta = await this.prisma.perguntas.findUnique({
      where: { id_pergunta: id },
      include: {
        categoria: true,
        usuario: {
          select: {
            nome: true,
            email: true,
            tipo_usuario: true,
          },
        },
        permissoes_pergunta: true,
      },
    });

    if (!pergunta) {
      throw new NotFoundException('Pergunta não encontrada');
    }

    return pergunta;
  }

  async update(id: number, updatePerguntaDto: UpdatePerguntaDto, request: ExpressRequest) {
    const pergunta = await this.findOne(id);

    if (updatePerguntaDto.id_categoria) {
      const categoria = await this.prisma.categorias.findUnique({
        where: { id_categoria: updatePerguntaDto.id_categoria },
      });

      if (!categoria) {
        throw new BadRequestException('Categoria não encontrada');
      }
    }

    const { permissoes, ...perguntaData } = updatePerguntaDto;

    const updatedPergunta = await this.prisma.perguntas.update({
      where: { id_pergunta: id },
      data: perguntaData,
      include: {
        categoria: true,
        usuario: {
          select: {
            nome: true,
            email: true,
            tipo_usuario: true,
          },
        },
        permissoes_pergunta: true,
      },
    });

    if (permissoes) {
      await this.prisma.permissoes_pergunta.deleteMany({
        where: { id_pergunta: id },
      });

      if (permissoes.length > 0) {
        const permissoesData = permissoes.map(permissao => ({
          id_pergunta: id,
          ...permissao,
        }));

        await this.prisma.permissoes_pergunta.createMany({
          data: permissoesData,
        });
      }
    }

    return this.findOne(id);
  }

  async remove(id: number) {
    const pergunta = await this.findOne(id);

    await this.prisma.perguntas.delete({
      where: { id_pergunta: id },
    });

    return { message: 'Pergunta removida com sucesso' };
  }
} 