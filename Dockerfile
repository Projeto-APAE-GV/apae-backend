# ==================================
# Stage 1: Builder
# ==================================
FROM node:20-alpine AS builder

# Instalar dependências necessárias para Prisma e compilação
RUN apk add --no-cache openssl libc6-compat python3 make g++

WORKDIR /app

# Copiar arquivos de dependências
COPY package*.json ./
COPY prisma ./prisma/

# Instalar TODAS as dependências (incluindo dev para build)
RUN npm ci --legacy-peer-deps

# Copiar todo o código fonte
COPY . .

# Gerar Prisma Client
RUN npx prisma generate

# Build da aplicação NestJS
RUN npm run build

# Verificar se o build foi criado
RUN ls -la dist/ || (echo "ERROR: Build failed! dist/ folder not found" && exit 1)

# ==================================
# Stage 2: Production
# ==================================
FROM node:20-alpine

# Instalar PM2 globalmente e dumb-init
RUN npm install -g pm2 && \
    apk add --no-cache openssl dumb-init bash

WORKDIR /app

# Copiar package.json e package-lock.json
COPY package*.json ./

# Instalar apenas dependências de produção
RUN npm ci --only=production --legacy-peer-deps

# Copiar arquivos do builder
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/node_modules/@prisma ./node_modules/@prisma
COPY --from=builder /app/prisma ./prisma

# Copiar arquivo de configuração do PM2
COPY ecosystem.config.js ./

# Copiar script de entrypoint
COPY docker-entrypoint.sh ./
RUN chmod +x docker-entrypoint.sh

# Verificar se dist/main.js existe
RUN ls -la dist/main.js || (echo "ERROR: dist/main.js not found!" && exit 1)

# Criar usuário não-root para segurança
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nestjs -u 1001 && \
    mkdir -p /app/logs && \
    chown -R nestjs:nodejs /app

# Mudar para usuário não-root
USER nestjs

# Expor porta do backend
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=40s \
  CMD node -e "require('http').get('http://localhost:3000/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})" || exit 1

# Usar dumb-init para gerenciar sinais corretamente
ENTRYPOINT ["dumb-init", "--"]

# Usar script de entrypoint customizado
CMD ["./docker-entrypoint.sh"]