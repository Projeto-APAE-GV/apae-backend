-- Inserir usuário administrador padrão
INSERT INTO usuarios (nome, email, senha_hash, tipo_usuario) VALUES
('Administrador', 'admin@apae.com', '$2b$10$yA93LW6RvCI6igFViW3AqO7SEh2bMMG80dAdnJc4dpSTi7.C1WV4q', 'secretaria');

-- Inserir categorias padrão
INSERT INTO categorias (nome_categoria, descricao, ordem_exibicao, criada_por) VALUES
('Identificação Pessoal', 'Dados básicos de identificação do assistido', 1, 1),
('Dados Familiares', 'Informações sobre a composição e situação familiar', 2, 1),
('Situação Socioeconômica', 'Dados sobre renda, habitação e condições sociais', 3, 1),
('Histórico Médico', 'Informações médicas e de saúde', 4, 1),
('Avaliação Psicológica', 'Dados de avaliação psicológica', 5, 1),
('Desenvolvimento Educacional', 'Informações sobre escolaridade e desenvolvimento', 6, 1),
('Terapias e Tratamentos', 'Dados sobre terapias e tratamentos realizados', 7, 1),
('Acompanhamento Social', 'Informações do acompanhamento social', 8, 1),
('Documentação', 'Controle de documentos e anexos', 9, 1),
('Observações Gerais', 'Observações e anotações diversas', 10, 1);

-- Inserir algumas perguntas exemplo para a categoria "Identificação Pessoal"
INSERT INTO perguntas (id_categoria, texto_pergunta, tipo_resposta, obrigatoria, ordem_categoria, criada_por) VALUES
(1, 'Nome completo', 'texto', TRUE, 1, 1),
(1, 'Data de nascimento', 'data', TRUE, 2, 1),
(1, 'Sexo', 'opcao_unica', TRUE, 3, 1),
(1, 'CPF', 'texto', FALSE, 4, 1),
(1, 'RG', 'texto', FALSE, 5, 1),
(1, 'Estado civil', 'opcao_unica', FALSE, 6, 1),
(1, 'Telefone de contato', 'texto', FALSE, 7, 1),
(1, 'Email', 'texto', FALSE, 8, 1);

-- Atualizar pergunta de sexo com opções
UPDATE perguntas
SET opcoes_resposta = JSON_ARRAY('Masculino', 'Feminino', 'Outro')
WHERE texto_pergunta = 'Sexo';

-- Atualizar pergunta de estado civil com opções
UPDATE perguntas
SET opcoes_resposta = JSON_ARRAY('Solteiro(a)', 'Casado(a)', 'União Estável', 'Divorciado(a)', 'Viúvo(a)')
WHERE texto_pergunta = 'Estado civil';

-- Inserir permissões padrão (todos podem ver e responder às perguntas básicas)
INSERT INTO permissoes_pergunta (id_pergunta, tipo_usuario, pode_visualizar, pode_editar, pode_responder)
SELECT
    p.id_pergunta,
    'secretaria' as tipo_usuario,
    TRUE as pode_visualizar,
    TRUE as pode_editar,
    TRUE as pode_responder
FROM perguntas p
WHERE p.id_categoria = 1;

INSERT INTO permissoes_pergunta (id_pergunta, tipo_usuario, pode_visualizar, pode_editar, pode_responder)
SELECT
    p.id_pergunta,
    'assistente' as tipo_usuario,
    TRUE as pode_visualizar,
    FALSE as pode_editar,
    TRUE as pode_responder
FROM perguntas p
WHERE p.id_categoria = 1;

INSERT INTO permissoes_pergunta (id_pergunta, tipo_usuario, pode_visualizar, pode_editar, pode_responder)
SELECT
    p.id_pergunta,
    'psicologa' as tipo_usuario,
    TRUE as pode_visualizar,
    TRUE as pode_editar,
    TRUE as pode_responder
FROM perguntas p
WHERE p.id_categoria = 1; 