import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { UseGuards } from '@nestjs/common';
import { AdminGuard } from '../auth/admin.guard';
import { ApiHeader } from '@nestjs/swagger';

//Descomente se quiser usar o header de autenticação
/* @ApiHeader({
  name: 'code-auth',
  description: 'Header para autorização de admin (use "apae" para liberar acesso)',
  required: true,
})  */

@UseGuards(AdminGuard)
@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Post()
  create(@Body() createUsuarioDto: CreateUsuarioDto) {
    return this.usuariosService.create(createUsuarioDto);
  }

  @Get()
  findAll() {
    return this.usuariosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usuariosService.findOne(Number(id));
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateUsuarioDto: UpdateUsuarioDto) {
    return this.usuariosService.update(Number(id), updateUsuarioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usuariosService.remove(Number(id));
  }
}