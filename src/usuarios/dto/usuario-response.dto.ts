import { ApiProperty } from '@nestjs/swagger';
import { usuarios_tipo_usuario } from '@prisma/client';

export class UsuarioResponseDto {
  @ApiProperty({
    example: 'João Silva',
    description: 'Nome completo do usuário',
  })
  nome: string;

  @ApiProperty({
    example: 'joao.silva@email.com',
    description: 'Email do usuário',
  })
  email: string;

  @ApiProperty({
    enum: usuarios_tipo_usuario,
    example: usuarios_tipo_usuario.secretaria,
    description: 'Tipo de usuário',
  })
  tipo_usuario: usuarios_tipo_usuario;
} 