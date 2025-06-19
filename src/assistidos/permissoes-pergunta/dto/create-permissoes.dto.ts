import { IsInt, IsEnum } from 'class-validator';
import { permissoes_pergunta_tipo_usuario } from '@prisma/client';

export class CreatePermissaoPerguntaDto {
  @IsInt()
  id_pergunta: number;

  @IsEnum(permissoes_pergunta_tipo_usuario)
  tipo_usuario: permissoes_pergunta_tipo_usuario;

    pode_visualizar?: boolean;
    pode_editar?: boolean;
    pode_responder?: boolean;
  }