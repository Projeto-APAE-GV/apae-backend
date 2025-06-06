import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'; // 👈 Importe aqui
import { AuthModule } from './auth/auth.module';
import { UsuariosModule } from './usuarios/usuarios.module';

@Module({
  imports: [
    ConfigModule.forRoot({ // 👈 Configuração global
      envFilePath: '.env', // opcional, se você usar .env
      isGlobal: true,      // não precisa importar em outros módulos
    }),
    AuthModule,
    UsuariosModule,
  ],
})
export class AppModule {}