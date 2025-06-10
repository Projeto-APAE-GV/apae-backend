import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UsuariosService } from '../usuarios/usuarios.service';
import { usuarios } from '@prisma/client';  

@Injectable()
export class AuthService {
  constructor(
    private readonly usuariosService: UsuariosService,
    private readonly jwtService: JwtService,
  ) {}

  async login(email: string, senha: string): Promise<{ access_token: string }> {
    const user: usuarios | null = await this.usuariosService.findByEmail(email);

    if (!user || !user.senha_hash) {
      throw new Error('Usuário ou senha inválidos');
    }

    const senhaValida = await bcrypt.compare(senha, user.senha_hash);

    if (!senhaValida) {
      throw new Error('Senha incorreta');
    }

    const payload = {
      sub: user.id_usuario,
      email: user.email,
      tipo: user.tipo_usuario,
    };

    const access_token = this.jwtService.sign(payload);

    return { access_token };
  }
}