import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { PerguntasModule } from './perguntas/perguntas.module';
import { AssistidosModule } from './assistidos/assistidos.module';
import { CategoriasModule } from './categorias/categorias.module';
import { RespostasModule } from './respostas/respostas.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    AuthModule,
    UsuariosModule,
    PerguntasModule,
    AssistidosModule,
    CategoriasModule,
    RespostasModule,
  ],
})
export class AppModule {}