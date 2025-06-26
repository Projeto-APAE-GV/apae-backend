-- AlterTable
ALTER TABLE `usuarios` MODIFY `tipo_usuario` ENUM('admin', 'psicologa', 'secretaria', 'assistente') NOT NULL;
