import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsDateString, IsEnum, IsBoolean, IsEmail } from 'class-validator';

export class CreateAssistidoDto {
  @ApiProperty({
    example: 'João Silva',
    description: 'Nome completo do assistido',
  })
  @IsString({ message: 'Nome deve ser uma string' })
  nome: string;

  @ApiProperty({
    example: '123.456.789-00',
    description: 'CPF do assistido (opcional)',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'CPF deve ser uma string' })
  cpf?: string;

  @ApiProperty({
    example: '12.345.678-9',
    description: 'RG do assistido (opcional)',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'RG deve ser uma string' })
  rg?: string;

  @ApiProperty({
    example: '1990-01-01',
    description: 'Data de nascimento do assistido (opcional)',
    required: false,
  })
  @IsOptional()
  @IsDateString({}, { message: 'Data de nascimento deve ser uma data válida' })
  data_nascimento?: Date;

  @ApiProperty({
    enum: ['M', 'F', 'Outro'],
    example: 'M',
    description: 'Sexo do assistido (opcional)',
    required: false,
  })
  @IsOptional()
  @IsEnum(['M', 'F', 'Outro'], { message: 'Sexo deve ser M, F ou Outro' })
  sexo?: 'M' | 'F' | 'Outro';

  @ApiProperty({
    example: 'Solteiro',
    description: 'Estado civil do assistido (opcional)',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'Estado civil deve ser uma string' })
  estado_civil?: string;

  @ApiProperty({
    example: '(11) 99999-9999',
    description: 'Telefone do assistido (opcional)',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'Telefone deve ser uma string' })
  telefone?: string;

  @ApiProperty({
    example: 'joao.silva@email.com',
    description: 'Email do assistido (opcional)',
    required: false,
  })
  @IsOptional()
  @IsEmail({}, { message: 'Email deve ser um email válido' })
  email?: string;

  @ApiProperty({
    example: 'Rua das Flores, 123 - Centro',
    description: 'Endereço completo do assistido (opcional)',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'Endereço completo deve ser uma string' })
  endereco_completo?: string;

  @ApiProperty({
    example: '12345-678',
    description: 'CEP do assistido (opcional)',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'CEP deve ser uma string' })
  cep?: string;

  @ApiProperty({
    example: 'São Paulo',
    description: 'Cidade do assistido (opcional)',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'Cidade deve ser uma string' })
  cidade?: string;

  @ApiProperty({
    example: 'SP',
    description: 'Estado do assistido (opcional)',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'Estado deve ser uma string' })
  estado?: string;

  @ApiProperty({
    example: 'Maria Silva',
    description: 'Nome do responsável (opcional)',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'Nome do responsável deve ser uma string' })
  nome_responsavel?: string;

  @ApiProperty({
    example: '987.654.321-00',
    description: 'CPF do responsável (opcional)',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'CPF do responsável deve ser uma string' })
  cpf_responsavel?: string;

  @ApiProperty({
    example: 'Mãe',
    description: 'Parentesco do responsável (opcional)',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'Parentesco do responsável deve ser uma string' })
  parentesco_responsavel?: string;

  @ApiProperty({
    example: '(11) 88888-8888',
    description: 'Telefone do responsável (opcional)',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'Telefone do responsável deve ser uma string' })
  telefone_responsavel?: string;

  @ApiProperty({
    example: true,
    description: 'Status ativo do assistido (opcional, padrão: true)',
    required: false,
  })
  @IsOptional()
  @IsBoolean({ message: 'Status ativo deve ser um boolean' })
  status_ativo?: boolean;

  @ApiProperty({
    example: 'Observações importantes sobre o assistido',
    description: 'Observações gerais (opcional)',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'Observações gerais deve ser uma string' })
  observacoes_gerais?: string;
}
