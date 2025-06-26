import {usuarios_tipo_usuario} from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength, IsEnum } from 'class-validator';

export class CreateUsuarioDto {
  @ApiProperty({
    example: 'João Silva',
    description: 'Nome completo do usuário',
  })
  @IsString({ message: 'Nome deve ser uma string' })
  @IsNotEmpty({ message: 'Nome é obrigatório' })
  nome: string;

  @ApiProperty({
    example: 'joao.silva@email.com',
    description: 'Email do usuário (deve ser único)',
  })
  @IsEmail({}, { message: 'Email inválido' })
  @IsNotEmpty({ message: 'Email é obrigatório' })
  email: string;

  @ApiProperty({
    example: '$2b$10$mY1Hcd/HZxTlbEHDV7IdJO7X3ham5Qgami1TEj4zLT0VnNW9mJz4C',
    description: 'Hash da senha do usuário (gerado com bcrypt)',
  })
  @IsString({ message: 'Senha deve ser uma string' })
  @IsNotEmpty({ message: 'Senha é obrigatória' })
  @MinLength(6, { message: 'Senha deve ter no mínimo 6 caracteres' })
  senha_hash: string;

  @ApiProperty({
    enum: usuarios_tipo_usuario,
    example: usuarios_tipo_usuario.secretaria,
    description: 'Tipo de usuário (admin, secretaria, psicologa, assistente)',
  })
  @IsEnum(usuarios_tipo_usuario, { message: 'Tipo de usuário inválido' })
  @IsNotEmpty({ message: 'Tipo de usuário é obrigatório' })
  tipo_usuario: usuarios_tipo_usuario;
}