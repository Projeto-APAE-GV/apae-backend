import { PerguntasService } from './perguntas.service';
import { CreatePerguntaDto } from './dto/create-pergunta.dto';
import { UpdatePerguntaDto } from './dto/update-pergunta.dto';
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
  ApiQuery,
} from '@nestjs/swagger';
import { Request as ExpressRequest } from 'express';

@ApiTags('Perguntas')
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('perguntas')
export class PerguntasController {
  constructor(private readonly perguntasService: PerguntasService) {}

  @Post()
  @Roles(usuarios_tipo_usuario.psicologa, usuarios_tipo_usuario.secretaria)
  @ApiOperation({ summary: 'Criar uma nova pergunta' })
  @ApiBody({ type: CreatePerguntaDto })
  @ApiResponse({
    status: 201,
    description: 'Pergunta criada com sucesso',
    schema: {
      type: 'object',
      properties: {
        id_pergunta: { type: 'number' },
        id_categoria: { type: 'number' },
        texto_pergunta: { type: 'string' },
        tipo_resposta: { type: 'string' },
        opcoes_resposta: { type: 'array', items: { type: 'string' } },
        obrigatoria: { type: 'boolean' },
        ordem_categoria: { type: 'number' },
        ativa: { type: 'boolean' },
        data_criacao: { type: 'string', format: 'date-time' },
        criada_por: { type: 'number' },
        categoria: { type: 'object' },
        usuario: {
          type: 'object',
          properties: {
            nome: { type: 'string' },
            email: { type: 'string' },
            tipo_usuario: { type: 'string', enum: ['psicologa', 'secretaria', 'assistente'] },
          },
        },
        permissoes_pergunta: { type: 'array' },
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  @ApiResponse({ status: 403, description: 'Acesso negado' })
  create(@Body() createPerguntaDto: CreatePerguntaDto, @Request() request: ExpressRequest) {
    return this.perguntasService.create(createPerguntaDto, request);
  }

  @Get()
  @Roles(usuarios_tipo_usuario.psicologa, usuarios_tipo_usuario.secretaria, usuarios_tipo_usuario.assistente)
  @ApiOperation({ summary: 'Listar todas as perguntas' })
  @ApiQuery({ name: 'retornarApenasInativas', required: false, type: Boolean, description: 'Se true, retorna apenas perguntas inativas' })
  @ApiResponse({
    status: 200,
    description: 'Lista de perguntas retornada com sucesso',
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id_pergunta: { type: 'number' },
          id_categoria: { type: 'number' },
          texto_pergunta: { type: 'string' },
          tipo_resposta: { type: 'string' },
          opcoes_resposta: { type: 'array', items: { type: 'string' } },
          obrigatoria: { type: 'boolean' },
          ordem_categoria: { type: 'number' },
          ativa: { type: 'boolean' },
          data_criacao: { type: 'string', format: 'date-time' },
          criada_por: { type: 'number' },
          categoria: { type: 'object' },
          usuario: {
            type: 'object',
            properties: {
              nome: { type: 'string' },
              email: { type: 'string' },
              tipo_usuario: { type: 'string', enum: ['psicologa', 'secretaria', 'assistente'] },
            },
          },
          permissoes_pergunta: { type: 'array' },
        },
      },
    },
  })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  @ApiResponse({ status: 403, description: 'Acesso negado' })
  findAll(@Query('retornarApenasInativas') retornarApenasInativas?: string) {
    return this.perguntasService.findAll(retornarApenasInativas === 'true');
  }

  @Get('categoria/:idCategoria')
  @Roles(usuarios_tipo_usuario.psicologa, usuarios_tipo_usuario.secretaria, usuarios_tipo_usuario.assistente)
  @ApiOperation({ summary: 'Listar perguntas por categoria' })
  @ApiParam({ name: 'idCategoria', description: 'ID da categoria' })
  @ApiQuery({ name: 'retornarApenasInativas', required: false, type: Boolean, description: 'Se true, retorna apenas perguntas inativas' })
  @ApiResponse({
    status: 200,
    description: 'Lista de perguntas da categoria retornada com sucesso',
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id_pergunta: { type: 'number' },
          id_categoria: { type: 'number' },
          texto_pergunta: { type: 'string' },
          tipo_resposta: { type: 'string' },
          opcoes_resposta: { type: 'array', items: { type: 'string' } },
          obrigatoria: { type: 'boolean' },
          ordem_categoria: { type: 'number' },
          ativa: { type: 'boolean' },
          data_criacao: { type: 'string', format: 'date-time' },
          criada_por: { type: 'number' },
          categoria: { type: 'object' },
          usuario: {
            type: 'object',
            properties: {
              nome: { type: 'string' },
              email: { type: 'string' },
              tipo_usuario: { type: 'string', enum: ['psicologa', 'secretaria', 'assistente'] },
            },
          },
          permissoes_pergunta: { type: 'array' },
        },
      },
    },
  })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  @ApiResponse({ status: 403, description: 'Acesso negado' })
  @ApiResponse({ status: 404, description: 'Categoria não encontrada' })
  findByCategoria(@Param('idCategoria') idCategoria: string, @Query('retornarApenasInativas') retornarApenasInativas?: string) {
    return this.perguntasService.findByCategoria(Number(idCategoria), retornarApenasInativas === 'true');
  }

  @Get(':id')
  @Roles(usuarios_tipo_usuario.psicologa, usuarios_tipo_usuario.secretaria, usuarios_tipo_usuario.assistente)
  @ApiOperation({ summary: 'Buscar uma pergunta pelo ID' })
  @ApiParam({ name: 'id', description: 'ID da pergunta' })
  @ApiResponse({
    status: 200,
    description: 'Pergunta encontrada com sucesso',
    schema: {
      type: 'object',
      properties: {
        id_pergunta: { type: 'number' },
        id_categoria: { type: 'number' },
        texto_pergunta: { type: 'string' },
        tipo_resposta: { type: 'string' },
        opcoes_resposta: { type: 'array', items: { type: 'string' } },
        obrigatoria: { type: 'boolean' },
        ordem_categoria: { type: 'number' },
        ativa: { type: 'boolean' },
        data_criacao: { type: 'string', format: 'date-time' },
        criada_por: { type: 'number' },
        categoria: { type: 'object' },
        usuario: {
          type: 'object',
          properties: {
            nome: { type: 'string' },
            email: { type: 'string' },
            tipo_usuario: { type: 'string', enum: ['psicologa', 'secretaria', 'assistente'] },
          },
        },
        permissoes_pergunta: { type: 'array' },
      },
    },
  })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  @ApiResponse({ status: 403, description: 'Acesso negado' })
  @ApiResponse({ status: 404, description: 'Pergunta não encontrada' })
  findOne(@Param('id') id: string) {
    return this.perguntasService.findOne(Number(id));
  }

  @Patch(':id')
  @Roles(usuarios_tipo_usuario.psicologa, usuarios_tipo_usuario.secretaria)
  @ApiOperation({ summary: 'Atualizar uma pergunta' })
  @ApiParam({ name: 'id', description: 'ID da pergunta' })
  @ApiBody({ type: UpdatePerguntaDto })
  @ApiResponse({
    status: 200,
    description: 'Pergunta atualizada com sucesso',
    schema: {
      type: 'object',
      properties: {
        id_pergunta: { type: 'number' },
        id_categoria: { type: 'number' },
        texto_pergunta: { type: 'string' },
        tipo_resposta: { type: 'string' },
        opcoes_resposta: { type: 'array', items: { type: 'string' } },
        obrigatoria: { type: 'boolean' },
        ordem_categoria: { type: 'number' },
        ativa: { type: 'boolean' },
        data_criacao: { type: 'string', format: 'date-time' },
        criada_por: { type: 'number' },
        categoria: { type: 'object' },
        usuario: {
          type: 'object',
          properties: {
            nome: { type: 'string' },
            email: { type: 'string' },
            tipo_usuario: { type: 'string', enum: ['psicologa', 'secretaria', 'assistente'] },
          },
        },
        permissoes_pergunta: { type: 'array' },
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  @ApiResponse({ status: 403, description: 'Acesso negado' })
  @ApiResponse({ status: 404, description: 'Pergunta não encontrada' })
  update(@Param('id') id: string, @Body() updatePerguntaDto: UpdatePerguntaDto, @Request() request: ExpressRequest) {
    return this.perguntasService.update(Number(id), updatePerguntaDto, request);
  }

  @Delete(':id')
  @Roles(usuarios_tipo_usuario.psicologa, usuarios_tipo_usuario.secretaria)
  @ApiOperation({ summary: 'Desativar uma pergunta' })
  @ApiParam({ name: 'id', description: 'ID da pergunta' })
  @ApiResponse({ status: 200, description: 'Pergunta desativada com sucesso' })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  @ApiResponse({ status: 403, description: 'Acesso negado' })
  @ApiResponse({ status: 404, description: 'Pergunta não encontrada' })
  remove(@Param('id') id: string) {
    return this.perguntasService.remove(Number(id));
  }
}