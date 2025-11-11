import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsuariosService {
  constructor(private prisma: PrismaService) {}

  async findByEmail(email: string) {
    return this.prisma.usuarios.findUnique({ where: { email } });
  }
  
  // ✅ CORRIGIDO: Agora faz hash da senha antes de salvar
  async create(data: CreateUsuarioDto) {
    const saltRounds = 10;
    const senhaHash = await bcrypt.hash(data.senha_hash, saltRounds);

    return this.prisma.usuarios.create({
      data: {
        ...data,
        senha_hash: senhaHash, // Salva o hash, não a senha em texto puro
      },
    });
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

  // ✅ CORRIGIDO: Também fazer hash ao atualizar a senha
  async update(id: number, data: UpdateUsuarioDto) {
    // Se estiver atualizando a senha, fazer hash
    if (data.senha_hash) {
      const saltRounds = 10;
      data.senha_hash = await bcrypt.hash(data.senha_hash, saltRounds);
    }

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