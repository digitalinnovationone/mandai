# ERD — Mandaí

Diagrama de entidades e relacionamentos do bounded context `ordering`. Fonte de discussão de domínio: vive em paralelo ao `apps/api/prisma/schema.prisma` e deve ser atualizado **no mesmo commit** que altera o schema (regra do ARQUITETURA.md §6.1).

> **Fonte canônica do diagrama: [`erd.mmd`](./erd.mmd).** Este `.md` espelha o `.mmd` numa fence ```mermaid pra renderizar nativamente no GitHub e carregar as notas de modelagem em prosa. Ao editar, altere os dois no mesmo commit (ou só o `.mmd` e regenere o bloco abaixo).

```mermaid
erDiagram
  Restaurant  ||--o{ MenuSection : "1 restaurante tem N seções de menu"
  MenuSection ||--o{ MenuItem    : "1 seção contém N pratos"
  Restaurant  ||--o{ Order       : "1 restaurante recebe N pedidos"
  Order       ||--o{ OrderItem   : "1 pedido tem N linhas de item"
  MenuItem    ||--o{ OrderItem   : "1 prato é snapshot em N linhas (histórico sobrevive a mudanças no cardápio)"

  Restaurant {
    string   id              PK
    string   name
    string   slug            UK "usado em /restaurante/[slug]"
    string   category           "ex: padaria, pizza, japonesa — filtrado em ?category="
    float    rating
    int      distanceMeters
    string   coverUrl
    bool     isOpen             "controla CTA / tela 07 Restaurante fechado"
    string   address            "ex: R. Wisard, 348 — visível na confirmação"
    string   neighborhood       "ex: Vila Madalena — pickup pill no header"
    string   phone              "ex: (11) 2389-0042 — visível na confirmação"
  }

  MenuSection {
    string   id              PK
    string   restaurantId    FK
    string   name               "ex: Salgados, Bebidas"
    int      order              "ordem de exibição na sticky nav do cardápio"
  }

  MenuItem {
    string   id              PK
    string   sectionId       FK
    string   name
    string   description
    int      priceCents
    string   imageUrl
    bool     available          "false → badge 'esgotado' (tela 08)"
  }

  Order {
    string   id              PK "interno, ex: A8B2C9F1"
    string   code            UK "MA-XXXX, alfanumérico maiúsculo sem 0/O/1/I; mostrado no balcão"
    string   restaurantId    FK
    string   customerName       "nome digitado no form da finalização — 'Pode vir buscar, Marina!'"
    string   status             "pending | confirmed | ready | picked_up | cancelled"
    int      subtotalCents
    int      discountCents      "0 quando sem cupom"
    string   couponCode         "snapshot do código aplicado, nullable"
    int      totalCents
    string   qrPayload          "URL assinada lida no balcão (ex: mandai.app/r/MA-7K2D?sig=…)"
    datetime estimatedReadyAt   "renderizado como 'Pronto em ~18 min' na confirmação"
    datetime createdAt
  }

  OrderItem {
    string   id                 PK
    string   orderId            FK
    string   menuItemId         FK
    string   nameSnapshot          "congelado no momento do pedido"
    int      priceCentsSnapshot    "preço base congelado"
    int      qty
    string   note                  "obs do cliente, max 140 char — 'Bem tostado, por favor.'"
    json     modifiers             "[{ group, option, priceDelta }] — evita 3 tabelas extras"
  }
```

## Notas de modelagem

- **Snapshots em `OrderItem`** (`nameSnapshot`, `priceCentsSnapshot`, `modifiers`): o pedido precisa sobreviver a mudanças posteriores no cardápio (renomeação, reprecificação, desativação). A FK para `MenuItem` permanece para rastreabilidade, mas a verdade do que foi pedido fica no próprio `OrderItem`.
- **`modifiers` como JSON**, não 3 tabelas (`ModifierGroup`, `Modifier`, `OrderItemModifier`): didaticamente o trade-off vale — a estrutura `{ group, option, priceDelta }[]` já cobre o que as telas mostram ("Acompanha: mel da casa", "+ Queijo coalho extra"), espelha o tipo `CartItem` do handoff e mantém o schema enxuto. Custo: não dá pra agregar "qual adicional é mais pedido" via SQL puro — aceito no MVP.
- **Sem tabela `Category`**: a §4.1 trata categoria como string em `Restaurant` e a filtragem é por `?category=`. As 8 categorias da Home podem ser uma constante no frontend; promover a tabela só se virar entidade com regra própria (descrição, ícone configurável, ordering global).
- **Sem tabela `Coupon`**: cupom é opcional no MVP (US-07). `Order.couponCode` + `Order.discountCents` guardam o snapshot — suficiente pra renderizar "Cupom MANDA20 − R$ 12,96" na confirmação. Se um catálogo de cupons surgir depois, vira tabela própria com FK opcional.
- **Sacola é mono-restaurante**: a regra ("limpar sacola e começar de novo?") vive no frontend (`CartContext` + localStorage); o backend só registra o pedido finalizado, então `Order` já tem `restaurantId` sem ambiguidade. Não há entidade `Cart` persistida.
- **`Order.status` como string**: a §4.1 deixa string; valores prováveis (`pending` → `confirmed` → `ready` → `picked_up`, mais `cancelled`) ficam documentados aqui até virarem enum Prisma se a necessidade aparecer.
- **`Order.qrPayload`**: o QR do mock é decorativo (`QrCodePattern`); em produção o backend gera o payload (URL assinada) e o frontend renderiza com `qrcode.react`. Por isso o payload mora em `Order`, não é derivado só de `code`.
