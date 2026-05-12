# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Current state

**v0.1.0 implementado e revisado arquiteturalmente.** O fluxo completo de pedido pickup funciona de ponta a ponta — da home ao código `MA-XXXX`. Build limpo, lint zero.

O que existe:

- `apps/api` — Fastify 5 + TypeScript, bounded context `ordering` em DDD/Clean, Prisma 5 + Neon Postgres. 5 endpoints operacionais + `/health`.
- `apps/web` — Next.js 15 App Router + TypeScript. 6 rotas implementadas: `/`, `/categoria/[slug]`, `/restaurante/[id]`, `/busca`, `/sacola`, `/confirmacao/[orderId]`.
- `docs/` — 8 ADRs, ERD (`docs/erd.md`), user stories (`docs/user-stories/`), release notes (`docs/release/0_1_0.md`).
- `design_handoff_mandai_web/` — protótipo hi-fi (referência visual; não modificar, não buildar).

**Não implementado — adiado para v0.2 (intencional):**

- Scrollspy na nav de seções do restaurante (`TEC-005` no release notes)
- Modifier groups no schema Prisma + UI do `AddItemModal` (`TEC-006`)
- Fluxo de cupom (US-07) — campos `couponCode` / `discountCents` existem no schema mas `discountCents` é sempre 0
- Rate limiting em `POST /api/orders`
- Retry loop de colisão no gerador `MA-XXXX`
- Testes unitários dos use cases
- Deploy Vercel + Neon (pré-requisitos em `docs/release/0_1_0.md`)

## Target stack (per ARQUITETURA.md)

- **Monorepo sem workspaces**: `apps/web` e `apps/api` como projetos npm independentes. `cd` em um deles, `npm install`, `npm run dev`. Sem turborepo/workspaces — clareza didática intencional.
- **Frontend** (`apps/web`): Next.js 15 App Router + TypeScript. Server Components por padrão; `'use client'` só em bits interativos (cart, modal de item). TanStack Query apenas para mutations client-side / leituras que dependem do cart. Cart é `Context + useReducer + localStorage` — **sem Zustand**.
- **Backend** (`apps/api`): Fastify 5 + TypeScript, bounded context único `ordering`, quatro camadas explícitas (`domain`, `application`, `infra`, `http`). DI manual via factory `buildOrderingModule(prisma)` — **sem decorators, sem DI container**. Validação com `zod` + `fastify-type-provider-zod`. Erros são `HttpError` lançados — **sem Result pattern**.
- **DB**: Prisma 5 + Neon Postgres. `OrderItem.modifiers` é JSON. Itens de pedido fazem snapshot de `name` e `priceCents` para preservar histórico. SQLite não é fallback válido — `mode: 'insensitive'` na busca é Postgres-only.
- **Deploy**: dois projetos Vercel separados no mesmo repo com Root Directory diferente. A API usa catch-all rewrite em uma única function que sobe um singleton Fastify (warm-start em `apps/api/src/api/index.ts`).

## Things that look like patterns but aren't (avoid)

`ARQUITETURA.md` é explícito sobre o que *não* introduzir — o projeto ensina DDD/Clean a uma audiência básica e complexidade derrota o propósito:

- Sem Result/Either — lançar `HttpError`.
- Sem classes Mapper explícitas — função `toDomain()` inline no final de cada repo Prisma.
- Sem múltiplos bounded contexts — tudo vive em `modules/ordering/`.
- Sem domain events, sem CQRS.
- Sem auth no MVP. Sem pagamento online (pickup paga no balcão). Sem mobile/responsivo (handoff é desktop 1440px).
- Não adicionar Zustand ou qualquer lib de state management no frontend.

Se uma tarefa parece pedir um desses, questionar antes de adicionar.

## Design system is the source of truth

Tokens em `apps/web/src/styles/tokens.css` e estilos compartilhados em `apps/web/src/styles/app.css` (copiados verbatim do handoff). **Reutilizar as custom properties CSS literalmente — não inventar novos valores de cor, espaçamento ou radius.** Regras de cor:

- `--tomate-*` apenas em CTAs e acentos (nunca headings).
- `--folha-*` apenas para estados positivos (aberto, grátis, confirmação).
- `--manga-*` apenas para acentos de promo/badge (com parcimônia).

Fontes: Bricolage Grotesque (display), Plus Jakarta Sans (body), JetBrains Mono (preços, códigos de retirada, distâncias). Tracking apertado em headings (`-0.025em` a `-0.035em`).

Ícones usam `lucide-react` (não SVG inline). URLs Unsplash do handoff são placeholder — produção deve substituir por fotos licenciadas.

## Key product contracts

- **Cart é mono-restaurante.** Adicionar item de restaurante diferente com cart não-vazio deve exibir o `ClearCartModal` (confirmação de limpeza). Lógica em `wouldSwitchRestaurant()` dentro de `apps/web/src/modules/cart/context.tsx`.
- **Formato do código de retirada**: `MA-XXXX`, charset `ABCDEFGHJKLMNPQRSTUVWXYZ23456789` (sem `0`/`O`, sem `1`/`I`). Gerado pelo backend em `CreateOrderUseCase`.
- **QR code** usa `qrcode.react` sobre o campo `qrPayload` retornado pelo backend — não é decorativo.
- **`discountCents` é sempre 0** — regra vive em `CreateOrderUseCase`, não no caller. O campo está removido do schema Zod do `POST /api/orders`; qualquer valor enviado é rejeitado na validação.
- **Rotas** (caminhos em português): `/`, `/categoria/[slug]`, `/restaurante/[id]`, `/busca`, `/sacola`, `/confirmacao/[orderId]`.
- **Endpoints** (REST, todos sob `/api/`): `GET /restaurants` (com `?category=`), `GET /restaurants/:id`, `GET /search?q=`, `POST /orders`, `GET /orders/:id`, `GET /health`.

## Where to look first

- Decisões de arquitetura, layout de pastas, wiring de DI, schema, ADRs → `ARQUITETURA.md` (seções numeradas; citá-las ao discutir decisões).
- Intenção visual, tom de cópia ("coloquial paulistano"), detalhes de interação → `design_handoff_mandai_web/README.md`.
- Layout de uma tela específica como referência de porting → `design_handoff_mandai_web/src/screen-*.jsx`.
- As 13 telas → abrir `design_handoff_mandai_web/Mandai - Hi-fi Web.html` no browser (canvas pan/zoom, double-click para focar, Esc para sair).
- Wiring de DI do backend → `apps/api/src/modules/ordering/ordering.module.ts`.
- Rotas HTTP + schemas Zod → `apps/api/src/modules/ordering/http/ordering.routes.ts`.
- Lógica do cart → `apps/web/src/modules/cart/context.tsx`.
- Decisões de negócio tomadas durante o v0.1.0 (escopo do cupom, id vs slug, etc.) → tabela "Dúvidas" em `docs/release/0_1_0.md`.
- Log de riscos + candidatos para v0.2 → seção "Riscos mapeados" e "Próximo passo" em `docs/release/0_1_0.md`.

## Documentation discipline

Três docs são load-bearing e devem ficar em sincronia:

- `docs/erd.md` — `erDiagram` Mermaid espelhando `schema.prisma`. **Um PR que altera `schema.prisma` deve atualizar `docs/erd.md` no mesmo commit.**
- `docs/adr/` — um arquivo Markdown imutável por decisão, numerado (0001–0008 existem). Para mudar uma decisão, escrever um novo ADR que seta `Status: Superseded by ADR-NNNN` no antigo.
- `docs/user-stories/` — US-01 a US-10, um arquivo cada.
