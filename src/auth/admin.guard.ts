import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    // Aqui você verifica se o usuário está autenticado e se é admin
    // Exemplo: return request.user?.tipo_usuario === 'secretaria';
    // Para teste, pode retornar true ou false fixo
    return true; // Descomente para permitir acesso a todos os usuários
    //return request.headers['code-auth'] === 'apae'; // Descomente para permitir acesso apenas com header específico
  }
}