# 📚 Documentação — Projeto apae-backend

---

## 1. 🔍 Resumo do Projeto

O **apae-backend** é uma API REST desenvolvida em **NestJS + Prisma** que oferece funcionalidades para o gerenciamento de cadastros, prontuários e estrutura organizacional voltada a instituição APAE.

Toda a persistência de dados é feita em um banco **MySQL**.

## 2. ⚙️ Requisitos

Antes de rodar a aplicação, certifique-se de que sua máquina possui os seguintes requisitos:

- 🟩 **Node.js**: `>= 18.x`
- 📦 **npm**: `>= 9.x` (acompanha o Node.js)
- 🐬 **MySQL**: `>= 8.0`
- 🧬 **Git**: para versionamento de código
- 🛠️ **Prisma CLI**: será instalado como dependência do projeto

---

## 3. 🚀 Passo a Passo para Executar o Projeto

### 🧾 3.1 Clonar o Repositório

```bash
git clone https://github.com/Projeto-APAE-GV/apae-backend.git
cd apae-backend
```

---

### 📦 3.2 Instalar as Dependências

```bash
npm install
```

> 💡 Se estiver usando **Windows** e enfrentar conflitos de dependência:
>
> ```bash
> npm install --legacy-peer-deps
> ```

---

### ⚙️ 3.3 Configurar Variáveis de Ambiente

FaÇa uma cópia do arquivo `.env.example` e a renomeia para `.env` e configure sua conexão local com o MySQL:

```env
DATABASE_URL="mysql://root:SUA_SENHA@localhost:3306/apae_db"
```

---

### 🗂️ 3.4 Criar o Banco e Sincronizar o Schema

Você pode usar o Prisma para aplicar o schema ao banco de dados com:

```bash
npx prisma db push
```

> 🧠 Se estiver usando migrations:
>
> ```bash
> npx prisma migrate deploy
> ```

---

### 🔃 3.5 Gerar o Cliente Prisma

```bash
npx prisma generate
```

---

### 🧪 3.6 Rodar a Aplicação

Para iniciar em modo desenvolvimento com hot reload:

```bash
npm run start:dev
```

## ✅ Pronto!

A aplicação estará disponível na porta configurada no seu `.env` (por padrão, `http://localhost:3000`).

O Swagger está disponível na rota `http://localhost:3000/api`

---