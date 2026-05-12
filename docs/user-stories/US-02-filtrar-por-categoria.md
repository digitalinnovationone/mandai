# US-02 Filtrar por categoria

**Como** cliente, **quero** filtrar restaurantes por tipo de cozinha, **para** ver só o que estou com vontade de comer.

---

## Telas relacionadas do handoff

- `screen-home.jsx` — grade de 8 tiles de categoria ("O que vai ser hoje?"). Clicar num tile leva à página de categoria.
- `screen-category.jsx` — lista de restaurantes filtrada. Exibe breadcrumb, título "Pizza pertinho de você", contagem, chips de sub-filtro (Todos / Aberto agora / Avaliação 4,5+ / Promoções / etc.), banner promocional e grade 3 colunas com os restaurantes.

## Fluxo principal

1. Cliente clica em um tile de categoria na home (ex: "Pizza").
2. É levado para `/categoria/pizza`.
3. A página exibe restaurantes filtrados pela categoria escolhida.
4. Cliente pode refinar com chips de sub-filtro: "Aberto agora", "Avaliação 4,5+", "Promoções", "Pronto em 20 min", etc.
5. Cliente clica em um restaurante e vai para o cardápio (US-04).

## Notas de produto

- Endpoint: `GET /api/restaurants?category=pizza`.
- Slug da categoria em minúsculas e sem acento na URL, ex: `/categoria/japones`.
- Os sub-filtros ("Aberto agora", "Avaliação 4,5+") são aplicados client-side sobre os dados já retornados.
- Chips de sub-filtro são parte do estado local da página; não disparam nova requisição ao backend, exceto o filtro de categoria em si.
- Rota canônica: `/categoria/[slug]` — conforme `ARQUITETURA.md §3.1`.
