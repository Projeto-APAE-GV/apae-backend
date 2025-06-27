-- Índices para otimizar performance dos endpoints

-- usuarios: busca por nome e relatórios
CREATE INDEX idx_usuarios_nome ON usuarios(nome);
CREATE INDEX idx_usuarios_data_criacao ON usuarios(data_criacao);
CREATE INDEX idx_usuarios_ultimo_acesso ON usuarios(ultimo_acesso);

-- assistidos: filtros geográficos e demográficos
CREATE INDEX idx_assistidos_cidade_estado ON assistidos(cidade, estado);
CREATE INDEX idx_assistidos_data_nascimento ON assistidos(data_nascimento);
CREATE INDEX idx_assistidos_nome_responsavel ON assistidos(nome_responsavel);

-- categorias: busca por nome e criador
CREATE INDEX idx_categorias_nome ON categorias(nome_categoria);
CREATE INDEX idx_categorias_criada_por ON categorias(criada_por);

-- perguntas: busca textual e ordenação
CREATE INDEX idx_perguntas_criada_por ON perguntas(criada_por);
CREATE INDEX idx_perguntas_categoria_ordem ON perguntas(id_categoria, ordem_categoria);

-- respostas: versão e relatórios
CREATE INDEX idx_respostas_versao ON respostas(versao);
CREATE INDEX idx_respostas_data_atualizacao ON respostas(data_atualizacao);
CREATE INDEX idx_respostas_pergunta_data ON respostas(id_pergunta, data_resposta);

-- historico_respostas: usuário e período
CREATE INDEX idx_historico_alterada_por ON historico_respostas(alterada_por);
CREATE INDEX idx_historico_data_resposta ON historico_respostas(data_alteracao, id_resposta); 