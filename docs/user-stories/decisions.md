# Decisões de Produto — Mandaí

Registro de decisões não-triviais tomadas durante o desenvolvimento. Cada entrada tem data, contexto e conclusão. Não reescrever entradas existentes — apenas acrescentar.

---

## DEC-003 — Conflito entre US-11 e contrato de `discountCents = 0`

**Data:** 2026-05-14
**Solicitante:** kanban card US-11
**Decidido por:** product-owner-agent

### Contexto

O card US-11 pede que o desconto de R$10 apareça na sacola **e** na confirmação do pedido. O `CreateOrderUseCase` hoje hardcodeia `discountCents = 0` e o campo foi retirado do schema Zod de `POST /api/orders` (ver DEC-001).

### Decisão

**Implementação em duas fases:**

- **Fase A (frontend-only, sem Architect):** banner na home, estado `localStorage`, linha de desconto na tela `/sacola`. A confirmação fica sem o desconto enquanto o backend não muda — é uma inconsistência temporária conhecida e aceita.
- **Fase B (requer Architect):** `POST /api/orders` volta a aceitar `discountCents` opcional (default 0); `CreateOrderUseCase` aplica o desconto no `totalCents`; `GET /api/orders/:id` retorna o campo. Fase B só começa após alinhamento formal com o Architect.

A tela de confirmação na Fase A não deve exibir linha de desconto para evitar mostrar R$0,00 de desconto (que seria incorreto). O campo de desconto na confirmação fica oculto até a Fase B.

---

## DEC-002 — Persistência do estado "cupom resgatado" via localStorage

**Data:** 2026-05-14
**Solicitante:** kanban card US-11
**Decidido por:** product-owner-agent

### Contexto

O card US-11 diz "uma vez por sessão" mas também "sobrevive a refresh". São comportamentos diferentes: `sessionStorage` reseta a cada aba nova; `localStorage` persiste indefinidamente no dispositivo. A escolha afeta a experiência percebida.

### Decisão

**Usar `localStorage`.** Semântica desejada: o cliente que já resgatou o cupom neste device/browser não vê o banner de oferta de novo — independentemente de abrir novas abas ou voltar dias depois. Chave: `mandai:welcome_coupon_redeemed`. O wording "uma vez por sessão" no card foi interpretado como "uma vez por cliente neste device", não como sessão de browser.

---

## DEC-001 — US-07 (Cupom) fora do escopo do v0.1.0

**Data:** 2026-05-11
**Solicitante:** lead-agent
**Decidido por:** product-owner-agent

### Contexto

O lead-agent perguntou se US-07 (Aplicar cupom) deveria entrar no escopo do v0.1.0. O schema do banco já possui os campos `Order.couponCode` e `Order.discountCents`.

### Decisão

**Cupons ficam fora do v0.1.0.** Razões:

1. `ARQUITETURA.md §6.3` marca explicitamente como "(opcional no MVP)".
2. O endpoint necessário (`POST /api/coupons/validate`) **não consta em `ARQUITETURA.md §2.4`** — ausência intencional, não esquecimento.
3. O projeto é didático: adicionar um fluxo de validação de cupom (endpoint extra, estado no CartContext, lógica de desconto no backend) aumenta a complexidade sem acrescentar valor pedagógico ao tema principal (DDD/Clean Architecture).
4. Os campos `couponCode` e `discountCents` no schema já garantem que a feature pode ser adicionada em v0.2 sem migração.

### Consequências para implementação

- **Backend:** `POST /api/orders` aceita `couponCode` no body mas **ignora-o** — grava `null` / `0`. Não criar endpoint `/api/coupons/validate`.
- **Frontend:** A tela `/sacola` **não exibe** o campo de cupom no v0.1.0. O `CartContext` não precisa de `couponCode` no estado.
- **Schema:** Manter `Order.couponCode` e `Order.discountCents` como nullable — não remover, pois são carga zero e facilitam v0.2.
