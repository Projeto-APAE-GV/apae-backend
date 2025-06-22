import { perguntas_tipo_resposta, permissoes_pergunta_tipo_usuario } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsEnum, IsOptional, IsBoolean, IsNumber, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class PermissaoPerguntaDto {
  @ApiProperty({
    enum: permissoes_pergunta_tipo_usuario,
    example: permissoes_pergunta_tipo_usuario.psicologa,
    description: 'Tipo de usuário para a permissão',
  })
  @IsEnum(permissoes_pergunta_tipo_usuario, { message: 'Tipo de usuário inválido' })
  @IsNotEmpty({ message: 'Tipo de usuário é obrigatório' })
  tipo_usuario: permissoes_pergunta_tipo_usuario;

  @ApiProperty({
    example: true,
    description: 'Se o tipo de usuário pode visualizar a pergunta',
  })
  @IsBoolean({ message: 'pode_visualizar deve ser um boolean' })
  @IsOptional()
  pode_visualizar?: boolean;

  @ApiProperty({
    example: false,
    description: 'Se o tipo de usuário pode editar a pergunta',
  })
  @IsBoolean({ message: 'pode_editar deve ser um boolean' })
  @IsOptional()
  pode_editar?: boolean;

  @ApiProperty({
    example: true,
    description: 'Se o tipo de usuário pode responder a pergunta',
  })
  @IsBoolean({ message: 'pode_responder deve ser um boolean' })
  @IsOptional()
  pode_responder?: boolean;
}

export class CreatePerguntaDto {
  @ApiProperty({
    example: 1,
    description: 'ID da categoria da pergunta',
  })
  @IsNumber({}, { message: 'ID da categoria deve ser um número' })
  @IsNotEmpty({ message: 'ID da categoria é obrigatório' })
  id_categoria: number;

  @ApiProperty({
    example: 'Qual é a sua idade?',
    description: 'Texto da pergunta',
  })
  @IsString({ message: 'Texto da pergunta deve ser uma string' })
  @IsNotEmpty({ message: 'Texto da pergunta é obrigatório' })
  texto_pergunta: string;

  @ApiProperty({
    enum: perguntas_tipo_resposta,
    example: perguntas_tipo_resposta.numero,
    description: 'Tipo de resposta esperada',
  })
  @IsEnum(perguntas_tipo_resposta, { message: 'Tipo de resposta inválido' })
  @IsNotEmpty({ message: 'Tipo de resposta é obrigatório' })
  tipo_resposta: perguntas_tipo_resposta;

  @ApiProperty({
    example: ['Sim', 'Não'],
    description: 'Opções de resposta para perguntas de múltipla escolha',
  })
  @IsOptional()
  opcoes_resposta?: any;

  @ApiProperty({
    example: true,
    description: 'Se a pergunta é obrigatória',
  })
  @IsBoolean({ message: 'obrigatoria deve ser um boolean' })
  @IsOptional()
  obrigatoria?: boolean;

  @ApiProperty({
    example: 1,
    description: 'Ordem da pergunta dentro da categoria',
  })
  @IsNumber({}, { message: 'Ordem da categoria deve ser um número' })
  @IsOptional()
  ordem_categoria?: number;

  @ApiProperty({
    example: true,
    description: 'Se a pergunta está ativa',
  })
  @IsBoolean({ message: 'ativa deve ser um boolean' })
  @IsOptional()
  ativa?: boolean;

  @ApiProperty({
    type: [PermissaoPerguntaDto],
    description: 'Permissões da pergunta para diferentes tipos de usuário',
  })
  @IsArray({ message: 'Permissões deve ser um array' })
  @ValidateNested({ each: true })
  @Type(() => PermissaoPerguntaDto)
  @IsOptional()
  permissoes?: PermissaoPerguntaDto[];
} 