import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsDateString, IsEnum, IsBoolean, IsEmail } from 'class-validator';

export class CreateAssistidoDto {
  @ApiProperty({
    example: 'João Silva Santos',
    description: 'Nome completo do assistido',
  })
  @IsString({ message: 'Nome deve ser uma string' })
  nome: string;

  @ApiProperty({
    example: '123.456.789-00',
    description: 'CPF do assistido (formato: XXX.XXX.XXX-XX)',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'CPF deve ser uma string' })
  cpf?: string;

  @ApiProperty({
    example: '12.345.678-9',
    description: 'RG do assistido (formato: XX.XXX.XXX-X)',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'RG deve ser uma string' })
  rg?: string;

  @ApiProperty({
    example: '1990-05-15',
    description: 'Data de nascimento do assistido (formato: YYYY-MM-DD)',
    required: false,
  })
  @IsOptional()
  @IsDateString({}, { message: 'Data de nascimento deve ser uma data válida' })
  data_nascimento?: Date;

  @ApiProperty({
    enum: ['M', 'F', 'Outro'],
    example: 'M',
    description: 'Sexo do assistido (M = Masculino, F = Feminino, Outro)',
    required: false,
  })
  @IsOptional()
  @IsEnum(['M', 'F', 'Outro'], { message: 'Sexo deve ser M, F ou Outro' })
  sexo?: 'M' | 'F' | 'Outro';

  @ApiProperty({
    example: 'Solteiro',
    description: 'Estado civil do assistido',
    required: false,
    enum: ['Solteiro', 'Casado', 'Divorciado', 'Viúvo', 'União Estável'],
  })
  @IsOptional()
  @IsString({ message: 'Estado civil deve ser uma string' })
  estado_civil?: string;

  @ApiProperty({
    example: '(11) 99999-9999',
    description: 'Telefone do assistido (formato: (XX) XXXXX-XXXX)',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'Telefone deve ser uma string' })
  telefone?: string;

  @ApiProperty({
    example: 'joao.silva@email.com',
    description: 'Email do assistido',
    required: false,
  })
  @IsOptional()
  @IsEmail({}, { message: 'Email deve ser um email válido' })
  email?: string;

  @ApiProperty({
    example: 'Rua das Flores, 123 - Apto 45 - Centro',
    description: 'Endereço completo do assistido',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'Endereço completo deve ser uma string' })
  endereco_completo?: string;

  @ApiProperty({
    example: '01234-567',
    description: 'CEP do assistido (formato: XXXXX-XXX)',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'CEP deve ser uma string' })
  cep?: string;

  @ApiProperty({
    example: 'São Paulo',
    description: 'Cidade do assistido',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'Cidade deve ser uma string' })
  cidade?: string;

  @ApiProperty({
    example: 'SP',
    description: 'Estado do assistido (sigla de 2 letras)',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'Estado deve ser uma string' })
  estado?: string;

  @ApiProperty({
    example: 'Maria Silva Santos',
    description: 'Nome completo do responsável legal',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'Nome do responsável deve ser uma string' })
  nome_responsavel?: string;

  @ApiProperty({
    example: '987.654.321-00',
    description: 'CPF do responsável legal (formato: XXX.XXX.XXX-XX)',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'CPF do responsável deve ser uma string' })
  cpf_responsavel?: string;

  @ApiProperty({
    example: 'Mãe',
    description: 'Parentesco do responsável legal',
    required: false,
    enum: ['Pai', 'Mãe', 'Avô', 'Avó', 'Tio', 'Tia', 'Irmão', 'Irmã', 'Tutor Legal'],
  })
  @IsOptional()
  @IsString({ message: 'Parentesco do responsável deve ser uma string' })
  parentesco_responsavel?: string;

  @ApiProperty({
    example: '(11) 88888-8888',
    description: 'Telefone do responsável legal (formato: (XX) XXXXX-XXXX)',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'Telefone do responsável deve ser uma string' })
  telefone_responsavel?: string;

  @ApiProperty({
    example: true,
    description: 'Status ativo do assistido (true = ativo, false = inativo)',
    required: false,
    default: true,
  })
  @IsOptional()
  @IsBoolean({ message: 'Status ativo deve ser um boolean' })
  status_ativo?: boolean;

  @ApiProperty({
    example: 'Assistido com necessidades especiais. Precisa de acompanhamento psicológico regular. Alergia a medicamentos contendo dipirona.',
    description: 'Observações gerais sobre o assistido (histórico médico, necessidades especiais, etc.)',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'Observações gerais deve ser uma string' })
  observacoes_gerais?: string;
}
