import { SetMetadata } from '@nestjs/common';
import { usuarios_tipo_usuario } from '@prisma/client';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: usuarios_tipo_usuario[]) => SetMetadata(ROLES_KEY, roles); 