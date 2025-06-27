CREATE TRIGGER tr_respostas_before_update
BEFORE UPDATE ON respostas
FOR EACH ROW
BEGIN
    INSERT INTO historico_respostas (
        id_resposta,
        resposta_anterior_texto,
        resposta_anterior_numero,
        resposta_anterior_data,
        resposta_anterior_boolean,
        nome_arquivo_anterior,
        alterada_por
    ) VALUES (
        OLD.id_resposta,
        OLD.resposta_texto,
        OLD.resposta_numero,
        OLD.resposta_data,
        OLD.resposta_boolean,
        OLD.nome_arquivo,
        NEW.respondida_por
    );

    SET NEW.versao = OLD.versao + 1;
END;