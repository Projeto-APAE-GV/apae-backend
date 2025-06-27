import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsNumber, IsBoolean } from 'class-validator';

export class CreateCategoriaDto {
  @ApiProperty({
    example: 'Dados Pessoais',
    description: 'Nome da categoria (ex: Dados Pessoais, Histórico Médico, Avaliação Psicológica)',
  })
  @IsString({ message: 'Nome da categoria deve ser uma string' })
  nome_categoria: string;

  @ApiProperty({
    example: 'Categoria para armazenar informações pessoais básicas do assistido como nome, CPF, endereço, etc.',
    description: 'Descrição detalhada da categoria e seu propósito',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'Descrição deve ser uma string' })
  descricao?: string;

  @ApiProperty({
    example: 1,
    description: 'Ordem de exibição da categoria (1 = primeiro, 2 = segundo, etc.)',
    required: false,
    default: 0,
  })
  @IsOptional()
  @IsNumber({}, { message: 'Ordem de exibição deve ser um número' })
  ordem_exibicao?: number;

  @ApiProperty({
    example: true,
    description: 'Se a categoria está ativa e disponível para uso (true = ativa, false = inativa)',
    required: false,
    default: true,
  })
  @IsOptional()
  @IsBoolean({ message: 'Ativa deve ser um boolean' })
  ativa?: boolean;

  @ApiProperty({
    example: 1,
    description: 'ID do usuário que está criando a categoria (será preenchido automaticamente)',
    required: false,
  })
  @IsOptional()
  @IsNumber({}, { message: 'ID do usuário deve ser um número' })
  criada_por?: number;
}