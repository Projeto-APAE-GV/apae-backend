import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards, ParseIntPipe } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { usuarios_tipo_usuario } from '@prisma/client';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam, ApiBody } from '@nestjs/swagger';
import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';

@ApiTags('Usuários')
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('usuarios')
export class UsuariosController {
  constructor(private svc: UsuariosService) {}

  @Post()
  @Roles(usuarios_tipo_usuario.admin)
  @ApiOperation({ summary: 'Criar um novo usuário' })
  @ApiBody({ type: CreateUsuarioDto })
  @ApiResponse({ status: 201, type: CreateUsuarioDto })
  create(@Body() dto: CreateUsuarioDto) {
    return this.svc.create(dto);
  }

  @Get()
  @Roles(usuarios_tipo_usuario.admin, usuarios_tipo_usuario.secretaria, usuarios_tipo_usuario.psicologa)
  @ApiOperation({ summary: 'Listar todos os usuários' })
  @ApiResponse({
    status: 200,
    description: 'Lista de usuários retornada com sucesso',
    type: [CreateUsuarioDto],
  })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  @ApiResponse({ status: 403, description: 'Acesso negado' })
  findAll() {
    return this.svc.findAll();
  }

  @Get(':id')
  @Roles(usuarios_tipo_usuario.admin, usuarios_tipo_usuario.secretaria, usuarios_tipo_usuario.psicologa, usuarios_tipo_usuario.assistente)
  @ApiOperation({ summary: 'Buscar um usuário pelo ID' })
  @ApiParam({ name: 'id', description: 'ID do usuário' })
  @ApiResponse({ status: 200, type: CreateUsuarioDto })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.svc.findOne(id);
  }

  @Put(':id')
  @Roles(usuarios_tipo_usuario.admin)
  @ApiOperation({ summary: 'Atualizar um usuário' })
  @ApiParam({ name: 'id', description: 'ID do usuário' })
  @ApiBody({ type: UpdateUsuarioDto })
  @ApiResponse({ status: 200, type: UpdateUsuarioDto })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateUsuarioDto,
  ) {
    return this.svc.update(id, dto);
  }

  @Delete(':id')
  @Roles(usuarios_tipo_usuario.admin)
  @ApiOperation({ summary: 'Remover um usuário' })
  @ApiParam({ name: 'id', description: 'ID do usuário' })
  @ApiResponse({ status: 200, description: 'Usuário removido com sucesso' })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  @ApiResponse({ status: 403, description: 'Acesso negado' })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado' })
  remove(@Param('id') id: string) {
    return this.svc.remove(Number(id));
  }
}