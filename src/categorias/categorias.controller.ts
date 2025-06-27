import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { CategoriasService } from './categorias.service';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { usuarios_tipo_usuario } from '@prisma/client';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('Categorias')
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('categorias')
export class CategoriasController {
  constructor(private svc: CategoriasService) {}

  @Post()
  @Roles(usuarios_tipo_usuario.psicologa, usuarios_tipo_usuario.secretaria)
  @ApiOperation({ 
    summary: 'Criar uma nova categoria',
    description: 'Cria uma nova categoria para organizar as perguntas do sistema'
  })
  @ApiBody({ 
    type: CreateCategoriaDto,
    description: 'Dados da categoria a ser criada',
    examples: {
      dadosPessoais: {
        summary: 'Categoria Dados Pessoais',
        description: 'Exemplo de criação da categoria Dados Pessoais',
        value: {
          nome_categoria: 'Dados Pessoais',
          descricao: 'Categoria para armazenar informações pessoais básicas do assistido como nome, CPF, endereço, telefone, etc.',
          ordem_exibicao: 1,
          ativa: true
        }
      },
      historicoMedico: {
        summary: 'Categoria Histórico Médico',
        description: 'Exemplo de criação da categoria Histórico Médico',
        value: {
          nome_categoria: 'Histórico Médico',
          descricao: 'Categoria para armazenar informações sobre histórico médico, medicamentos, alergias e condições de saúde.',
          ordem_exibicao: 2,
          ativa: true
        }
      },
      avaliacaoPsicologica: {
        summary: 'Categoria Avaliação Psicológica',
        description: 'Exemplo de criação da categoria Avaliação Psicológica',
        value: {
          nome_categoria: 'Avaliação Psicológica',
          descricao: 'Categoria para perguntas relacionadas à avaliação psicológica e comportamental do assistido.',
          ordem_exibicao: 3,
          ativa: true
        }
      },
      exemploMinimo: {
        summary: 'Exemplo mínimo',
        description: 'Exemplo de criação de categoria apenas com o nome obrigatório',
        value: {
          nome_categoria: 'Nova Categoria'
        }
      }
    }
  })
  @ApiResponse({
    status: 201,
    description: 'Categoria criada com sucesso',
    schema: {
      type: 'object',
      properties: {
        id_categoria: { type: 'number' },
        nome_categoria: { type: 'string' },
        descricao: { type: 'string' },
        ordem_exibicao: { type: 'number' },
        ativa: { type: 'boolean' },
        data_criacao: { type: 'string', format: 'date-time' },
        criada_por: { type: 'number' },
        usuario: {
          type: 'object',
          properties: {
            nome: { type: 'string' },
            email: { type: 'string' },
            tipo_usuario: { type: 'string', enum: ['psicologa', 'secretaria', 'assistente'] },
          },
        },
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  @ApiResponse({ status: 403, description: 'Acesso negado' })
  create(@Body() dto: CreateCategoriaDto) {
    return this.svc.create(dto);
  }

  @Get()
  @Roles(usuarios_tipo_usuario.psicologa, usuarios_tipo_usuario.secretaria, usuarios_tipo_usuario.assistente)
  @ApiOperation({ summary: 'Listar todas as categorias' })
  @ApiResponse({
    status: 200,
    description: 'Lista de categorias retornada com sucesso',
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id_categoria: { type: 'number' },
          nome_categoria: { type: 'string' },
          descricao: { type: 'string' },
          ordem_exibicao: { type: 'number' },
          ativa: { type: 'boolean' },
          data_criacao: { type: 'string', format: 'date-time' },
          criada_por: { type: 'number' },
          usuario: {
            type: 'object',
            properties: {
              nome: { type: 'string' },
              email: { type: 'string' },
              tipo_usuario: { type: 'string', enum: ['psicologa', 'secretaria', 'assistente'] },
            },
          },
        },
      },
    },
  })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  @ApiResponse({ status: 403, description: 'Acesso negado' })
  findAll() {
    return this.svc.findAll();
  }

  @Get(':id')
  @Roles(usuarios_tipo_usuario.psicologa, usuarios_tipo_usuario.secretaria, usuarios_tipo_usuario.assistente)
  @ApiOperation({ summary: 'Buscar uma categoria pelo ID' })
  @ApiParam({ name: 'id', description: 'ID da categoria' })
  @ApiResponse({
    status: 200,
    description: 'Categoria encontrada com sucesso',
    schema: {
      type: 'object',
      properties: {
        id_categoria: { type: 'number' },
        nome_categoria: { type: 'string' },
        descricao: { type: 'string' },
        ordem_exibicao: { type: 'number' },
        ativa: { type: 'boolean' },
        data_criacao: { type: 'string', format: 'date-time' },
        criada_por: { type: 'number' },
        usuario: {
          type: 'object',
          properties: {
            nome: { type: 'string' },
            email: { type: 'string' },
            tipo_usuario: { type: 'string', enum: ['psicologa', 'secretaria', 'assistente'] },
          },
        },
      },
    },
  })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  @ApiResponse({ status: 403, description: 'Acesso negado' })
  @ApiResponse({ status: 404, description: 'Categoria não encontrada' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.svc.findOne(id);
  }

  @Patch(':id')
  @Roles(usuarios_tipo_usuario.psicologa, usuarios_tipo_usuario.secretaria)
  @ApiOperation({ 
    summary: 'Atualizar uma categoria',
    description: 'Atualiza parcialmente os dados de uma categoria existente'
  })
  @ApiParam({ name: 'id', description: 'ID da categoria' })
  @ApiBody({ 
    type: UpdateCategoriaDto,
    description: 'Dados da categoria a ser atualizada (apenas os campos que deseja alterar)',
    examples: {
      atualizarNome: {
        summary: 'Atualizar nome',
        description: 'Exemplo de atualização apenas do nome da categoria',
        value: {
          nome_categoria: 'Dados Pessoais Atualizados'
        }
      },
      atualizarDescricao: {
        summary: 'Atualizar descrição',
        description: 'Exemplo de atualização da descrição da categoria',
        value: {
          descricao: 'Categoria atualizada para armazenar informações pessoais completas do assistido incluindo dados de contato e endereço.'
        }
      },
      alterarOrdem: {
        summary: 'Alterar ordem',
        description: 'Exemplo de alteração da ordem de exibição da categoria',
        value: {
          ordem_exibicao: 5
        }
      },
      desativarCategoria: {
        summary: 'Desativar categoria',
        description: 'Exemplo de desativação de uma categoria',
        value: {
          ativa: false
        }
      },
      atualizacaoCompleta: {
        summary: 'Atualização completa',
        description: 'Exemplo de atualização de múltiplos campos',
        value: {
          nome_categoria: 'Histórico Médico Completo',
          descricao: 'Categoria expandida para incluir histórico médico detalhado, medicamentos, alergias e acompanhamento.',
          ordem_exibicao: 2,
          ativa: true
        }
      }
    }
  })
  @ApiResponse({
    status: 200,
    description: 'Categoria atualizada com sucesso',
    schema: {
      type: 'object',
      properties: {
        id_categoria: { type: 'number' },
        nome_categoria: { type: 'string' },
        descricao: { type: 'string' },
        ordem_exibicao: { type: 'number' },
        ativa: { type: 'boolean' },
        data_criacao: { type: 'string', format: 'date-time' },
        criada_por: { type: 'number' },
        usuario: {
          type: 'object',
          properties: {
            nome: { type: 'string' },
            email: { type: 'string' },
            tipo_usuario: { type: 'string', enum: ['psicologa', 'secretaria', 'assistente'] },
          },
        },
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  @ApiResponse({ status: 403, description: 'Acesso negado' })
  @ApiResponse({ status: 404, description: 'Categoria não encontrada' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateCategoriaDto,
  ) {
    return this.svc.update(id, dto);
  }

  @Delete(':id')
  @Roles(usuarios_tipo_usuario.psicologa, usuarios_tipo_usuario.secretaria)
  @ApiOperation({ summary: 'Remover uma categoria' })
  @ApiParam({ name: 'id', description: 'ID da categoria' })
  @ApiResponse({ status: 200, description: 'Categoria removida com sucesso' })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  @ApiResponse({ status: 403, description: 'Acesso negado' })
  @ApiResponse({ status: 404, description: 'Categoria não encontrada' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.svc.remove(id);
  }
}