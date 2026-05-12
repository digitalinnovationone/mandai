# US-03 Buscar

**Como** cliente, **quero** digitar o nome de um restaurante ou prato, **para** encontrar o que quero sem navegar por categorias.

---

## Telas relacionadas do handoff

- `shared.jsx` — `AppHeader` com input de busca. Submete com Enter e navega para `/busca?q=<termo>`.
- `screen-search.jsx` — resultados mistos: seção "Restaurantes" (cards horizontais com foto, nome, tipo, avaliação, tempo, distância) e seção "Pratos" (grade 2 colunas). Sidebar com filtros de refino (aberto agora, tempo de preparo, faixa de preço, distância) e buscas relacionadas. O termo é destacado em amarelo (`<mark>`) no nome de cada resultado.
- `screen-search.jsx (ScreenSearchEmpty)` — estado vazio: mensagem "Esse rango não tá no bairro (ainda!)", chips de sugestão de busca, grade de restaurantes abertos próximos e histórico de buscas recentes.

## Fluxo principal

1. Cliente digita no campo de busca do header e pressiona Enter.
2. É levado para `/busca?q=<termo>`.
3. A página exibe restaurantes e pratos que correspondem ao termo.
4. O substring buscado é marcado em amarelo (`--manga-100`) nos nomes.
5. Se não houver resultados, exibe o estado vazio com sugestões e restaurantes próximos.

## Notas de produto

- Endpoint: `GET /api/search?q=<termo>`.
- A resposta retorna `{ restaurants: [], dishes: [] }`.
- Os filtros laterais (aberto agora, tempo, preço, distância) são aplicados client-side se os dados já vieram; caso contrário fazem refetch com query params.
- Estado vazio inclui buscas recentes (guardadas em `localStorage`) e sugestão de "indicar restaurante".
- Rota canônica: `/busca` — conforme `ARQUITETURA.md §3.1` (o handoff usa `/buscar?q=` — a rota canônica do ARQUITETURA.md é `/busca`).
