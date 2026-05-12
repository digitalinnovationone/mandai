# US-04 Ver cardápio

**Como** cliente, **quero** ver o cardápio completo de um restaurante com seções, fotos e preços, **para** escolher o que vou pedir antes de abrir qualquer item.

---

## Telas relacionadas do handoff

- `screen-restaurant.jsx` — layout de 3 colunas:
  - Coluna esquerda (240 px): navegação sticky por seções do menu com scrollspy (seção ativa marcada com borda tomate).
  - Centro: lista de pratos agrupados por seção. Cada item tem foto (130×130), nome, descrição, preço, badge "Mais pedido" ou badge de promo, e botão "+" flutuante.
  - Coluna direita (340 px): mini-sacola sticky com itens adicionados, subtotal e botão "Ver sacola".
  - Ficha do restaurante logo abaixo do hero: logo, nome, badge "Aberto agora" (ou fechado), avaliação, tipo, endereço, tempo estimado de preparo.

## Fluxo principal

1. Cliente clica em um restaurante (home, categoria ou busca).
2. É levado para `/restaurante/[id]`.
3. A página carrega a ficha do restaurante e todas as seções do cardápio.
4. A navegação lateral destaca a seção visível conforme o cliente rola a página (scrollspy).
5. Cliente clica em um item para abrir o modal de customização (US-05).

## Notas de produto

- Endpoint: `GET /api/restaurants/:id` — retorna restaurante + menu completo (seções e itens).
- Se `isOpen: false`, a tela deve mudar para o estado "Restaurante fechado" (US-09), mantendo o cardápio visível em modo read-only.
- Itens com `available: false` exibem badge "Esgotado" e botão desabilitado (tratado em US-09).
- A mini-sacola à direita é um Client Component que lê o `CartContext` em tempo real.
- Clicar em "Ver sacola" na mini-sacola navega para `/sacola`.
- Rota canônica: `/restaurante/[id]` — conforme `ARQUITETURA.md §3.1`.
