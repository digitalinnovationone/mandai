# US-11 Resgatar cupom de boas-vindas

**Como** cliente, **quero** resgatar um cupom de R$10 de desconto direto na home, **para** economizar no meu primeiro pedido sem precisar digitar código nenhum.

---

## Telas relacionadas do handoff

- `screen-home.jsx` — a home já prevê um "banner de cupom em destaque" entre as categorias e o grid de restaurantes (citado nas notas da US-01). Este banner é o ponto de entrada do fluxo.
- `screen-cart.jsx` — coluna de resumo do pedido. Quando o cupom estiver resgatado, exibe linha "Desconto cupom de boas-vindas: −R$ 10,00" e total recalculado.
- `screen-confirm.jsx (DoneState)` — resumo de valores na confirmação. [DECISÃO PENDENTE — ver nota de conflito]

## Fluxo principal

1. Cliente acessa `/` e vê o banner de boas-vindas com a oferta de R$10.
2. Clica no banner — o cupom é marcado como resgatado no `localStorage`.
3. O banner muda para um estado "resgatado" (ex.: "✓ R$10 aplicados na sua sacola") — não desaparece, apenas informa que já foi ativado.
4. Cliente monta a sacola normalmente e vai para `/sacola`.
5. A sacola exibe uma linha destacada "Desconto boas-vindas: −R$ 10,00" no resumo de valores.
6. O total mostrado é `subtotal − 10,00` (mínimo R$0,00 — nunca negativo).
7. Cliente finaliza o pedido normalmente.

## Notas de produto

### Persistência

- Estado de "cupom resgatado" grava em `localStorage` — sobrevive a refresh e à navegação entre páginas.
- Semântica: **uma vez por dispositivo/navegador** (não uma vez por aba). Ver DEC-002.
- Chave sugerida: `mandai:welcome_coupon_redeemed`.

### Regras de desconto

- Valor fixo: R$10,00 (1 000 centavos). Não configurável no MVP.
- Subtotal menor que R$10 → desconto zera o total; nunca total negativo.
- O desconto **não** aparece se o cupom não foi resgatado — a sacola fica com o total normal.

### O que está fora desta US

- Campo de texto para digitar código de cupom (isso é US-07).
- Múltiplos tipos de cupom, cupons por restaurante, validade temporal.
- Tabela de cupom no banco, migration, endpoint de validação.
- Geração de cupons únicos por cliente.

---

## ⚠️ Esta US requer alinhamento com o Architect antes de implementar a integração com o backend

### Conflito com contrato atual

O `CreateOrderUseCase` hoje hardcodeia `discountCents = 0` e o campo foi removido do schema Zod de `POST /api/orders` (ver DEC-001). A tela de confirmação (`/confirmacao/[orderId]`) exibe os totais vindos do banco via `GET /api/orders/:id`.

Resultado hoje sem mudança backend: a sacola mostraria −R$10, mas a tela de confirmação mostraria o total cheio. Inconsistência visível ao cliente.

### O que o backend precisa para fechar o fluxo

1. `POST /api/orders` voltar a aceitar `discountCents` no body (campo opcional, default 0).
2. `CreateOrderUseCase` aplicar o desconto recebido no cálculo de `totalCents` (respeitando mínimo zero).
3. `GET /api/orders/:id` retornar `discountCents` na resposta.

**Essas mudanças alteram o schema Zod dos endpoints e a lógica de um use case — precisam ser validadas pelo Architect antes de implementar.**

### Estratégia sugerida de implementação em duas fases

| Fase | O que faz | Precisa do Architect? |
|---|---|---|
| A — Banner + estado local | Banner na home, localStorage, estado "resgatado", linha de desconto na sacola | Não |
| B — Integração com pedido | Backend aceita `discountCents`; confirmação exibe valor correto | **Sim** |

A fase A pode ser desenvolvida independentemente. A fase B fica bloqueada até o Architect dar o aval.

---

## Decisões abertas

- [DECISÃO PENDENTE] Como o total na confirmação deve se comportar se apenas a fase A for ao ar? Opções: (a) ocultar o campo de desconto na confirmação; (b) ler o desconto do `localStorage` e exibir no frontend sem depender do backend (workaround). Resolver antes de iniciar a implementação da fase A.
