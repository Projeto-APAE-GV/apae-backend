import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class HistoricoRespostasService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.historico_respostas.findMany({
      include: {
        usuario: { select: { id_usuario: true, nome: true, email: true, tipo_usuario: true } },
        resposta: true,
      },
      orderBy: { data_alteracao: 'desc' },
    });
  }

  async findByResposta(id_resposta: number) {
    const historico = await this.prisma.historico_respostas.findMany({
      where: { id_resposta },
      include: {
        usuario: { select: { id_usuario: true, nome: true, email: true, tipo_usuario: true } },
        resposta: true,
      },
      orderBy: { data_alteracao: 'desc' },
    });
    if (!historico || historico.length === 0) throw new NotFoundException('Nenhum histórico encontrado para esta resposta');
    return historico;
  }
} 