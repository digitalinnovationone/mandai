# Handoff: Mandaí — Web (retirada no balcão)

## Overview
Mandaí é um app web mobile-first de pedidos para retirada no balcão (sem entrega, sem cadastro obrigatório, pagamento direto com o restaurante). Este pacote cobre o fluxo completo de descoberta → cardápio → adição → sacola → confirmação, mais estados auxiliares (sacola vazia, restaurante fechado, item esgotado, login da v2, erro) e busca por texto.

**Escopo desta entrega:** desktop apenas (1440 px). Não há designs responsivos para tablet/mobile nesta versão.

## About the Design Files
Os arquivos deste pacote são **referências de design criadas em HTML** — protótipos que mostram a aparência e o comportamento pretendidos, **não código de produção** para copiar diretamente. A tarefa é **recriar esses designs no ambiente do codebase alvo** (React/Next, Vue, Remix, etc.) usando os padrões e bibliotecas já estabelecidos lá. Se não houver codebase ainda, escolher o framework mais adequado (sugestão: Next.js + Tailwind + componentes próprios, sem libs de UI pesadas — o design é enxuto).

O HTML usa React 18 + Babel inline apenas para facilitar a prototipagem. Em produção, espera-se build adequado com SSR/SSG para SEO de páginas de restaurante.

## Fidelity
**Alta fidelidade (hifi).** Cores, tipografia, espaçamento, raios, sombras e copy estão finais. O dev deve recriar pixel-perfect usando os tokens do design system (todos em `styles/tokens.css`).

## Como abrir as referências
Abra `Mandai - Hi-fi Web.html` em qualquer navegador. As 13 telas aparecem num **canvas pan-and-zoom**:
- Scroll do mouse para zoom; arrastar para pan.
- Duplo clique numa tela abre em modo foco (Esc para sair).
- Cada artboard tem um label (`01 · Home`, `02 · Categoria`, etc).

---

## Telas (13 artboards em 4 seções)

### Seção 1 — Fluxo principal
| # | Nome | Propósito |
|---|---|---|
| 01 | Home | Descoberta: hero, categorias, banner de cupom, restaurantes próximos |
| 02 | Categoria | Lista de restaurantes filtrada por cozinha |
| 03 | Cardápio do restaurante | Navegação por seções do menu + mini-sacola lateral |
| 04 | Adicionar item (modal) | Customização do prato (acompanhamentos, adicionais, obs) |
| 05 | Sacola | Itens com modificadores, cupom, resumo, CTA finalizar |
| 05b | Sacola vazia | Estado vazio com sugestões e recap de "como funciona" |
| 06 | Pedido confirmado | QR code + código alfanumérico de retirada |

### Seção 2 — Busca por texto
| # | Nome | Propósito |
|---|---|---|
| 11 | Busca — resultados | Resultados mistos (restaurantes + pratos) com refino lateral |
| 11b | Busca — sem resultados | Estado vazio com sugestões, recentes e "indicar restaurante" |

### Seção 3 — Estados auxiliares e exceção
| # | Nome | Propósito |
|---|---|---|
| 07 | Restaurante fechado | Banner + cardápio read-only + "Avisa quando abrir" |
| 08 | Item esgotado | Badges contextuais + modal explicativo |
| 09 | Login (v2) | Tela de login (escopo de versão futura) |
| 10 | Erro | Erro genérico com código técnico copiável e ações |

---

## Layout & Estrutura

### Grid global
- **Largura de canvas**: 1440 px (desktop).
- **Container central**: max 1200 px, padding lateral 32 px.
- **Header sticky** no topo (altura ~76 px) com logo + pickup pill + busca + sacola.
- **Footer** em fundo `--ink-800` com 4 colunas.
- **Espaço entre seções**: 56 px vertical típico (`paddingBottom: 56`).

### Layouts recorrentes
- **Home**: hero full-bleed escuro (altura ~520 px) com 60/40 split (copy + imagem); grids de cards abaixo.
- **Restaurante / Sacola / Confirmação**: grid de 2 colunas `1fr 380px` — conteúdo à esquerda, aside sticky à direita (top: 100 px).
- **Modal de adicionar item**: overlay escuro 60% + card 920×... centralizado, scroll interno.

---

## Design Tokens
**Todos definidos em `styles/tokens.css`**. Reutilize literalmente — não invente novos valores.

### Cores principais
| Token | Hex | Uso |
|---|---|---|
| `--tomate-500` | `#F23A0A` | CTAs primários, destaques |
| `--tomate-600` | `#D02500` | Hover de primário, links |
| `--folha-500` | `#2E8A3B` | Estados positivos (aberto, grátis, confirmação) |
| `--folha-700` | `#155621` | Texto sobre folha-50 |
| `--manga-400` | `#F59E10` | Acentos, badges de promo (uso esparso) |
| `--ink-800` | `#1C1812` | Texto principal, fundo inverso |
| `--ink-700` | `#2D2820` | Texto secundário forte |
| `--ink-500` | `#62584A` | Texto terciário |
| `--ink-150` | `#EAE2D4` | Divisores |
| `--ink-100` | `#F4EEE5` | Surface secundária (chips) |
| `--ink-50`  | `#FBF7F2` | Background da página (cream) |
| `--white` | `#FFFFFF` | Cards |

Tons soft (`*-50`) usados para callouts e backgrounds de chips com texto colorido. **Tomate só em CTAs e destaques**; nunca em headings. **Folha** só para estados positivos. **Manga** só para promo/badge eventual.

### Tipografia
- **Display**: Bricolage Grotesque (400–800). Headings, números grandes, labels de cards.
- **Body**: Plus Jakarta Sans (400–800). Parágrafos, inputs, botões.
- **Mono**: JetBrains Mono (400–600). Preços, códigos de retirada, distâncias, contagens.

Tracking apertado em headings (`letter-spacing: -0.025em` a `-0.035em`). `text-wrap: balance` em h1/h2; `pretty` em parágrafos.

### Spacing scale
`4 / 8 / 12 / 16 / 20 / 24 / 32 / 40 / 48 / 64 / 80 / 96` (via `--sp-*`).

### Radii
- `--r-xs` 6px — selection background
- `--r-sm` 10px — inputs, small chips
- `--r-md` 14px — botões, cards pequenos
- `--r-lg` 20px — cards principais
- `--r-xl` 28px — heroes, cards de destaque
- `--r-pill` 999px — chips, badges, pickup pill, contadores

### Shadows (todas warm, nunca azuladas)
- `--shadow-1` sutil — chips, controles
- `--shadow-2` padrão — cards
- `--shadow-3` elevada — popovers, sticky cards
- `--shadow-pop` — modal de adicionar item

### Motion
- Duração: `--dur-fast` 140ms, `--dur-base` 220ms, `--dur-slow` 360ms
- Easing: `--ease-out` padrão para entradas, `--ease-bounce` para microinterações lúdicas

---

## Componentes (mapa dos arquivos JSX)

| Arquivo | Componentes exportados | Notas |
|---|---|---|
| `src/shared.jsx` | `Icon`, `AppHeader`, `AppFooter` | Lucide-style stroke icons via SVG. Substituir por `lucide-react` no codebase. |
| `src/screen-home.jsx` | `ScreenHome` | Hero, grid de categorias (8), banner cupom, lista de restaurantes |
| `src/screen-category.jsx` | `ScreenCategory` | Breadcrumb, filtros chip, banner, grid 3 colunas |
| `src/screen-restaurant.jsx` | `ScreenRestaurant` | Capa+ficha, sticky section nav, lista de pratos, mini-sacola |
| `src/screen-modal.jsx` | `ScreenAddItem` | Modal overlay + customização |
| `src/screen-cart.jsx` | `ScreenCart` | Lista de itens com mods, cupom, resumo |
| `src/screen-empty-cart.jsx` | `ScreenEmptyCart` | Empty state + sugestões |
| `src/screen-confirm.jsx` | `ScreenConfirm`, `QrCodePattern`, `FormState`, `DoneState` | **QR é decorativo no mock** — usar `qrcode.react` ou backend para o real |
| `src/screen-search.jsx` | `ScreenSearch`, `ScreenSearchEmpty` | Busca por texto, refino, related |
| `src/screen-states.jsx` | `ScreenClosedRestaurant`, `ScreenOutOfStock`, `ScreenLogin`, `ScreenError` | Estados auxiliares |

---

## Rotas sugeridas

```
/                          → Home
/buscar?q=<termo>          → Resultados de busca
/categoria/:slug           → Restaurantes por categoria
/restaurante/:slug         → Cardápio
/restaurante/:slug?item=X  → Cardápio com modal aberto
/sacola                    → Sacola (ou vazia)
/finalizar                 → Form de nome
/pedido/:codigo            → Confirmação com QR
```

`/login` fica fora do MVP (v2).

---

## Estado global

### Sacola (persistir em localStorage)
```ts
type CartItem = {
  id: string;
  itemId: string;
  name: string;
  basePrice: number;
  qty: number;
  modifiers: { group: string; option: string; priceDelta: number }[];
  note?: string;
};

type Cart = {
  restaurantId: string | null; // sacola é mono-restaurante
  restaurantName: string;
  items: CartItem[];
  couponCode?: string;
};
```

**Regra**: ao adicionar item de outro restaurante com sacola não vazia, mostrar modal de confirmação "Limpar sacola e começar de novo?".

### Endereço/bairro de retirada
Persistido em localStorage. Default: "Vila Madalena". Exibido no header (pickup pill).

---

## Contrato de backend (endpoints esperados)

```
GET  /api/categories                       → Category[]
GET  /api/restaurants?lat&lng&radius       → Restaurant[]
GET  /api/restaurants/:slug                → Restaurant + Menu (com isOpen, hoursToday)
GET  /api/restaurants/:slug/items/:itemId  → MenuItem detalhado (modifiers)
POST /api/search { q, lat, lng }           → { restaurants: [], dishes: [] }
POST /api/coupons/validate { code, cart }  → { valid, discountAmount, label }
POST /api/orders                           → { code: "MA-7K2D", qrPayload, estimatedReadyAt }
GET  /api/orders/:code                     → Order
```

Notar que o backend deve gerar `code` (formato `MA-XXXX`, alfanumérico maiúsculo, sem ambiguidades como 0/O/1/I) e o `qrPayload` (URL assinada do tipo `mandai.app/r/MA-7K2D?sig=…`) que o atendente lê no balcão.

---

## Interações & comportamento

### Header
- Search input: submeter com Enter → navega para `/buscar?q=`.
- Pickup pill clicável → modal de troca de endereço/bairro (não desenhado nesta entrega — implementar simples).
- Sacola: badge com contagem só se > 0.

### Cardápio do restaurante
- Sticky nav lateral das seções do menu — scrollspy destacando a seção visível.
- Click no item → abre modal `/restaurante/:slug?item=X` (URL sincronizada para deep-link e back-button).
- Mini-sacola sticky à direita: atualiza em tempo real conforme adiciona.

### Modal de adicionar item
- Acompanhamento (radio, **obrigatório**) — submit desabilitado até selecionar.
- Adicionais (checkbox, opcional, soma ao total).
- Obs (textarea, max 140 char).
- Stepper de quantidade (1–20).
- CTA fixo no rodapé com total atualizado.
- Fechar: backdrop click, Esc, ou X.
- Animação: fade backdrop 180ms, slide-up do card 240ms ease-out.

### Sacola
- Stepper qty inline em cada item; "Editar item" reabre o modal pré-populado.
- Cupom: input + botão "Aplicar" → valida no backend → mostra linha de desconto em tomate.
- "Finalizar pedido" → `/finalizar`.

### Confirmação
- Estado `FORM`: campo de nome (autofoco), CTA "Confirmar pedido" → POST `/api/orders` → redirect para `/pedido/:code` no estado `DONE`.
- Estado `DONE`:
  - QR real gerado a partir de `qrPayload`. Tamanho 208×208 numa moldura branca de 12 px.
  - Código alfanumérico copiável (clipboard API).
  - "Baixar QR": salva PNG; "WhatsApp": `wa.me/?text=…` com texto pré-formatado.
- Não há push notification nesta entrega — o "Avisa quando abrir" e "Me avisa quando voltar" devem coletar e-mail/celular num modal.

### Busca
- Submit: navegar para `/buscar?q=…`.
- Mark amarela (`<mark>` com `--manga-100`) destacando o substring no nome de restaurantes/pratos.
- Filtros laterais aplicam client-side se os dados já vieram; senão refetch com query params.

---

## Acessibilidade

- Foco visível: outline tomate 2px com offset (já no tokens.css).
- Contraste mínimo AA em tudo — ink-700 sobre ink-50 dá AAA; tomate-500 sobre white é AA.
- Modal: trap de foco, Esc fecha, retorna foco ao trigger.
- Inputs sempre com `<label>` associado.
- Botões icon-only com `aria-label`.
- Stepper de quantidade: usar `role="spinbutton"` ou inputs nativos number com botões adjacentes.
- QR code: `aria-label="QR code do pedido MA-7K2D"` + fallback texto com o código alfanumérico.

---

## Copy guidelines

O tom é **coloquial paulistano, sem gírias forçadas**. Exemplos vivos no design:
- "Bora escolher um rango?"
- "Carrinho vazio que nem geladeira de domingo"
- "Pode vir buscar, Marina!"
- "Ih, deu ruim aqui."

Evitar: emoji desnecessário (só 📸 e 🎉 em momentos pontuais), exclamações em série, "deliciar-se", "saborosos".

---

## Assets

| Arquivo | Origem |
|---|---|
| `assets/logo-mark.svg` | Mandaí design system |
| `assets/logo-wordmark.svg` | Mandaí design system |
| `assets/glyphs/*.svg` | Mandaí design system (chili, leaf, moto, pot) |
| Imagens de restaurante/pratos | Unsplash via URL — **substituir por fotos reais da operação no go-live**. Função `U(id, w)` em `shared.jsx` monta a URL. |

**QR code** no mock é puramente decorativo (`QrCodePattern` em `screen-confirm.jsx` é um padrão pseudo-aleatório com seed). Em produção, usar lib (ex.: `qrcode.react`, `node-qrcode`) para gerar o real a partir do `qrPayload` retornado pelo backend.

---

## Arquivos no pacote

```
design_handoff_mandai_web/
├── README.md                       ← este arquivo
├── Mandai - Hi-fi Web.html         ← entrada (abrir no navegador)
├── design-canvas.jsx               ← shell de canvas (não precisa portar)
├── styles/
│   ├── tokens.css                  ← TODOS os tokens (cores, type, spacing, radii, shadows, motion)
│   └── app.css                     ← Estilos compartilhados (header, footer, btn, card)
├── src/
│   ├── shared.jsx                  ← Icon, AppHeader, AppFooter
│   ├── screen-home.jsx
│   ├── screen-category.jsx
│   ├── screen-restaurant.jsx
│   ├── screen-modal.jsx
│   ├── screen-cart.jsx
│   ├── screen-empty-cart.jsx
│   ├── screen-confirm.jsx
│   ├── screen-search.jsx
│   └── screen-states.jsx           ← Fechado, esgotado, login, erro
└── assets/
    ├── logo-mark.svg
    ├── logo-wordmark.svg
    └── glyphs/...
```

## Ordem sugerida de implementação

1. **Setup**: framework + tokens.css importado no global + fontes carregadas.
2. **Primitivos**: `Button`, `Card`, `Input`, `Chip`, `Badge`, `Icon` (wrapper sobre lucide-react).
3. **Layout shell**: `AppHeader` + `AppFooter`.
4. **Tela 01 Home** (sem dados reais — mocks).
5. **Tela 03 Cardápio** + **Tela 04 Modal** + estado de sacola.
6. **Tela 05 Sacola** + **05b vazia** + cupom.
7. **Tela 06 Confirmação** com QR real.
8. **Tela 02 Categoria** e **Tela 11 Busca**.
9. **Estados auxiliares** (fechado, esgotado, erro).
10. **Login v2** — adiar para milestone separada.

Boa! Qualquer dúvida sobre intenção de design, voltar pro canvas e abrir a tela em foco — quase tudo está visível ali.
