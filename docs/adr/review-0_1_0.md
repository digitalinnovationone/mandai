# Revisão de Aderência Arquitetural — v0.1.0

- **Data:** 2026-05-11
- **Revisado por:** architect-agent
- **Escopo:** `apps/api/` e `apps/web/` — implementação completa do release v0.1.0
- **Referências:** ARQUITETURA.md, ADRs 0001–0008, CLAUDE.md

---

## Veredicto geral

✅ **APROVADO.** A implementação está dentro do envelope definido pelos ADRs 0001–0008 e pelo ARQUITETURA.md. Nenhum anti-pattern listado no CLAUDE.md foi introduzido. Os contratos de produto obrigatórios (sacola mono-restaurante, código MA-XXXX, rotas PT, endpoints REST) estão todos presentes e corretos.

---

## Backend (`apps/api/`)

### Estrutura de pastas (§2.1) ✅

Espelha exatamente o template do ARQUITETURA.md:

```
src/
  server.ts, app.ts, api/index.ts
  modules/ordering/
    domain/entities/, domain/value-objects/, domain/repositories/
    application/use-cases/ (5 use cases)
    infra/ (2 Prisma repos)
    http/ordering.routes.ts
    ordering.module.ts
  shared/prisma.ts, shared/errors.ts
```

### Injeção de dependência manual (§2.3) ✅

`ordering.module.ts` implementa `buildOrderingModule(prisma)` exatamente como especificado: sem container, sem decorators, wiring explícito de todos os 5 use cases. O aluno enxerga quem depende de quem em 25 linhas.

### Camadas Clean Architecture (§2.2) ✅

- **Domain:** nenhum import de Fastify ou Prisma — camada pura confirmada via grep.
- **Application:** use cases lançam `HttpError` diretamente; sem Result/Either pattern (ADR-0005 ✅).
- **Infra:** `toDomain()` inline no fim de cada repositório (sem classe Mapper separada — ADR-0005 ✅). `PrismaRestaurantRepository` tem dois helpers: `toDomain()` (sem seções) e `toDomainWithSections()` — variação justificada pelo contexto de uso diferente (list vs. detail).
- **HTTP:** `ordering.routes.ts` é plugin Fastify; validação via Zod + `fastify-type-provider-zod`.

### Endpoints (§2.4) ✅

| Endpoint | Status |
|---|---|
| `GET /api/restaurants` (com `?category=`) | ✅ |
| `GET /api/restaurants/:id` | ✅ |
| `GET /api/search?q=` | ✅ |
| `POST /api/orders` (retorna 201) | ✅ |
| `GET /api/orders/:id` | ✅ |
| `GET /health` (não previsto em §2.4, adição válida) | ✅ |

### Código de retirada (CLAUDE.md contrato) ✅

`generatePickupCode()` usa alfabeto `ABCDEFGHJKLMNPQRSTUVWXYZ23456789` — sem `0`, `O`, `1`, `I`. Formato `MA-XXXX` correto.

### Schema Prisma (§4.1) ✅

Todos os 5 modelos presentes. Schema é mais rico que o mínimo do §4.1 (campos adicionados: `address`, `neighborhood`, `phone` em `Restaurant`; `customerName`, `subtotalCents`, `discountCents`, `couponCode`, `qrPayload`, `estimatedReadyAt` em `Order`; `note` em `OrderItem`). Todos os campos são product-sensíveis e o `docs/erd.md` foi atualizado para refletir o schema atual — cumprindo a regra de co-commit do ADR-0007 ✅.

- `modifiers` como JSON em `OrderItem` ✅ (ADR-0004)
- `nameSnapshot` + `priceCentsSnapshot` para integridade histórica ✅ (ADR-0004)

### Vercel warm-start (§5.2) ✅

`src/api/index.ts` implementa o padrão singleton exato do §5.2. `vercel.json` com rewrite catch-all e `maxDuration: 10` corretos.

### CORS ✅

`app.ts` lê `CORS_ORIGIN` do ambiente. Log de aviso em produção quando `CORS_ORIGIN === '*'`. `.env.example` deve documentar `CORS_ORIGIN` (item de pré-produção, ver seção de Observações).

---

## Frontend (`apps/web/`)

### Estrutura de pastas (§3.1) ✅

```
src/
  app/ (layout, providers, 6 rotas)
  modules/restaurants/, modules/cart/, modules/orders/
  shared/components/, shared/lib/, shared/types.ts
  styles/tokens.css, styles/app.css
```

### Rotas (§3.1) ✅ — caminhos em português conforme especificado

| Rota | Arquivo |
|---|---|
| `/` | `app/page.tsx` |
| `/categoria/[slug]` | `app/categoria/[slug]/page.tsx` |
| `/restaurante/[id]` | `app/restaurante/[id]/page.tsx` |
| `/busca` | `app/busca/page.tsx` |
| `/sacola` | `app/sacola/page.tsx` |
| `/confirmacao/[orderId]` | `app/confirmacao/[orderId]/page.tsx` |

### Server Components por padrão (§3.2) ✅

Nenhum `page.tsx` tem `'use client'`. Todas as páginas de listagem/detalhe são async Server Components que chamam `fetch()` via service functions diretamente. Zero TanStack Query nas páginas.

### `'use client'` restrito a componentes interativos (§3.2) ✅

14 arquivos com `'use client'`, todos justificados:
- Contexto e state: `context.tsx`, `providers.tsx`
- Componentes interativos: `CartPageClient`, `RestaurantPageClient`, `ConfirmationClient`, `AddItemModal`, `MiniCart`, `ClearCartModal`, `AppHeader`
- Hooks client-side: `useCreateOrder`, `useRestaurants`, `useRestaurant`
- Error boundaries (Next.js obriga `'use client'`): `error.tsx` × 3

### CartContext (§3.2, CLAUDE.md) ✅

- `useReducer` + sincronização `localStorage` — sem Zustand (grep confirma zero ocorrências)
- `CartState` sem `couponCode` (US-07 fora de escopo ✅)
- Contrato mono-restaurante implementado: `restaurantId: string | null`, helper `wouldSwitchRestaurant()`, flag `force` no `ADD_ITEM` para ClearCartModal

### TanStack Query (§3.2) ✅

- `QueryClientProvider` em `providers.tsx`
- Usado **somente** para `useCreateOrder` (mutation) — exatamente como especificado em §3.2
- Listagens de restaurantes usam `fetch()` server-side direto

### Contratos de produto (CLAUDE.md) ✅

- **QR Code:** `ConfirmationClient` usa `QRCodeSVG` de `qrcode.react` renderizando `order.qrPayload` do backend ✅
- **Código MA-XXXX:** exibido em `var(--font-mono)` na tela de confirmação ✅
- **Sacola mono-restaurante:** `ClearCartModal` implementado ✅

### Design tokens e ícones (CLAUDE.md design system) ✅

- `src/styles/tokens.css` e `app.css` copiados do handoff e importados em `globals.css`
- Uso de tokens: `var(--tomate-*)` em CTAs/accents, `var(--folha-*)` em estados positivos, `var(--manga-*)` em badges — revisado no `page.tsx` home e `ConfirmationClient`
- Todos os ícones via `lucide-react` (ArrowRight, Check, Flame, Star, Clock, etc.) ✅
- `next.config.ts` com `remotePatterns` para `images.unsplash.com` ✅

### Env var de API (§5.3) ✅

`shared/lib/api.ts` lê `process.env.NEXT_PUBLIC_API_BASE_URL` com fallback `http://localhost:3001`.

---

## Desvios capturados em ADRs anteriores

Todos os desvios identificados durante o desenvolvimento já foram documentados:

| Desvio | ADR |
|---|---|
| Fastify 5 (exigido por `fastify-type-provider-zod@4`) | ADR-0008 ✅ |
| `GET /health` (não previsto em §2.4) | Adição válida — não gera ADR |
| `CORS_ORIGIN = "*"` em dev com aviso em prod | Item de pré-produção — não gera ADR |
| `Math.random()` em `generatePickupCode()` | Aceitável para MVP — não gera ADR |
| Search usa `mode: 'insensitive'` (PostgreSQL-only) | Alinhado com ADR-0004 |

---

## Observações (sem bloqueio para deploy)

Estas observações não são violações arquiteturais, mas são registradas para visibilidade:

### OBS-1: `useRestaurants` e `useRestaurant` são dead code

Os hooks existem em `modules/restaurants/hooks/` mas não são importados por nenhum componente. As páginas usam corretamente `fetchXxx()` direto no servidor. Os hooks podem ser mantidos como "disponíveis para uso futuro em Client Components" ou removidos numa limpeza pós-MVP. Sem impacto funcional.

### OBS-2: Imagens hero/cards usam `background-image` CSS em vez de `next/image`

O `page.tsx` da Home e as páginas de categoria/busca usam `style={{ backgroundImage: url(...) }}` para fotos decorativas (hero circles, restaurant cards). O ADR-0003 lista `next/image` como benefício (WebP, lazy loading, blur placeholder). O `ConfirmationClient` e o modal usam URLs Unsplash diretas também. `next/image` está configurado e disponível; seu uso ficou concentrado em imagens de produto. Decisão aceitável para imagens decorativas usadas como background CSS — `background-image` não tem equivalente direto em `next/image`.

### OBS-3: `Restaurant.ensureOpen()` definida mas não chamada no use case

A entidade `Restaurant` tem o método `ensureOpen()` como regra de domínio, mas `CreateOrderUseCase.execute()` verifica `!restaurant.isOpen` diretamente e lança `HttpError`. A lógica está correta; há apenas uma ligeira inconsistência entre método de domínio e uso direto na camada de aplicação. Sugestão pós-MVP: chamar `restaurant.ensureOpen()` no use case (e fazer o método lançar `HttpError` ou deixar o use case capturar a exceção simples).

### OBS-4: `qrPayload` hardcoda domínio `mandai.app`

Em `create-order.ts`: `const qrPayload = \`https://mandai.app/r/${code}\`;`. O domínio não é configurável via variável de ambiente. Para o MVP educacional está OK; antes do deploy em produção, considerar `process.env.APP_URL ?? 'https://mandai.app'`.

### OBS-5: `CORS_ORIGIN` e `APP_URL` devem estar em `.env.example`

O código já consome `CORS_ORIGIN` via `process.env`. Verificar que `apps/api/.env.example` documenta `CORS_ORIGIN=` e idealmente `APP_URL=` antes do deploy.

---

## Checklist pré-deploy

- [ ] `apps/api/.env.example` documenta `CORS_ORIGIN` e `APP_URL`
- [ ] `CORS_ORIGIN` configurado no projeto Vercel da API com a URL real do frontend
- [ ] Neon database conectado e `DATABASE_URL` populado via integração Neon ↔ Vercel
- [ ] `NEXT_PUBLIC_API_BASE_URL` configurado no projeto Vercel do web com a URL real da API
- [ ] `prisma migrate deploy` executado contra o banco Neon de produção
- [ ] `prisma/seed.ts` executado para popular dados iniciais (ou dados reais cadastrados)
- [ ] Dois projetos Vercel configurados com Root Directory correto (`apps/web`, `apps/api`) per §5.1

---

## Conclusão

A implementação v0.1.0 está arquiteturalmente sólida. O código é coerente com os objetivos didáticos do projeto: DDD/Clean explícito, DI sem mágica, separação de camadas visível, Server Components por padrão. Nenhum anti-pattern do CLAUDE.md foi introduzido. As observações acima são melhorias incrementais, nenhuma bloqueia o primeiro deploy.
