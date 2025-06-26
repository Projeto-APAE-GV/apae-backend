import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsNumber, IsBoolean } from 'class-validator';

export class CreateCategoriaDto {
  @ApiProperty({
    example: 'Dados Pessoais',
    description: 'Nome da categoria',
  })
  @IsString({ message: 'Nome da categoria deve ser uma string' })
  nome_categoria: string;

  @ApiProperty({
    example: 'Categoria para informações pessoais do assistido',
    description: 'Descrição da categoria (opcional)',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'Descrição deve ser uma string' })
  descricao?: string;

  @ApiProperty({
    example: 1,
    description: 'Ordem de exibição da categoria (opcional, padrão: 0)',
    required: false,
  })
  @IsOptional()
  @IsNumber({}, { message: 'Ordem de exibição deve ser um número' })
  ordem_exibicao?: number;

  @ApiProperty({
    example: true,
    description: 'Se a categoria está ativa (opcional, padrão: true)',
    required: false,
  })
  @IsOptional()
  @IsBoolean({ message: 'Ativa deve ser um boolean' })
  ativa?: boolean;

  @ApiProperty({
    example: 1,
    description: 'ID do usuário que criou a categoria (opcional)',
    required: false,
  })
  @IsOptional()
  @IsNumber({}, { message: 'ID do usuário deve ser um número' })
  criada_por?: number;
}