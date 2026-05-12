# Decisões de Produto — Mandaí

Registro de decisões não-triviais tomadas durante o desenvolvimento. Cada entrada tem data, contexto e conclusão. Não reescrever entradas existentes — apenas acrescentar.

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
