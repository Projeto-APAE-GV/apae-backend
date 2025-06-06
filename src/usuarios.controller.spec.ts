import { Test, TestingModule } from '@nestjs/testing';
import { UsuariosController } from './usuarios.controller';
import { UsuariosService } from './usuarios.service';

describe('UsuariosController', () => {
  let usuariosController: UsuariosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsuariosController],
      providers: [UsuariosService],
    }).compile();

    usuariosController = module.get<UsuariosController>(UsuariosController);
  });

  describe('root', () => {
    it('should return "Olá do controller de usuários!"', () => {
      expect(usuariosController.getHello()).toBe('Olá do controller de usuários!');
    });
  });
});