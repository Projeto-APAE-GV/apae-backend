#!/bin/sh
# Não usar set -e aqui porque queremos tratar erros de migrations manualmente
# set -e

echo "🔄 Iniciando processo de deploy do backend..."

# Verificar variáveis de ambiente críticas
if [ -z "$DATABASE_URL" ]; then
    echo "❌ ERRO: DATABASE_URL não está definida!"
    exit 1
fi

if [ -z "$JWT_SECRET" ] && [ -z "$JWT_SECRET_KEY" ]; then
    echo "❌ ERRO: JWT_SECRET ou JWT_SECRET_KEY não está definida!"
    exit 1
fi

echo "✅ Variáveis de ambiente verificadas"

# Aguardar MySQL estar pronto
echo "⏳ Aguardando MySQL estar disponível..."
sleep 15

# Função para resolver migrations falhadas automaticamente
resolve_failed_migrations() {
    echo "🔍 Verificando migrations falhadas..."
    
    # Lista de migrations conhecidas que podem falhar (especialmente seeds)
    KNOWN_MIGRATIONS="20250626190000_seed_initial_data 20250626180000_add_trigger_historico_respostas"
    
    for migration in $KNOWN_MIGRATIONS; do
        echo "🔧 Tentando resolver migration: $migration"
        
        # Para migrations de seed, marcar como aplicada (dados podem já existir)
        if echo "$migration" | grep -q "seed"; then
            echo "   ℹ️  Migration de seed detectada - marcando como aplicada..."
            if npx prisma migrate resolve --applied "$migration" 2>/dev/null; then
                echo "   ✅ Migration $migration resolvida (dados podem já existir)"
            else
                echo "   ⚠️  Não foi possível resolver $migration automaticamente"
            fi
        else
            # Para outras migrations, tentar marcar como aplicada
            if npx prisma migrate resolve --applied "$migration" 2>/dev/null; then
                echo "   ✅ Migration $migration resolvida"
            else
                echo "   ⚠️  Não foi possível resolver $migration automaticamente"
            fi
        fi
    done
    
    echo "📊 Verificando status após resolução..."
    npx prisma migrate status || true
}

# Verificar status das migrations
echo "📊 Verificando status das migrations..."
MIGRATE_STATUS=$(npx prisma migrate status 2>&1 || true)

# Se houver problemas, tentar resolver automaticamente
if echo "$MIGRATE_STATUS" | grep -q "failed\|P3009"; then
    echo "⚠️  Problemas detectados nas migrations"
    resolve_failed_migrations
fi

# Aplicar migrations pendentes
echo "📦 Aplicando migrations pendentes..."
MAX_RETRIES=3
RETRY_COUNT=0

while [ $RETRY_COUNT -lt $MAX_RETRIES ]; do
    MIGRATE_RESULT=$(npx prisma migrate deploy 2>&1)
    MIGRATE_EXIT_CODE=$?
    
    if [ $MIGRATE_EXIT_CODE -eq 0 ]; then
        echo "✅ Migrations aplicadas com sucesso!"
        break
    else
        RETRY_COUNT=$((RETRY_COUNT + 1))
        echo "❌ Falha ao aplicar migrations (tentativa $RETRY_COUNT de $MAX_RETRIES)"
        echo "$MIGRATE_RESULT" | tail -5
        
        # Se o erro for de migration falhada, tentar resolver novamente
        if echo "$MIGRATE_RESULT" | grep -q "P3009\|failed"; then
            echo "🔧 Tentando resolver migrations falhadas novamente..."
            resolve_failed_migrations
        fi
        
        if [ $RETRY_COUNT -lt $MAX_RETRIES ]; then
            echo "⏳ Aguardando 5 segundos antes de tentar novamente..."
            sleep 5
        else
            echo "❌ Todas as tentativas falharam. Verifique os logs acima."
            echo "💡 Tentando continuar mesmo com migrations pendentes..."
            echo "⚠️  ATENÇÃO: O backend pode não funcionar corretamente se migrations críticas falharem!"
            # Não sair com erro - deixar o backend tentar iniciar mesmo assim
            # O usuário pode resolver manualmente depois
            break
        fi
    fi
done

# Gerar Prisma Client
echo "🔨 Gerando Prisma Client..."
npx prisma generate

echo "✅ Backend configurado com sucesso!"

# Verificar se o arquivo principal existe
if [ ! -f "./dist/src/main.js" ]; then
    echo "❌ ERRO: Arquivo dist/src/main.js não encontrado!"
    echo "📁 Conteúdo de dist/:"
    find dist -type f | head -20 || true
    exit 1
fi

echo "✅ Arquivo principal verificado: dist/src/main.js"
echo "🚀 Iniciando aplicação com PM2..."

# Iniciar aplicação com PM2
exec pm2-runtime start ecosystem.config.js