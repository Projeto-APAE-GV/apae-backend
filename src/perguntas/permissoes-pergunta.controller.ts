import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { PermissoesPerguntaService } from './permissoes-pergunta.service';
import { CreatePermissaoPerguntaDto } from './dto/create-permissao-pergunta.dto';
import { UpdatePermissaoPerguntaDto } from './dto/update-permissao-pergunta.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { usuarios_tipo_usuario } from '@prisma/client';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

@ApiTags('Permissões de Pergunta')
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('permissoes-pergunta')
export class PermissoesPerguntaController {
  constructor(private readonly service: PermissoesPerguntaService) {}

  @Get()
  @Roles(usuarios_tipo_usuario.admin)
  @ApiOperation({ summary: 'Listar todas as permissões de pergunta' })
  findAll() {
    return this.service.findAll();
  }

  @Post()
  @Roles(usuarios_tipo_usuario.admin)
  @ApiOperation({ summary: 'Criar permissão de pergunta' })
  create(@Body() dto: CreatePermissaoPerguntaDto) {
    return this.service.create(dto);
  }

  @Put(':id')
  @Roles(usuarios_tipo_usuario.admin)
  @ApiOperation({ summary: 'Atualizar permissão de pergunta' })
  @ApiParam({ name: 'id', description: 'ID da permissão' })
  update(@Param('id') id: string, @Body() dto: UpdatePermissaoPerguntaDto) {
    return this.service.update(Number(id), dto);
  }

  @Delete(':id')
  @Roles(usuarios_tipo_usuario.admin)
  @ApiOperation({ summary: 'Remover permissão de pergunta' })
  @ApiParam({ name: 'id', description: 'ID da permissão' })
  remove(@Param('id') id: string) {
    return this.service.remove(Number(id));
  }
}