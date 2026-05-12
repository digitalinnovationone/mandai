# US-10 Trocar de restaurante com sacola

> **[OPCIONAL MVP]** A regra de negócio precisa existir, mas o modal de confirmação pode ter uma implementação simplificada na primeira entrega.

**Como** cliente, **quero** ser avisado quando tentar adicionar um item de outro restaurante com a sacola cheia, **para** decidir conscientemente se quero limpar a seleção atual.

---

## Telas relacionadas do handoff

- Não há artboard dedicado para este modal no handoff — o comportamento é descrito no `README.md` da seção "Estado global / Sacola":
  > "Regra: ao adicionar item de outro restaurante com sacola não vazia, mostrar modal de confirmação 'Limpar sacola e começar de novo?'."
- `screen-restaurant.jsx` — contexto onde o conflito ocorre ao clicar no "+" de um item.
- `screen-modal.jsx` — o modal de customização só deve abrir após a confirmação de troca ou quando a sacola já é do mesmo restaurante.

## Fluxo principal

1. Cliente tem itens de um restaurante na sacola.
2. Navega para outro restaurante e clica no botão "+" de qualquer item.
3. Um modal de confirmação aparece antes de abrir a customização do item.
4. Se confirmar "Limpar sacola", a sacola é esvaziada e o modal de customização abre normalmente.
5. Se cancelar, a sacola permanece intacta e nenhum item é adicionado.

## Notas de produto

- A sacola é **mono-restaurante**: `Cart.restaurantId` controla isso no frontend (`CartContext`).
- A verificação acontece inteiramente no frontend — o backend nunca recebe uma sacola mista.
- O modal de confirmação é um componente simples (título, descrição, dois botões); não há design dedicado no handoff — usar padrão do sistema.
- [DECISÃO PENDENTE] Copy do modal: o handoff sugere "Limpar sacola e começar de novo?" mas o texto exato pode ser revisado.
