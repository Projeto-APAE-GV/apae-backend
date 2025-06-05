import {usuarios_tipo_usuario} from '@prisma/client';

export class CreateUsuarioDto {
  nome: string;
  email: string;
  senha_hash: string;
  tipo_usuario: usuarios_tipo_usuario;
}