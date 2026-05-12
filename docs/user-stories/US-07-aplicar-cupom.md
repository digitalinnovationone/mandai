# US-07 Aplicar cupom

> **[OPCIONAL MVP]** Esta funcionalidade pode ser deixada de fora da primeira entrega. O campo de cupom aparece na UI da sacola, mas a validação no backend é opcional.

**Como** cliente, **quero** inserir um código de cupom na sacola, **para** receber desconto no meu pedido.

---

## Telas relacionadas do handoff

- `screen-cart.jsx` — coluna de resumo do pedido. Contém campo de texto com ícone de ticket e botão "Aplicar". Quando válido, exibe linha "Cupom MANDA20 − R$ 12,96" em vermelho tomate no resumo.
- `screen-confirm.jsx (DoneState)` — a confirmação mostra o cupom aplicado na lista de totais ("Cupom MANDA20 − R$ 12,96").

## Fluxo principal

1. Cliente está na sacola (`/sacola`) com itens.
2. Digita um código de cupom no campo dedicado (ex: "MANDA20").
3. Clica "Aplicar".
4. O sistema valida o código no backend e retorna o valor de desconto.
5. A linha de desconto aparece no resumo e o total é recalculado.

## Notas de produto

- Endpoint esperado pelo handoff: `POST /api/coupons/validate { code, cart }` — retorna `{ valid, discountAmount, label }`. Este endpoint está no handoff README mas fora do `ARQUITETURA.md §2.4` — é o que confirma o caráter opcional.
- Código inválido deve exibir mensagem de erro no próprio campo.
- O código aplicado é salvo no estado da sacola (`Cart.couponCode`).
- No pedido final, `Order.couponCode` e `Order.discountCents` guardam o snapshot (conforme ERD).
- Esta US não cobre criação ou gestão de cupons — apenas o uso pelo cliente.

---

## Decisão — 2026-05-11

**US-07 está fora do escopo do v0.1.0** (ver `docs/user-stories/decisions.md` DEC-001).

- A tela `/sacola` não exibe o campo de cupom no v0.1.0.
- O `POST /api/orders` aceita `couponCode` no body mas o ignora (grava `null`/`0`).
- O endpoint `POST /api/coupons/validate` não será criado nesta versão.
- Os campos `Order.couponCode` e `Order.discountCents` permanecem no schema (nullable) para facilitar a implementação em v0.2 sem migração.
