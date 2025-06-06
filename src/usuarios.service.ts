import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { usuarios } from '@prisma/client';

@Injectable()
export class UsuariosService {
  constructor(private prisma: PrismaService) {}

  async findByEmail(email: string): Promise<usuarios | null> {
    return this.prisma.usuarios.findUnique({ where: { email } });
  }
}