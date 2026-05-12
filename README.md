# Mandaí

**Mandaí** é um aplicativo web de **pickup de comida**: o cliente escolhe um restaurante, monta o pedido e recebe um código `MA-XXXX` com QR para apresentar no balcão. Sem entrega, sem login. O foco é encurtar ao máximo o caminho entre "decidir o que comer" e "ter o código pra retirar".

O projeto foi construído como referência pedagógica na **Live 2 da DIO PRO Vitalício Week — Especial Agentes de AI**, demonstrando as três modalidades de uso do **Claude Code** (Default, Sub-agents e Agent Teams) aplicadas a um projeto real, do design ao código rodando.

---

## Stack

| Camada | Tecnologia |
|---|---|
| Frontend (`apps/web/`) | Next.js 15 (App Router) + TypeScript |
| Backend (`apps/api/`) | Fastify + TypeScript com DDD/Clean manual |
| Banco de dados | Prisma + Neon Postgres |
| Estrutura | Monorepo simples sem workspaces; cada app é um projeto npm independente |
| Deploy alvo | Vercel (web + API serverless) |

---

## MVP

- Listagem de restaurantes próximos com filtros por categoria e busca por nome ou prato
- Cardápio com seções, fotos e customização de itens (acompanhamentos, adicionais, observações)
- Sacola persistente com aplicação opcional de cupom
- Finalização gerando código `MA-XXXX` + QR para apresentar no balcão
- Tratamento explícito de estados de erro (restaurante fechado, item esgotado, busca vazia)

Sem entrega, sem login, sem pagamento online — o cliente paga no balcão ao retirar.

---

## Como foi construído

| Etapa | Ferramenta |
|---|---|
| Design | Telas e design system gerados no **Claude Design**, exportados como handoff bundle em `design_handoff_mandai_web/` |
| Modelagem | ERD em Mermaid (`docs/erd.md`) gerado em modo **Default** do Claude Code |
| Especificação | 10 User Stories e 8 ADRs gerados por dois **sub-agents** em paralelo, em contextos isolados |
| Implementação | Time de cinco papéis (Lead, PO, Architect, Backend Dev, Frontend Dev) orquestrado pelo **Agent Teams** do Claude Code, com split panes automáticos no tmux |

---

## Estrutura do repositório

```
mandai/
├── apps/
│   ├── api/          # Fastify + DDD/Clean + Prisma
│   └── web/          # Next.js 15 App Router
├── design_handoff_mandai_web/   # referência visual (não tocar)
├── docs/
│   ├── erd.md                   # ERD em Mermaid
│   ├── adr/                     # Architecture Decision Records
│   └── user-stories/            # US-01 a US-10
├── ARQUITETURA.md               # plano arquitetural completo
└── CLAUDE.md                    # instruções para o Claude Code
```

Cada `apps/*` é um projeto npm independente — não há `package.json` raiz nem workspaces. Para trabalhar em um app, entre na pasta e rode os comandos normalmente.

---

## Setup local

### Pré-requisitos

- Node.js 20 LTS
- Conta no [Neon](https://neon.tech) (Postgres serverless, free tier)

### Backend (`apps/api`)

```bash
cd apps/api
npm install
cp .env.example .env
# edite .env com sua DATABASE_URL do Neon

npx prisma migrate deploy
npx prisma db seed
npm run dev            # http://localhost:3001
```

### Frontend (`apps/web`)

```bash
cd apps/web
npm install
cp .env.example .env.local
# edite .env.local: NEXT_PUBLIC_API_BASE_URL=http://localhost:3001

npm run dev            # http://localhost:3000
```

### Fluxo de validação

1. `curl http://localhost:3001/api/restaurants` retorna lista de restaurantes
2. `http://localhost:3000` mostra a Home com os restaurantes do seed
3. Caminho completo: Home → restaurante → adicionar item → sacola → finalizar → código `MA-XXXX`

---

## Endpoints da API

| Método | Path | Descrição |
|---|---|---|
| `GET` | `/api/restaurants` | Lista restaurantes (filtro `?category=`) |
| `GET` | `/api/restaurants/:id` | Detalhe de um restaurante e cardápio |
| `GET` | `/api/search?q=` | Busca por nome de restaurante ou prato |
| `POST` | `/api/orders` | Cria pedido, retorna código `MA-XXXX` |
| `GET` | `/api/orders/:id` | Detalhe de um pedido |

---

## Deploy (Vercel)

O deploy usa **dois projetos Vercel separados** apontando para o mesmo repositório, com `Root Directory` diferente:

| Projeto | Root Directory | Framework |
|---|---|---|
| `mandai-web` | `apps/web` | Next.js (auto) |
| `mandai-api` | `apps/api` | Other |

Variáveis de ambiente necessárias:

- `apps/api`: `DATABASE_URL` (Neon — use a integração Neon ↔ Vercel para preencher automaticamente)
- `apps/web`: `NEXT_PUBLIC_API_BASE_URL` (URL pública do projeto `mandai-api`)

---

## Documentação

| Documento | Descrição |
|---|---|
| [`ARQUITETURA.md`](./ARQUITETURA.md) | Plano arquitetural completo: camadas, DI, schema, deploy |
| [`docs/erd.md`](./docs/erd.md) | ERD em Mermaid espelhando o `schema.prisma` |
| [`docs/adr/`](./docs/adr/) | Architecture Decision Records (ADR-0001 a ADR-0008) |
| [`docs/user-stories/`](./docs/user-stories/) | US-01 a US-10 derivadas das telas do handoff |
| [`design_handoff_mandai_web/`](./design_handoff_mandai_web/) | Handoff do design: abrir o `.html` no browser para ver as 13 telas |

---

## Fora do escopo do MVP

Por decisão deliberada (ver [`docs/adr/0006-sem-autenticacao-no-mvp.md`](./docs/adr/0006-sem-autenticacao-no-mvp.md) e `ARQUITETURA.md §11`):

- Autenticação e contas de usuário
- Pagamento online
- Responsividade mobile (handoff é desktop-only, 1440px)
- Testes E2E, observabilidade, CI/CD além do deploy automático da Vercel

Cada item é candidato natural a exercício extra na mentoria.
