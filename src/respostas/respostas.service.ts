import { Injectable, BadRequestException, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateRespostaDto } from './dto/create-resposta.dto';
import { UpdateRespostaDto } from './dto/update-resposta.dto';

@Injectable()
export class RespostasService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.respostas.findMany();
  }

  async findOne(id: number) {
    const resposta = await this.prisma.respostas.findUnique({ where: { id_resposta: id } });
    if (!resposta) throw new NotFoundException('Resposta não encontrada');
    return resposta;
  }

  async create(dto: CreateRespostaDto, usuarioLogado: any) {
    // Busca a pergunta para validar tipo e obter versão
    const pergunta = await this.prisma.perguntas.findUnique({ where: { id_pergunta: dto.id_pergunta } });
    if (!pergunta) throw new BadRequestException('Pergunta não encontrada');

    // Validação do tipo de resposta
    this.validarTipoResposta(pergunta.tipo_resposta, dto);

    // Busca a última versão para esse assistido/pergunta
    const ultima = await this.prisma.respostas.findFirst({
      where: { id_assistido: dto.id_assistido, id_pergunta: dto.id_pergunta },
      orderBy: { versao: 'desc' },
    });
    const novaVersao = ultima ? ultima.versao + 1 : 1;

    const prismaData = {
      ...dto,
      resposta_data: dto.resposta_data ? new Date(dto.resposta_data) : undefined,
      versao: novaVersao,
      respondida_por: usuarioLogado?.id_usuario,
    };

    return this.prisma.respostas.create({
      data: prismaData,
    });
  }

  async update(id: number, dto: UpdateRespostaDto, usuarioLogado: any) {
    const resposta = await this.findOne(id);
    const pergunta = await this.prisma.perguntas.findUnique({ where: { id_pergunta: resposta.id_pergunta } });
    if (!pergunta) throw new BadRequestException('Pergunta não encontrada');

    this.validarTipoResposta(pergunta.tipo_resposta, dto);

    // Cria nova versão (não sobrescreve)
    const novaVersao = resposta.versao + 1;
    
    const prismaData = {
      ...resposta,
      ...dto,
      resposta_data: dto.resposta_data ? new Date(dto.resposta_data) : resposta.resposta_data,
      versao: novaVersao,
      respondida_por: usuarioLogado?.id_usuario,
      data_resposta: new Date(),
    };
    
    return this.prisma.respostas.create({
      data: prismaData,
    });
  }

  async remove(id: number) {
    // Desativação lógica: seta campo data_atualizacao para agora e/ou campo ativo (se existir)
    // Ou, se preferir, delete físico:
    return this.prisma.respostas.delete({ where: { id_resposta: id } });
  }

  validarTipoResposta(tipo: string, dto: any) {
    switch (tipo) {
      case 'texto':
        if (!dto.resposta_texto) throw new BadRequestException('Resposta texto obrigatória');
        break;
      case 'numero':
        if (dto.resposta_numero === undefined || dto.resposta_numero === null)
          throw new BadRequestException('Resposta número obrigatória');
        break;
      case 'data':
        if (!dto.resposta_data) throw new BadRequestException('Resposta data obrigatória');
        break;
      case 'boolean':
        if (dto.resposta_boolean === undefined || dto.resposta_boolean === null)
          throw new BadRequestException('Resposta boolean obrigatória');
        break;
      case 'arquivo':
        if (!dto.nome_arquivo || !dto.caminho_arquivo)
          throw new BadRequestException('Arquivo obrigatório');
        break;
      // Adapte para outros tipos conforme necessário
    }
  }
}