-- CreateTable
CREATE TABLE `usuarios` (
    `id_usuario` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(100) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `senha_hash` VARCHAR(255) NOT NULL,
    `tipo_usuario` ENUM('psicologa', 'secretaria', 'assistente') NOT NULL,
    `ativo` BOOLEAN NOT NULL DEFAULT true,
    `data_criacao` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `ultimo_acesso` DATETIME(3) NULL,

    UNIQUE INDEX `usuarios_email_key`(`email`),
    INDEX `usuarios_email_idx`(`email`),
    INDEX `usuarios_tipo_usuario_idx`(`tipo_usuario`),
    PRIMARY KEY (`id_usuario`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `assistidos` (
    `id_assistido` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(100) NOT NULL,
    `cpf` VARCHAR(14) NULL,
    `rg` VARCHAR(20) NULL,
    `data_nascimento` DATE NULL,
    `sexo` ENUM('M', 'F', 'Outro') NULL,
    `estado_civil` VARCHAR(20) NULL,
    `telefone` VARCHAR(15) NULL,
    `email` VARCHAR(100) NULL,
    `endereco_completo` TEXT NULL,
    `cep` VARCHAR(9) NULL,
    `cidade` VARCHAR(50) NULL,
    `estado` VARCHAR(2) NULL,
    `nome_responsavel` VARCHAR(100) NULL,
    `cpf_responsavel` VARCHAR(14) NULL,
    `parentesco_responsavel` VARCHAR(30) NULL,
    `telefone_responsavel` VARCHAR(15) NULL,
    `data_cadastro` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `status_ativo` BOOLEAN NOT NULL DEFAULT true,
    `observacoes_gerais` TEXT NULL,
    `cadastrado_por` INTEGER NULL,

    UNIQUE INDEX `assistidos_cpf_key`(`cpf`),
    INDEX `assistidos_cpf_idx`(`cpf`),
    INDEX `assistidos_nome_idx`(`nome`),
    INDEX `assistidos_status_ativo_idx`(`status_ativo`),
    INDEX `assistidos_data_cadastro_idx`(`data_cadastro`),
    PRIMARY KEY (`id_assistido`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `categorias` (
    `id_categoria` INTEGER NOT NULL AUTO_INCREMENT,
    `nome_categoria` VARCHAR(100) NOT NULL,
    `descricao` TEXT NULL,
    `ordem_exibicao` INTEGER NOT NULL DEFAULT 0,
    `ativa` BOOLEAN NOT NULL DEFAULT true,
    `data_criacao` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `criada_por` INTEGER NULL,

    INDEX `categorias_ordem_exibicao_idx`(`ordem_exibicao`),
    INDEX `categorias_ativa_idx`(`ativa`),
    PRIMARY KEY (`id_categoria`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `perguntas` (
    `id_pergunta` INTEGER NOT NULL AUTO_INCREMENT,
    `id_categoria` INTEGER NOT NULL,
    `texto_pergunta` TEXT NOT NULL,
    `tipo_resposta` ENUM('texto', 'numero', 'data', 'opcao_unica', 'multipla_escolha', 'boolean', 'arquivo') NOT NULL,
    `opcoes_resposta` JSON NULL,
    `obrigatoria` BOOLEAN NOT NULL DEFAULT false,
    `ordem_categoria` INTEGER NOT NULL DEFAULT 0,
    `ativa` BOOLEAN NOT NULL DEFAULT true,
    `data_criacao` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `criada_por` INTEGER NULL,

    INDEX `perguntas_id_categoria_idx`(`id_categoria`),
    INDEX `perguntas_tipo_resposta_idx`(`tipo_resposta`),
    INDEX `perguntas_ordem_categoria_idx`(`ordem_categoria`),
    INDEX `perguntas_ativa_idx`(`ativa`),
    PRIMARY KEY (`id_pergunta`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `permissoes_pergunta` (
    `id_permissao` INTEGER NOT NULL AUTO_INCREMENT,
    `id_pergunta` INTEGER NOT NULL,
    `tipo_usuario` ENUM('psicologa', 'secretaria', 'assistente') NOT NULL,
    `pode_visualizar` BOOLEAN NOT NULL DEFAULT true,
    `pode_editar` BOOLEAN NOT NULL DEFAULT false,
    `pode_responder` BOOLEAN NOT NULL DEFAULT false,

    INDEX `permissoes_pergunta_id_pergunta_tipo_usuario_idx`(`id_pergunta`, `tipo_usuario`),
    UNIQUE INDEX `uk_pergunta_tipo`(`id_pergunta`, `tipo_usuario`),
    PRIMARY KEY (`id_permissao`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `respostas` (
    `id_resposta` INTEGER NOT NULL AUTO_INCREMENT,
    `id_assistido` INTEGER NOT NULL,
    `id_pergunta` INTEGER NOT NULL,
    `resposta_texto` TEXT NULL,
    `resposta_numero` DECIMAL(15, 4) NULL,
    `resposta_data` DATE NULL,
    `resposta_boolean` BOOLEAN NULL,
    `nome_arquivo` VARCHAR(255) NULL,
    `caminho_arquivo` VARCHAR(500) NULL,
    `data_resposta` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `data_atualizacao` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `respondida_por` INTEGER NULL,
    `versao` INTEGER NOT NULL DEFAULT 1,

    INDEX `respostas_id_assistido_id_pergunta_idx`(`id_assistido`, `id_pergunta`),
    INDEX `respostas_data_resposta_idx`(`data_resposta`),
    INDEX `respostas_respondida_por_idx`(`respondida_por`),
    UNIQUE INDEX `uk_assistido_pergunta_versao`(`id_assistido`, `id_pergunta`, `versao`),
    PRIMARY KEY (`id_resposta`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `historico_respostas` (
    `id_historico` INTEGER NOT NULL AUTO_INCREMENT,
    `id_resposta` INTEGER NOT NULL,
    `resposta_anterior_texto` TEXT NULL,
    `resposta_anterior_numero` DECIMAL(15, 4) NULL,
    `resposta_anterior_data` DATE NULL,
    `resposta_anterior_boolean` BOOLEAN NULL,
    `nome_arquivo_anterior` VARCHAR(255) NULL,
    `data_alteracao` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `alterada_por` INTEGER NULL,
    `motivo_alteracao` TEXT NULL,

    INDEX `historico_respostas_id_resposta_idx`(`id_resposta`),
    INDEX `historico_respostas_data_alteracao_idx`(`data_alteracao`),
    PRIMARY KEY (`id_historico`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `assistidos` ADD CONSTRAINT `assistidos_cadastrado_por_fkey` FOREIGN KEY (`cadastrado_por`) REFERENCES `usuarios`(`id_usuario`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `categorias` ADD CONSTRAINT `categorias_criada_por_fkey` FOREIGN KEY (`criada_por`) REFERENCES `usuarios`(`id_usuario`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `perguntas` ADD CONSTRAINT `perguntas_id_categoria_fkey` FOREIGN KEY (`id_categoria`) REFERENCES `categorias`(`id_categoria`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `perguntas` ADD CONSTRAINT `perguntas_criada_por_fkey` FOREIGN KEY (`criada_por`) REFERENCES `usuarios`(`id_usuario`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `permissoes_pergunta` ADD CONSTRAINT `permissoes_pergunta_id_pergunta_fkey` FOREIGN KEY (`id_pergunta`) REFERENCES `perguntas`(`id_pergunta`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `respostas` ADD CONSTRAINT `respostas_id_assistido_fkey` FOREIGN KEY (`id_assistido`) REFERENCES `assistidos`(`id_assistido`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `respostas` ADD CONSTRAINT `respostas_id_pergunta_fkey` FOREIGN KEY (`id_pergunta`) REFERENCES `perguntas`(`id_pergunta`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `respostas` ADD CONSTRAINT `respostas_respondida_por_fkey` FOREIGN KEY (`respondida_por`) REFERENCES `usuarios`(`id_usuario`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `historico_respostas` ADD CONSTRAINT `historico_respostas_id_resposta_fkey` FOREIGN KEY (`id_resposta`) REFERENCES `respostas`(`id_resposta`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `historico_respostas` ADD CONSTRAINT `historico_respostas_alterada_por_fkey` FOREIGN KEY (`alterada_por`) REFERENCES `usuarios`(`id_usuario`) ON DELETE SET NULL ON UPDATE CASCADE;
