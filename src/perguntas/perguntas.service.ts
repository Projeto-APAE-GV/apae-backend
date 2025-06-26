import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePerguntaDto } from './dto/create-pergunta.dto';
import { UpdatePerguntaDto } from './dto/update-pergunta.dto';
import { Request as ExpressRequest } from 'express';
import { ForbiddenException } from '@nestjs/common';

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

  async findAll(retornarApenasInativas?: boolean, request?: ExpressRequest) {
    const usuario = request?.user as any;
    const perguntas = await this.prisma.perguntas.findMany({
      where: retornarApenasInativas === true
        ? { ativa: false }
        : { ativa: true },
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

    if (usuario?.tipo_usuario === 'admin') return perguntas;

    // Filtra perguntas conforme permissões
    return perguntas.filter(pergunta =>
      pergunta.permissoes_pergunta.some(
        p => p.tipo_usuario === usuario.tipo_usuario && p.pode_visualizar
      )
    );
  }

  async findByCategoria(idCategoria: number, retornarApenasInativas?: boolean) {
    const categoria = await this.prisma.categorias.findUnique({
      where: { id_categoria: idCategoria },
    });

    if (!categoria) {
      throw new NotFoundException('Categoria não encontrada');
    }

    return this.prisma.perguntas.findMany({
      where: {
        id_categoria: idCategoria,
        ...(retornarApenasInativas === true ? { ativa: false } : { ativa: true }),
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
      orderBy: { ordem_categoria: 'asc' },
    });
  }

  async findOne(id: number, request?: ExpressRequest) {
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

  // Verificação de permissão
  if (request) {
    const usuario = request.user as any;
    if (usuario.tipo_usuario !== 'admin') {
      const permissao = pergunta.permissoes_pergunta.find(
        (p) => p.tipo_usuario === usuario.tipo_usuario && p.pode_visualizar
      );
      if (!permissao) {
        throw new ForbiddenException('Você não tem permissão para visualizar esta pergunta');
      }
    }
  }

  return pergunta;
}

  async update(id: number, updatePerguntaDto: UpdatePerguntaDto, request: ExpressRequest) {
    const pergunta = await this.findOne(id);
    const { permissoes, ...perguntaData } = updatePerguntaDto;

    // Verificação de permissão de edição
    if (request) {
      const usuario = request.user as any;
      const permissao = pergunta.permissoes_pergunta.find(
        (p) => p.tipo_usuario === usuario.tipo_usuario && p.pode_editar
    );
    if (!permissao && usuario.tipo !== 'admin') {
      throw new ForbiddenException('Você não tem permissão para editar esta pergunta');
    }
    }
    if (updatePerguntaDto.id_categoria) {
      const categoria = await this.prisma.categorias.findUnique({
        where: { id_categoria: updatePerguntaDto.id_categoria },
      });

      if (!categoria) {
        throw new BadRequestException('Categoria não encontrada');
      }
    }

    

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

    await this.prisma.perguntas.update({
      where: { id_pergunta: id },
      data: { ativa: false },
    });

    return { message: 'Pergunta desativada com sucesso' };
  }
}