import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UsuariosService } from '../usuarios/usuarios.service';
import { usuarios, usuarios_tipo_usuario } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private readonly usuariosService: UsuariosService,
    private readonly jwtService: JwtService,
  ) {}

  async login(email: string, senha: string): Promise<{ access_token: string }> {
    const user: usuarios | null = await this.usuariosService.findByEmail(email);

    if (!user || !user.senha_hash) {
      throw new UnauthorizedException('Usuário ou senha inválidos');
    }

    const senhaValida = await bcrypt.compare(senha, user.senha_hash);

    if (!senhaValida) {
      throw new UnauthorizedException('Senha incorreta');
    }

    const payload = {
      sub: user.id_usuario,
      email: user.email,
      tipo: user.tipo_usuario,
    };

    const access_token = this.jwtService.sign(payload);

    return { access_token };
  }

  /**
   * Extrai o ID do usuário do token JWT
   * @param token Token JWT
   * @returns ID do usuário
   * @throws UnauthorizedException se o token for inválido
   */
  extrairIdUsuario(token: string): number {
    try {
      const payload = this.jwtService.verify(token);
      return payload.sub;
    } catch (error) {
      throw new UnauthorizedException('Token inválido ou expirado');
    }
  }

  /**
   * Extrai o nível de acesso (tipo) do usuário do token JWT
   * @param token Token JWT
   * @returns Tipo de usuário (secretaria, psicologa, assistente)
   * @throws UnauthorizedException se o token for inválido
   */
  extrairNivelAcesso(token: string): usuarios_tipo_usuario {
    try {
      const payload = this.jwtService.verify(token);
      return payload.tipo;
    } catch (error) {
      throw new UnauthorizedException('Token inválido ou expirado');
    }
  }
}