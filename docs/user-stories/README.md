# User Stories — Mandaí

Mapa de escopo do MVP derivado das 13 telas do handoff e das regras do `ARQUITETURA.md §6.3`.

---

## Índice

| ID | Título | Status MVP |
|---|---|---|
| [US-01](./US-01-descobrir-restaurantes.md) | Descobrir restaurantes | Obrigatório |
| [US-02](./US-02-filtrar-por-categoria.md) | Filtrar por categoria | Obrigatório |
| [US-03](./US-03-buscar.md) | Buscar | Obrigatório |
| [US-04](./US-04-ver-cardapio.md) | Ver cardápio | Obrigatório |
| [US-05](./US-05-customizar-item.md) | Customizar item | Obrigatório |
| [US-06](./US-06-gerenciar-sacola.md) | Gerenciar sacola | Obrigatório |
| [US-07](./US-07-aplicar-cupom.md) | Aplicar cupom | **Opcional MVP** |
| [US-08](./US-08-finalizar-e-receber-codigo.md) | Finalizar e receber código | Obrigatório |
| [US-09](./US-09-lidar-com-estados-de-erro.md) | Lidar com estados de erro | Obrigatório |
| [US-10](./US-10-trocar-restaurante-com-sacola.md) | Trocar de restaurante com sacola | **Opcional MVP** |
| [US-11](./US-11-cupom-boas-vindas.md) | Resgatar cupom de boas-vindas | **v0.2 — Fase A frontend / Fase B requer Architect** |

---

## Template padrão de cada US

```markdown
# US-NN Título curto

**Como** [persona], **quero** [ação], **para** [valor].

---

## Telas relacionadas do handoff

- `screen-*.jsx` — o que a tela mostra e por que é referência para esta US.

## Fluxo principal

1. Passo 1
2. Passo 2
...

## Notas de produto

- Regras de negócio, endpoints, entidades do domínio relevantes.
- Decisões abertas marcadas com [DECISÃO PENDENTE].
```

Regras de escrita:
- Cada US cobre um único objetivo.
- Sem critérios de aceite (Given/When/Then), sem story points, sem DoD.
- Sempre citar os arquivos `screen-*.jsx` do handoff que cobrem a US.
- Funcionalidades fora do escopo listadas explicitamente em "Notas de produto".

---

## Personas

Existe uma única persona no MVP: **cliente** — qualquer pessoa que acessa o Mandaí pelo desktop para fazer um pedido de retirada no balcão. Não há papel de restaurante, atendente ou administrador nas US do MVP.

---

## [SUGESTÃO ADICIONAL]

Ao ler o handoff, identifiquei telas e comportamentos relevantes que não têm US própria nas 10 listadas:

**1. Estado de carregamento das páginas (loading states)**
O handoff e a ARQUITETURA.md usam Server Components com fetch direto. Não há US para esqueletos de carregamento (skeleton screens) nem para o estado de carregamento da mutation de criar pedido. Dado que `POST /api/orders` pode demorar, uma US de "mostrar feedback visual enquanto o pedido é confirmado" seria útil para os implementadores.

**2. Pickup pill / troca de bairro no header**
O `AppHeader` tem um "pickup pill" clicável ("Vila Madalena") que deveria abrir um modal de troca de bairro. O handoff menciona que o modal "não foi desenhado nesta entrega — implementar simples". Não há US cobrindo esse comportamento. Sugestão: criar US-11 ou tratar como nota dentro da US-01.

**3. Sacola vazia como sub-estado da US-06**
A tela `screen-empty-cart.jsx` (artboard 05b) é visualmente rica e tem copy específico ("Carrinho vazio que nem geladeira de domingo"). Está coberta brevemente na US-06, mas poderia ser uma US separada se a equipe quiser tratar o empty state com mais atenção durante a implementação.

**4. Tela de login (artboard 09 — `ScreenLogin`)**
Está fora do MVP por decisão explícita (`ARQUITETURA.md §11` e handoff README). Nenhuma US foi criada. Se a mentoria evoluir para a v2, é o ponto de entrada natural para auth com JWT.
