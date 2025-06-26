import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEnum, IsInt, IsNotEmpty } from 'class-validator';
import { permissoes_pergunta_tipo_usuario } from '@prisma/client';

export class CreatePermissaoPerguntaDto {
  @ApiProperty({ example: 1, description: 'ID da pergunta' })
  @IsInt()
  @IsNotEmpty()
  id_pergunta: number;

  @ApiProperty({ enum: permissoes_pergunta_tipo_usuario })
  @IsEnum(permissoes_pergunta_tipo_usuario)
  @IsNotEmpty()
  tipo_usuario: permissoes_pergunta_tipo_usuario;

  @ApiProperty({ example: true })
  @IsBoolean()
  pode_visualizar: boolean;

  @ApiProperty({ example: false })
  @IsBoolean()
  pode_editar: boolean;

  @ApiProperty({ example: true })
  @IsBoolean()
  pode_responder: boolean;
}