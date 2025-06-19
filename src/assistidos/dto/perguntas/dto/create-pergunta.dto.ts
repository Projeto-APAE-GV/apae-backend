import { IsInt, IsString, IsOptional, IsBoolean } from 'class-validator';
import { IsEnum } from 'class-validator';
import { perguntas_tipo_resposta } from '@prisma/client';

export class CreatePerguntaDto {
  @IsInt()
  id_categoria: number;

  @IsString()
  texto_pergunta: string;

  @IsEnum(perguntas_tipo_resposta)
  tipo_resposta: perguntas_tipo_resposta;

  @IsString()
  @IsOptional()
  opcoes_resposta?: any;

  @IsBoolean()
  @IsOptional()
  obrigatoria?: boolean;

  @IsInt()
  @IsOptional()
  ordem_categoria?: number;

  @IsBoolean()
  @IsOptional()
  ativa?: boolean;

  @IsInt()
  @IsOptional()
  criada_por?: number;
}