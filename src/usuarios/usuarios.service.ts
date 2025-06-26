import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';

@Injectable()
export class UsuariosService {
  constructor(private prisma: PrismaService) {}

  async findByEmail(email: string) {
    return this.prisma.usuarios.findUnique({ where: { email } });
  }
  
  //teste
  create(data: CreateUsuarioDto) {
    return this.prisma.usuarios.create({ data });
  }

  findAll() {
    return this.prisma.usuarios.findMany();
  }

  async findOne(id: number) {
    const user = await this.prisma.usuarios.findUnique({
      where: { id_usuario: id },
    });
    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }
    return user;
  }

  update(id: number, data: UpdateUsuarioDto) {
    return this.prisma.usuarios.update({
      where: { id_usuario: id },
      data,
    });
  }

  remove(id: number) {
    return this.prisma.usuarios.delete({
      where: { id_usuario: id },
    });
  }
}