import {Controller,Get,Post,Patch,Delete,Body,Param,ParseIntPipe,UseGuards,Req,} from '@nestjs/common';
import { AssistidosService } from './assistidos.service';
import { CreateAssistidoDto } from './dto/create-assistido.dto';
import { UpdateAssistidoDto } from './dto/update-assistido.dto';
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

@ApiTags('Assistidos')
@ApiBearerAuth('JWT-auth')
@Controller('assistidos')
export class AssistidosController {
  constructor(private readonly svc: AssistidosService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(usuarios_tipo_usuario.secretaria, usuarios_tipo_usuario.psicologa)
  @ApiOperation({ summary: 'Criar um novo assistido' })
  @ApiBody({ type: CreateAssistidoDto })
  @ApiResponse({
    status: 201,
    description: 'Assistido criado com sucesso',
    schema: {
      type: 'object',
      properties: {
        id_assistido: { type: 'number' },
        nome: { type: 'string' },
        cpf: { type: 'string' },
        rg: { type: 'string' },
        data_nascimento: { type: 'string', format: 'date-time' },
        sexo: { type: 'string', enum: ['M', 'F', 'Outro'] },
        estado_civil: { type: 'string' },
        telefone: { type: 'string' },
        email: { type: 'string' },
        endereco_completo: { type: 'string' },
        cep: { type: 'string' },
        cidade: { type: 'string' },
        estado: { type: 'string' },
        nome_responsavel: { type: 'string' },
        cpf_responsavel: { type: 'string' },
        parentesco_responsavel: { type: 'string' },
        telefone_responsavel: { type: 'string' },
        data_cadastro: { type: 'string', format: 'date-time' },
        status_ativo: { type: 'boolean' },
        observacoes_gerais: { type: 'string' },
        cadastrado_por: { type: 'number' },
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  @ApiResponse({ status: 403, description: 'Acesso negado' })
  @Roles('admin', 'secretaria', 'psicologa')
  async create(@Body() dto: CreateAssistidoDto) {
    return this.svc.create(dto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Listar todos os assistidos' })
  @ApiResponse({
    status: 200,
    description: 'Lista de assistidos retornada com sucesso',
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id_assistido: { type: 'number' },
          nome: { type: 'string' },
          cpf: { type: 'string' },
          rg: { type: 'string' },
          data_nascimento: { type: 'string', format: 'date-time' },
          sexo: { type: 'string', enum: ['M', 'F', 'Outro'] },
          estado_civil: { type: 'string' },
          telefone: { type: 'string' },
          email: { type: 'string' },
          endereco_completo: { type: 'string' },
          cep: { type: 'string' },
          cidade: { type: 'string' },
          estado: { type: 'string' },
          nome_responsavel: { type: 'string' },
          cpf_responsavel: { type: 'string' },
          parentesco_responsavel: { type: 'string' },
          telefone_responsavel: { type: 'string' },
          data_cadastro: { type: 'string', format: 'date-time' },
          status_ativo: { type: 'boolean' },
          observacoes_gerais: { type: 'string' },
          cadastrado_por: { type: 'number' },
        },
      },
    },
  })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  async findAll() {
    return this.svc.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Buscar um assistido pelo ID' })
  @ApiParam({ name: 'id', description: 'ID do assistido' })
  @ApiResponse({
    status: 200,
    description: 'Assistido encontrado com sucesso',
    schema: {
      type: 'object',
      properties: {
        id_assistido: { type: 'number' },
        nome: { type: 'string' },
        cpf: { type: 'string' },
        rg: { type: 'string' },
        data_nascimento: { type: 'string', format: 'date-time' },
        sexo: { type: 'string', enum: ['M', 'F', 'Outro'] },
        estado_civil: { type: 'string' },
        telefone: { type: 'string' },
        email: { type: 'string' },
        endereco_completo: { type: 'string' },
        cep: { type: 'string' },
        cidade: { type: 'string' },
        estado: { type: 'string' },
        nome_responsavel: { type: 'string' },
        cpf_responsavel: { type: 'string' },
        parentesco_responsavel: { type: 'string' },
        telefone_responsavel: { type: 'string' },
        data_cadastro: { type: 'string', format: 'date-time' },
        status_ativo: { type: 'boolean' },
        observacoes_gerais: { type: 'string' },
        cadastrado_por: { type: 'number' },
      },
    },
  })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  @ApiResponse({ status: 404, description: 'Assistido não encontrado' })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.svc.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Atualizar um assistido' })
  @ApiParam({ name: 'id', description: 'ID do assistido' })
  @ApiBody({ type: UpdateAssistidoDto })
  @ApiResponse({
    status: 200,
    description: 'Assistido atualizado com sucesso',
    schema: {
      type: 'object',
      properties: {
        id_assistido: { type: 'number' },
        nome: { type: 'string' },
        cpf: { type: 'string' },
        rg: { type: 'string' },
        data_nascimento: { type: 'string', format: 'date-time' },
        sexo: { type: 'string', enum: ['M', 'F', 'Outro'] },
        estado_civil: { type: 'string' },
        telefone: { type: 'string' },
        email: { type: 'string' },
        endereco_completo: { type: 'string' },
        cep: { type: 'string' },
        cidade: { type: 'string' },
        estado: { type: 'string' },
        nome_responsavel: { type: 'string' },
        cpf_responsavel: { type: 'string' },
        parentesco_responsavel: { type: 'string' },
        telefone_responsavel: { type: 'string' },
        data_cadastro: { type: 'string', format: 'date-time' },
        status_ativo: { type: 'boolean' },
        observacoes_gerais: { type: 'string' },
        cadastrado_por: { type: 'number' },
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  @ApiResponse({ status: 404, description: 'Assistido não encontrado' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateAssistidoDto,
  ) {
    return this.svc.update(id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Remover um assistido' })
  @ApiParam({ name: 'id', description: 'ID do assistido' })
  @ApiResponse({ status: 200, description: 'Assistido removido com sucesso' })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  @ApiResponse({ status: 404, description: 'Assistido não encontrado' })
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.svc.remove(id);
  }

  @Get(':id/perguntas')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'secretaria', 'psicologa', 'assistente')
  async getPerguntas(
    @Param('id', ParseIntPipe) id: number,
  ) {
  }
}