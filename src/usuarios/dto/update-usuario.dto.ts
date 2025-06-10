import { usuarios_tipo_usuario } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, MinLength, IsEnum, IsBoolean } from 'class-validator';

export class UpdateUsuarioDto {
  @ApiProperty({
    example: 'João Silva',
    description: 'Nome completo do usuário',
    required: false,
  })
  @IsString({ message: 'Nome deve ser uma string' })
  @IsOptional()
  nome?: string;

  @ApiProperty({
    example: 'joao.silva@email.com',
    description: 'Email do usuário (deve ser único)',
    required: false,
  })
  @IsEmail({}, { message: 'Email inválido' })
  @IsOptional()
  email?: string;

  @ApiProperty({
    example: '$2b$10$yA93LW6RvCI6igFViW3AqO7SEh2bMMG80dAdnJc4dpSTi7.C1WV4q',
    description: 'Hash da senha do usuário (gerado com bcrypt)',
    required: false,
  })
  @IsString({ message: 'Senha deve ser uma string' })
  @IsOptional()
  @MinLength(6, { message: 'Senha deve ter no mínimo 6 caracteres' })
  senha_hash?: string;

  @ApiProperty({
    enum: usuarios_tipo_usuario,
    example: usuarios_tipo_usuario.secretaria,
    description: 'Tipo de usuário (secretaria, psicologa, assistente)',
    required: false,
  })
  @IsEnum(usuarios_tipo_usuario, { message: 'Tipo de usuário inválido' })
  @IsOptional()
  tipo_usuario?: usuarios_tipo_usuario;

  @ApiProperty({
    example: true,
    description: 'Status de ativação do usuário',
    required: false,
  })
  @IsBoolean({ message: 'Status deve ser um booleano' })
  @IsOptional()
  ativo?: boolean;
}