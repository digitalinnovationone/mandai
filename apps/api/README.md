# Mandaí API

Backend Fastify + TypeScript para o app de pedidos por pickup Mandaí.

## Stack

- **Fastify 5** — servidor HTTP performático e tipado
- **fastify-type-provider-zod** — validação de payload/querystring/params via Zod
- **Prisma 5 + Neon Postgres** — ORM + banco de dados serverless
- **TypeScript 5** — tipagem end-to-end

## Estrutura de pastas

```
src/
├── server.ts                       # entrypoint local (app.listen)
├── app.ts                          # buildApp(): Fastify + rotas + CORS + erros
├── api/index.ts                    # handler Vercel (warm-start)
├── shared/
│   ├── prisma.ts                   # singleton PrismaClient
│   └── errors.ts                   # HttpError
└── modules/ordering/               # único bounded context
    ├── domain/                     # entidades puras + interfaces de repo
    ├── application/use-cases/      # casos de uso (1 arquivo = 1 caso)
    ├── infra/                      # repos Prisma (toDomain() inline)
    ├── http/ordering.routes.ts     # plugin Fastify com todos os endpoints
    └── ordering.module.ts          # factory de DI manual
```

## Configuração local

### 1. Banco de dados (Neon Postgres — obrigatório)

Esta API requer PostgreSQL. Recomendamos o [Neon](https://neon.tech) (tier gratuito):

1. Crie uma conta em [neon.tech](https://neon.tech).
2. Crie um projeto e copie a connection string (formato `postgresql://...`).
3. Crie o arquivo `.env` a partir do exemplo:

```bash
cp .env.example .env
```

4. Preencha `DATABASE_URL` no `.env`:

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/mandai?sslmode=require"
PORT=3001
```

> **Nota:** Não há fallback para SQLite — o schema usa tipos e operações específicos do PostgreSQL (ex: `mode: 'insensitive'` no Prisma). Usar o Neon free tier é a forma mais simples de ter Postgres sem instalar nada localmente.

### 2. Instalar dependências

```bash
npm install
```

### 3. Rodar migrações e seed

```bash
npm run db:migrate   # aplica as migrações (cria as tabelas)
npm run db:seed      # popula com 8 restaurantes e ~40 itens
```

### 4. Iniciar o servidor

```bash
npm run dev          # tsx watch — hot reload
```

O servidor sobe em `http://localhost:3001`.

## Endpoints

| Método | Path | Descrição |
|--------|------|-----------|
| `GET` | `/api/restaurants` | Lista restaurantes (filtro `?category=pizza`) |
| `GET` | `/api/restaurants/:id` | Detalhes do restaurante + cardápio completo |
| `GET` | `/api/search?q=` | Busca em restaurantes e pratos |
| `POST` | `/api/orders` | Cria pedido, gera código `MA-XXXX` e QR payload |
| `GET` | `/api/orders/:id` | Consulta pedido por ID |
| `GET` | `/health` | Health check |

### Exemplo — criar pedido

```bash
curl -X POST http://localhost:3001/api/orders \
  -H "Content-Type: application/json" \
  -d '{
    "restaurantId": "<id>",
    "customerName": "Marina",
    "items": [
      {
        "menuItemId": "<itemId>",
        "qty": 1,
        "note": "Bem tostado, por favor.",
        "modifiers": []
      }
    ]
  }'
```

Resposta inclui `code` (ex: `MA-7K2D`), `qrPayload` e `estimatedReadyAt`.

## Código de retirada (`MA-XXXX`)

Formato: `MA-` seguido de 4 caracteres alfanuméricos maiúsculos, excluindo caracteres ambíguos (`0`, `O`, `1`, `I`). Gerado pelo backend em `create-order.ts`.

## Deploy na Vercel

1. Crie um projeto Vercel com **Root Directory** = `apps/api`.
2. Configure a env var `DATABASE_URL` no painel da Vercel (ou use a integração Neon ↔ Vercel).
3. O `vercel.json` já está configurado com o rewrite catch-all e a função serverless em `src/api/index.ts`.

## Scripts disponíveis

| Script | O que faz |
|--------|-----------|
| `npm run dev` | Inicia com tsx watch (hot reload) |
| `npm run build` | Verifica tipos com `tsc --noEmit` |
| `npm run db:migrate` | Aplica migrações Prisma |
| `npm run db:seed` | Popula banco com dados de exemplo |
| `npm run db:studio` | Abre o Prisma Studio (GUI para o banco) |
| `npm run db:generate` | Regenera o Prisma Client após mudança no schema |
