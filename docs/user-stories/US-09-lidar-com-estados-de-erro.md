# US-09 Lidar com estados de erro

**Como** cliente, **quero** ver mensagens claras quando algo não está disponível ou der errado, **para** saber o que fazer em seguida sem ficar perdido.

---

## Telas relacionadas do handoff

- `screen-states.jsx (ScreenClosedRestaurant)` — restaurante fechado (artboard 07): banner escuro no topo com horário, hero dessaturado com badge "Fechado", card de horário de funcionamento, cardápio em read-only (itens com opacidade e botão "Indisponível"), sidebar com CTA "Me avisa quando abrir" e lista de restaurantes abertos próximos.
- `screen-states.jsx (ScreenOutOfStock)` — item esgotado (artboard 08): badge "Esgotado" no card do item, foto em preto e branco, botão "Me avisa" no lugar de "Adicionar". Inclui modal de confirmação "Esgotou agora mesmo, viu" com opções "Escolher outro" e "Me avisa quando voltar".
- `screen-search.jsx (ScreenSearchEmpty)` — busca sem resultados (artboard 11b): mensagem "Esse rango não tá no bairro (ainda!)", chips de sugestão, restaurantes próximos abertos e histórico de buscas recentes.
- `screen-states.jsx (ScreenError)` — erro técnico (artboard 10): "Ih, deu ruim aqui." com código técnico copiável, status cards (conexão / restaurante / pedido salvo), CTAs "Tentar de novo", "Voltar pra sacola" e "Falar com a gente".

## Fluxo principal

1. **Restaurante fechado**: cliente acessa o cardápio de um restaurante com `isOpen: false` → vê tela de fechado com cardápio read-only e opção de ser notificado.
2. **Item esgotado**: cliente tenta adicionar item com `available: false` → vê badge no card e modal explicativo.
3. **Busca vazia**: busca não retorna resultados → vê estado vazio com sugestões alternativas.
4. **Erro técnico**: `POST /api/orders` falha → vê tela de erro com código copiável e opção de tentar novamente (sacola preservada).

## Notas de produto

- O campo `isOpen` em `Restaurant` controla qual variante da tela de cardápio é exibida.
- O campo `available` em `MenuItem` controla o badge "Esgotado" e desabilita o botão de adicionar.
- "Me avisa quando abrir" e "Me avisa quando voltar" devem coletar e-mail ou celular num modal simples — não há push notification nesta entrega (conforme handoff README).
- Na tela de erro, a sacola não é perdida — deve continuar em `localStorage` para o cliente tentar de novo.
- O código técnico de erro (ex: `NET_504_GW_TIMEOUT`) deve ser copiável via clipboard API.
- A tela de erro é para falha ao **confirmar pedido** (`POST /api/orders`); erros de carregamento de lista devem exibir estados de "carregando" e mensagem genérica de recarregar, mas não esta tela específica.
