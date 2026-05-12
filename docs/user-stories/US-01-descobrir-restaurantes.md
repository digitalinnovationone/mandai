# US-01 Descobrir restaurantes

**Como** cliente, **quero** ver restaurantes próximos na página inicial, **para** escolher onde fazer meu pedido sem precisar pesquisar nada.

---

## Telas relacionadas do handoff

- `screen-home.jsx` — tela principal. Mostra hero com chamada, grade de 8 categorias, banner de cupom em destaque (3 cards: cupom / retirada em 15 min / cupons quentes), grade "Pertinho de você" com até 6 restaurantes e grade "Mais pedidos no bairro" com 3 adicionais.
- `shared.jsx` — `AppHeader` com input de busca e pickup pill ("Vila Madalena") que persiste o bairro selecionado.

## Fluxo principal

1. Cliente acessa `/` e vê o header com o bairro padrão "Vila Madalena".
2. A seção "Pertinho de você" exibe até 6 restaurantes ordenados por distância.
3. Cada card mostra: foto de capa, nome, tipo de cozinha, avaliação, distância e tempo estimado.
4. A seção "Mais pedidos no bairro" exibe mais 3 restaurantes em destaque.
5. Cliente clica em um card e vai para a página do restaurante (US-04).

## Notas de produto

- Bairro/localização fica no `localStorage`; default é "Vila Madalena".
- Cards com `isOpen: false` devem indicar visualmente que o restaurante está fechado (tratado em US-09).
- A home usa `GET /api/restaurants` sem filtro de categoria.
- As 8 categorias na grade são constantes no frontend (sem tabela `Category` no banco, conforme ERD §notas).
- Rota canônica: `/` — conforme `ARQUITETURA.md §3.1`.
