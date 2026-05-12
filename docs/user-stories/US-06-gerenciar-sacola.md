# US-06 Gerenciar sacola

**Como** cliente, **quero** revisar meus itens, ajustar quantidades, remover o que não quero e ver o total antes de finalizar, **para** confirmar que o pedido está certo.

---

## Telas relacionadas do handoff

- `screen-cart.jsx` — sacola com itens. Layout 2 colunas (lista à esquerda / resumo sticky à direita):
  - Banner de retirada: endereço do restaurante e tempo estimado.
  - Cada item: foto, nome, modificadores aplicados, observação, stepper de quantidade inline, botão "Editar item" e botão de remover (lixeira).
  - Coluna de resumo: subtotal, taxa de retirada (Grátis), campo de cupom (coberto em US-07), total e botão "Finalizar pedido".
  - Aviso: "Sem cadastro — a gente só pede seu nome no balcão."
- `screen-empty-cart.jsx` — estado vazio da sacola. Exibe mensagem ("Carrinho vazio que nem geladeira de domingo"), CTAs para explorar restaurantes, grade de sugestões e "como funciona a retirada".

## Fluxo principal

1. Cliente acessa `/sacola` (ou clica em "Ver sacola" na mini-sacola do cardápio).
2. Se a sacola tiver itens, vê a lista com todos os detalhes.
3. Ajusta a quantidade com o stepper ou clica "Editar item" para reabrir o modal (US-05).
4. Remove itens clicando na lixeira.
5. Confere o total no resumo lateral e clica "Finalizar pedido" para avançar (US-08).
6. Se a sacola estiver vazia, vê o estado vazio com sugestões.

## Notas de produto

- A sacola é **mono-restaurante**: todos os itens são sempre do mesmo restaurante. Trocar de restaurante com itens na sacola dispara aviso (US-10).
- O `CartContext` persiste em `localStorage`; a sacola sobrevive a recargas de página.
- O stepper diminui até 1; clicar no "-" quando qty = 1 remove o item (ou pode pedir confirmação — [DECISÃO PENDENTE]).
- Rota canônica: `/sacola` — conforme `ARQUITETURA.md §3.1`.
- Esta US não cobre a aplicação de cupom (US-07) nem a confirmação do pedido (US-08).
