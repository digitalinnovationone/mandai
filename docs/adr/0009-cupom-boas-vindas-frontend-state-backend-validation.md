# ADR-0009: Cupom de boas-vindas — estado no CartState e validação no backend

- **Status:** Accepted
- **Data:** 2026-05-14
- **Decisores:** equipe Mandaí (mentoria DIO)

## Contexto

US-01 introduz um cupom de boas-vindas de R$10 que aparece na Home, é resgatado
com um clique e aplica desconto automático na sacola. A US é explícita em dois
pontos: (a) não há migração de banco de dados, os campos `couponCode` e
`discountCents` já existem no schema Prisma desde o v0.1.0; (b) a implementação
pode ser totalmente no frontend se a equipe julgar adequado.

Três sub-problemas precisam de decisão:

1. **Onde vive o estado `couponRedeemed` no frontend?** (opções: estender
   `CartState`, hook isolado com localStorage próprio, contexto dedicado)
2. **O backend aplica o desconto ou é puramente cosmético?** (opções: magic code
   validado no use case, `discountCents` enviado pelo cliente, desconto
   só no display)
3. **Como os dois lados ficam sincronizados sobre o valor e o código do cupom?**

## Decisão

### 1. Estender `CartState` com `couponRedeemed: boolean`

Adicionamos `couponRedeemed: boolean` (default `false`) ao `CartState` existente
em `apps/web/src/modules/cart/types.ts`. Uma nova action `REDEEM_COUPON` dispara
a transição de `false → true`; não há transição de volta (o desconto é
irrevogável na sessão, conforme a US).

**Por que não um hook isolado?** Um `useCoupon()` com localStorage próprio
obrigaria o `CartProvider` a consumir o hook internamente (para calcular os
totais) _e_ o componente de banner a consumir o mesmo hook separadamente. São
dois pontos de hidratação assíncrona para o mesmo dado, o que aumenta o risco de
flash de estado inconsistente na renderização inicial. Manter tudo em
`CartState` garante uma única hidratação, um único `localStorage.getItem`.

**Por que não um contexto dedicado?** Um `CouponContext` acrescentaria um
`Provider` a mais no `providers.tsx` e um arquivo de contexto que contém
exatamente dois campos e uma transição. Para um projeto educacional, isso ensina
fragmentação antes de ensinar a necessidade dela. O único argumento a favor seria
o isolamento — mas como o desconto afeta diretamente o total da sacola, o
acoplamento entre cupom e cart é intencional e explícito.

### 2. `CLEAR_CART` preserva `couponRedeemed`

O cupom é um benefício de sessão, não um atributo do carrinho. Quando o usuário
troca de restaurante e o cart é resetado, o cupom não deve ser perdido.

```typescript
case "CLEAR_CART":
  return { ...INITIAL_STATE, couponRedeemed: state.couponRedeemed };
```

O mesmo vale para o caminho `force: true` de `ADD_ITEM` (troca forçada de
restaurante após confirmação no `ClearCartModal`):

```typescript
if (force) {
  return { restaurantId, restaurantName, items: [newItem], couponRedeemed: state.couponRedeemed };
}
```

### 3. `HYDRATE` usa spread-merge defensivo

Estados persisitidos no localStorage antes desta versão não contêm
`couponRedeemed`. Para não hidratar com `undefined`, o reducer passa a usar:

```typescript
case "HYDRATE":
  return { ...INITIAL_STATE, ...action.payload };
```

`INITIAL_STATE.couponRedeemed` (= `false`) serve de fallback para qualquer
campo novo que ainda não esteja no valor serializado.

### 4. O contexto expõe `subtotalCents`, `discountCents` e `totalCents` separados

O `CartContextValue` atual expõe apenas `totalCents`, que até agora era
equivalente ao subtotal (não havia desconto). Com o cupom, os três valores
passam a ser distintos:

```
subtotalCents = Σ (basePriceCents + modifiers) × qty
discountCents = couponRedeemed ? Math.min(1000, subtotalCents) : 0
totalCents    = subtotalCents - discountCents
```

O cap `Math.min(1000, subtotalCents)` garante total nunca negativo — regra
exigida pela US. Ambos os valores são computados inline no `CartProvider`
(nenhuma função auxiliar separada é necessária).

### 5. Backend valida o código mágico no `CreateOrderUseCase`

O `discountCents` não é enviado pelo frontend — isso manteria a arquitetura
original onde o backend é a única fonte de verdade para o desconto. Em vez
disso, o frontend envia `couponCode: "BEMVINDO10"` quando `couponRedeemed`
é `true`, e o use case aplica o desconto:

```typescript
// Em create-order.ts — substitui o bloco "4. Discount"
const WELCOME_COUPON_CODE = "BEMVINDO10";
const WELCOME_COUPON_DISCOUNT_CENTS = 1000; // R$10,00

const discountCents =
  input.couponCode === WELCOME_COUPON_CODE
    ? Math.min(WELCOME_COUPON_DISCOUNT_CENTS, subtotalCents)
    : 0;
const totalCents = subtotalCents - discountCents;
```

Invariante restaurada: `discountCents` continua sendo calculado exclusivamente
pelo backend. O pedido no banco de dados reflete valores corretos. A tela de
confirmação que lê `GET /orders/:id` exibe o desconto real sem lógica adicional.

**Por que não aceitar `discountCents` diretamente do cliente?** O schema Zod do
`POST /api/orders` remove explicitamente `discountCents` do body desde o v0.1.0
por essa razão — qualquer cliente poderia enviar um desconto arbitrário. Manter
essa restrição, mesmo num MVP sem auth, ensina o princípio correto.

### 6. Componente `WelcomeCouponBanner`

Arquivo: `apps/web/src/modules/cart/components/WelcomeCouponBanner.tsx`

O banner vive no módulo `cart` porque lê e escreve estado de cupom — que agora
é parte do `CartState`. É um Client Component (`"use client"`) por usar
`useCart()`.

Comportamento:
- Se `state.couponRedeemed === false` → exibe o banner de oferta
- Ao clicar → `dispatch({ type: "REDEEM_COUPON" })` + mostra mensagem de
  confirmação local (state local `redeemed` dentro do componente para a
  animação de feedback)
- Se `state.couponRedeemed === true` → renderiza `null` (sem banner)

### 7. Constante do código de cupom em dois lugares

O código `"BEMVINDO10"` aparece como constante no use case do backend e como
constante no `CartPageClient` (enviado no `mutateAsync`). Duplicação intencional:
os dois apps são projetos npm independentes, sem pacote `shared`. Para o MVP
educacional, uma constante comentada em cada lado é mais didático do que criar
um terceiro pacote só para compartilhar um literal.

## Consequências

### Positivas
- Zero migrations — `discountCents` e `couponCode` já existem no schema Prisma.
- O pedido no banco tem valores corretos (não depende de lógica de display).
- A tela de confirmação mostra desconto real sem código extra.
- Reducer estendido ensina como adicionar estado a um contexto existente, como
  preservar campos seletivamente no `CLEAR_CART` e como fazer `HYDRATE`
  defensivo.
- O princípio "regras de negócio no backend" é preservado.

### Negativas / tradeoffs
- O código `"BEMVINDO10"` está duplicado (frontend + backend). Aceitável para
  MVP sem pacote `shared`.
- `CartContextValue` muda de interface (`totalCents` era subtotal; agora é
  líquido). Todos os consumidores precisam ser revisados — neste projeto são
  três: `CartPageClient`, `MiniCart`, `ConfirmationClient`.
- Um usuário que inspecionar o payload do `POST /api/orders` vê o código
  `"BEMVINDO10"` — sem auth, isso é inevitável. A proteção é que o backend
  ignora qualquer código desconhecido (desconto = 0), então enviar o código
  manualmente não traz vantagem extra.

## Alternativas consideradas

- **`useCoupon()` hook independente:** descartado — dois pontos de hidratação
  assíncrona, risco de inconsistência de estado no render inicial.
- **`CouponContext` dedicado:** descartado — over-engineering para uma feature
  de dois campos; acoplamento com cart é intencional.
- **Desconto cosmético (só frontend, backend armazena 0):** descartado — o
  pedido no banco ficaria com `totalCents` errado e a tela de confirmação
  exibiria valor inconsistente sem lógica extra.
- **Frontend envia `discountCents` diretamente:** descartado — quebra o
  invariante arquitetural de que business rules ficam no backend, e permite
  desconto arbitrário por clientes mal-intencionados.
