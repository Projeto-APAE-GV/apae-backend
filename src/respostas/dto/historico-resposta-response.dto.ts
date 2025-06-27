import { ApiProperty } from '@nestjs/swagger';
import { usuarios_tipo_usuario } from '@prisma/client';

export class HistoricoRespostaResponseDto {
  @ApiProperty()
  id_historico: number;

  @ApiProperty()
  id_resposta: number;

  @ApiProperty({ required: false })
  resposta_anterior_texto?: string;

  @ApiProperty({ required: false })
  resposta_anterior_numero?: number;

  @ApiProperty({ required: false })
  resposta_anterior_data?: string;

  @ApiProperty({ required: false })
  resposta_anterior_boolean?: boolean;

  @ApiProperty({ required: false })
  nome_arquivo_anterior?: string;

  @ApiProperty()
  data_alteracao: string;

  @ApiProperty({ required: false })
  motivo_alteracao?: string;

  @ApiProperty({
    type: 'object',
    properties: {
      id_usuario: { type: 'number' },
      nome: { type: 'string' },
      email: { type: 'string' },
      tipo_usuario: { type: 'string', enum: Object.values(usuarios_tipo_usuario) },
    },
    required: false,
  })
  usuario?: any;
} 