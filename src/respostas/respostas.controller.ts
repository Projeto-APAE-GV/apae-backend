import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards, Request, ParseIntPipe } from '@nestjs/common';
import { RespostasService } from './respostas.service';
import { CreateRespostaDto } from './dto/create-resposta.dto';
import { UpdateRespostaDto } from './dto/update-resposta.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { usuarios_tipo_usuario } from '@prisma/client';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

@ApiTags('Respostas')
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('respostas')
export class RespostasController {
  constructor(private svc: RespostasService) {}

  @Get()
  @Roles(usuarios_tipo_usuario.admin, usuarios_tipo_usuario.psicologa, usuarios_tipo_usuario.secretaria, usuarios_tipo_usuario.assistente)
  @ApiOperation({ summary: 'Listar todas as respostas' })
  findAll() {
    return this.svc.findAll();
  }

  @Get(':id')
  @Roles(
    usuarios_tipo_usuario.admin,
    usuarios_tipo_usuario.psicologa,
    usuarios_tipo_usuario.secretaria,
    usuarios_tipo_usuario.assistente
  )
  @ApiOperation({ summary: 'Buscar resposta por ID' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.svc.findOne(id);
  }

  @Post()
  @Roles(
    usuarios_tipo_usuario.admin,
    usuarios_tipo_usuario.psicologa,
    usuarios_tipo_usuario.secretaria,
    usuarios_tipo_usuario.assistente
  )
  @ApiOperation({ summary: 'Criar nova resposta' })
  create(@Body() dto: CreateRespostaDto, @Request() req) {
    return this.svc.create(dto, req.user);
  }

  @Put(':id')
  @Roles(
    usuarios_tipo_usuario.admin,
    usuarios_tipo_usuario.psicologa,
    usuarios_tipo_usuario.secretaria,
    usuarios_tipo_usuario.assistente
  )
  @ApiOperation({ summary: 'Atualizar resposta existente' })
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateRespostaDto, @Request() req) {
    return this.svc.update(id, dto, req.user);
  }

  @Delete(':id')
  @Roles(usuarios_tipo_usuario.admin, usuarios_tipo_usuario.psicologa, usuarios_tipo_usuario.secretaria)
  @ApiOperation({ summary: 'Remover resposta por ID' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.svc.remove(id);
  }
}