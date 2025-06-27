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
  @ApiOperation({ 
    summary: 'Criar um novo assistido',
    description: 'Cria um novo cadastro de assistido com todas as informações pessoais e de contato'
  })
  @ApiBody({ 
    type: CreateAssistidoDto,
    description: 'Dados do assistido a ser criado',
    examples: {
      exemploCompleto: {
        summary: 'Exemplo com todos os campos',
        description: 'Exemplo de criação de assistido com todos os campos preenchidos',
        value: {
          nome: 'João Silva Santos',
          cpf: '123.456.789-00',
          rg: '12.345.678-9',
          data_nascimento: '1990-05-15',
          sexo: 'M',
          estado_civil: 'Solteiro',
          telefone: '(11) 99999-9999',
          email: 'joao.silva@email.com',
          endereco_completo: 'Rua das Flores, 123 - Apto 45 - Centro',
          cep: '01234-567',
          cidade: 'São Paulo',
          estado: 'SP',
          nome_responsavel: 'Maria Silva Santos',
          cpf_responsavel: '987.654.321-00',
          parentesco_responsavel: 'Mãe',
          telefone_responsavel: '(11) 88888-8888',
          status_ativo: true,
          observacoes_gerais: 'Assistido com necessidades especiais. Precisa de acompanhamento psicológico regular.'
        }
      },
      exemploMinimo: {
        summary: 'Exemplo mínimo',
        description: 'Exemplo de criação de assistido apenas com o nome obrigatório',
        value: {
          nome: 'Maria Oliveira'
        }
      }
    }
  })
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
  @ApiOperation({ 
    summary: 'Atualizar um assistido',
    description: 'Atualiza parcialmente os dados de um assistido existente'
  })
  @ApiParam({ name: 'id', description: 'ID do assistido' })
  @ApiBody({ 
    type: UpdateAssistidoDto,
    description: 'Dados do assistido a ser atualizado (apenas os campos que deseja alterar)',
    examples: {
      atualizarTelefone: {
        summary: 'Atualizar telefone',
        description: 'Exemplo de atualização apenas do telefone',
        value: {
          telefone: '(11) 97777-7777'
        }
      },
      atualizarEndereco: {
        summary: 'Atualizar endereço',
        description: 'Exemplo de atualização do endereço completo',
        value: {
          endereco_completo: 'Av. Paulista, 1000 - Bela Vista',
          cep: '01310-100',
          cidade: 'São Paulo',
          estado: 'SP'
        }
      },
      atualizarResponsavel: {
        summary: 'Atualizar responsável',
        description: 'Exemplo de atualização dos dados do responsável',
        value: {
          nome_responsavel: 'José Silva Santos',
          cpf_responsavel: '111.222.333-44',
          parentesco_responsavel: 'Pai',
          telefone_responsavel: '(11) 86666-6666'
        }
      },
      desativarAssistido: {
        summary: 'Desativar assistido',
        description: 'Exemplo de desativação de um assistido',
        value: {
          status_ativo: false,
          observacoes_gerais: 'Assistido desativado por solicitação da família'
        }
      }
    }
  })
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
  @Roles(usuarios_tipo_usuario.secretaria, usuarios_tipo_usuario.psicologa, usuarios_tipo_usuario.assistente)
  @ApiOperation({ summary: 'Buscar perguntas de um assistido' })
  @ApiParam({ name: 'id', description: 'ID do assistido' })
  @ApiResponse({
    status: 200,
    description: 'Perguntas do assistido retornadas com sucesso',
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id_pergunta: { type: 'number' },
          texto_pergunta: { type: 'string' },
          tipo_resposta: { type: 'string' },
          obrigatoria: { type: 'boolean' },
          categoria: {
            type: 'object',
            properties: {
              id_categoria: { type: 'number' },
              nome_categoria: { type: 'string' },
            },
          },
        },
      },
    },
  })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  @ApiResponse({ status: 403, description: 'Acesso negado' })
  @ApiResponse({ status: 404, description: 'Assistido não encontrado' })
  async getPerguntas(
    @Param('id', ParseIntPipe) id: number,
  ) {
    // Implementação futura
  }
}