# ADR-0006: Sem autenticação no MVP

- **Status:** Accepted
- **Data:** 2026-05-11
- **Decisores:** equipe Mandaí (mentoria DIO)

## Contexto

O Mandaí é pickup-only: o cliente faz o pedido, recebe o código `MA-XXXX`, e paga no balcão ao retirar. Não há entrega, não há pagamento online, e não há histórico de pedidos que exija identificação persistente entre sessões.

O handoff inclui uma tela de login (artboard "09 · Login v2"), mas o próprio README do handoff a marca como escopo de versão futura. Implementar autenticação no MVP adicionaria JWT, refresh tokens, middleware de proteção de rotas, e fluxo de cadastro/login — todos conceitos que desviam o foco da mentoria de DDD/Clean para IAM.

## Decisão

Não há autenticação no MVP. Pedidos são anônimos e identificados exclusivamente pelo código `MA-XXXX` gerado pelo backend no momento da criação (formato: alfanumérico maiúsculo, sem caracteres ambíguos `0`/`O`/`1`/`I`). O código é suficiente para o atendente localizar o pedido no balcão.

A tela de login do handoff fica fora do escopo (ver §11). Auth é extensão natural pós-MVP — sugestão de exercício em §8.

## Consequências

- **Positivas:**
  - Fluxo de pedido completo sem cadastro — menor fricção para o cliente no contexto de pickup.
  - Backend sem middleware de autenticação — todos os endpoints são públicos, o que simplifica o código e os testes.
  - O aluno foca em arquitetura de domínio, não em segurança de autenticação.

- **Negativas / tradeoffs:**
  - Qualquer pessoa com o código `MA-XXXX` pode consultar o pedido via `GET /api/orders/:id`. Aceito para o MVP educacional.
  - Não há histórico de pedidos por usuário — o cliente não pode ver pedidos anteriores.
  - Adicionar auth depois exige proteger rotas existentes e associar `Order` a um usuário — mudança não trivial no schema e nos use cases.

- **Neutras:**
  - O campo `code` em `Order` serve como identificador público e opaco — funciona como um token de leitura fraco sem exigir autenticação formal.

## Alternativas consideradas

- **JWT stateless simples:** adicionaria autenticação sem banco de sessões, mas introduz geração de tokens, expiração, refresh, e middleware de verificação — complexidade fora do foco da mentoria. Descartado.
- **NextAuth / Auth.js:** solução pronta para Next.js, mas traz configuração de providers, callbacks, e adaptadores de banco que obscurecem o backend Fastify que estamos ensinando. Descartado.
- **Identificação por e-mail sem senha (magic link):** interessante para UX de pickup, mas exige envio de e-mail e tratamento de expiração de link. Descartado para o MVP.
