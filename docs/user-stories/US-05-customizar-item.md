# US-05 Customizar item

**Como** cliente, **quero** escolher acompanhamentos, adicionais e deixar um recado antes de colocar um item na sacola, **para** receber o prato do jeito que eu gosto.

---

## Telas relacionadas do handoff

- `screen-modal.jsx` — modal sobreposto ao cardápio. Contém:
  - Foto do item em destaque (280 px de altura).
  - Nome, descrição e preço base.
  - Seção "Escolha o acompanhamento" (radio, **obrigatório** — badge "Obrigatório").
  - Seção "Adicionais" (checkboxes, **opcional** — badge "Opcional"), cada um com delta de preço.
  - Campo "Algum recado pro restaurante?" (textarea, max 140 caracteres).
  - Rodapé fixo: stepper de quantidade (1–20) + botão "Adicionar à sacola" com total atualizado.

## Fluxo principal

1. Cliente clica no botão "+" de um item no cardápio.
2. O modal abre sobre a página (backdrop escurecido, slide-up 240ms).
3. Cliente seleciona o acompanhamento obrigatório (radio).
4. Opcionalmente, marca adicionais e escreve uma observação.
5. Ajusta a quantidade com o stepper.
6. Clica "Adicionar à sacola" — o item vai para o `CartContext` e o modal fecha.

## Notas de produto

- O botão "Adicionar à sacola" fica **desabilitado** enquanto nenhuma opção obrigatória estiver selecionada.
- O total no rodapé do modal atualiza em tempo real conforme adicionais são marcados e a quantidade muda.
- Fechar o modal: clicar no backdrop, pressionar Esc ou clicar no X no canto superior direito.
- Foco fica preso dentro do modal enquanto ele estiver aberto (trap de foco para acessibilidade).
- Cada item na sacola guarda `modifiers: [{ group, option, priceDelta }]` e `note` — conforme `OrderItem` no ERD.
- "Editar item" na sacola reabre o modal pré-populado com as seleções anteriores.
- Esta US não cobre o caso de item esgotado (tratado em US-09).
