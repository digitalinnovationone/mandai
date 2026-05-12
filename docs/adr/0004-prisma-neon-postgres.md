# ADR-0004: Prisma + Neon Postgres

- **Status:** Accepted
- **Data:** 2026-05-11
- **Decisores:** equipe Mandaí (mentoria DIO)

## Contexto

O projeto precisa de um banco relacional para armazenar restaurantes, cardápios e pedidos. O backend roda em Vercel Serverless Functions, onde conexões de banco de dados são efêmeras — o banco precisa suportar muitas conexões de curta duração sem overhead de connection pooling manual.

O ORM precisa ser familiar ao ecossistema TypeScript e gerar tipos automaticamente a partir do schema, para que o aluno não precise escrever tipos de banco à mão.

Itens de pedido (`OrderItem`) precisam de um campo `modifiers` flexível — o número de modificadores varia por item de cardápio. Snapshot de `name` e `priceCents` é obrigatório para que pedidos históricos não sejam afetados por alterações futuras no cardápio (ver §4.1).

## Decisão

Usamos Prisma como ORM e Neon como provedor Postgres serverless. O campo `modifiers` em `OrderItem` é armazenado como JSON — evita três tabelas extras para algo que o MVP não precisa consultar de forma relacional. Os campos `nameSnapshot` e `priceCentsSnapshot` em `OrderItem` copiam `name` e `priceCents` do `MenuItem` no momento da criação do pedido (ver §4.1).

Para dev local, o mesmo `DATABASE_URL` do Neon é usado (ou uma branch de desenvolvimento no Neon). A integração Neon ↔ Vercel popula `DATABASE_URL` automaticamente no projeto da API (ver §4.3).

## Consequências

- **Positivas:**
  - Prisma gera tipos TypeScript a partir do `schema.prisma` — sem boilerplate de tipagem manual de entidades de banco.
  - Neon é Postgres serverless com suporte a connection pooling via PgBouncer embutido — compatível com Vercel Functions sem configuração adicional.
  - Integração Neon ↔ Vercel em um clique: elimina configuração manual de variáveis de ambiente no deploy.
  - `modifiers` como JSON mantém o schema simples para o MVP; pode ser normalizado em uma versão futura se necessário.
  - Snapshot de `name` e `priceCents` garante integridade histórica de pedidos independente de mudanças no cardápio.

- **Negativas / tradeoffs:**
  - Prisma ORM não é adequado para queries muito complexas — não é o ideal se o projeto evoluir para relatórios analíticos.
  - `modifiers` como JSON não é consultável de forma eficiente com índices; aceito para o MVP pois não há queries que filtrem por modificador.
  - Neon free tier tem limites de compute (auto-suspend após inatividade) — pode causar cold starts perceptíveis na primeira query após inatividade.

- **Neutras:**
  - `prisma/seed.ts` popula 6–8 restaurantes e ~30 itens espelhando as categorias do handoff (pizza, hambúrguer, japonesa, etc.) com URLs de Unsplash reais (ver §4.2).

## Alternativas consideradas

- **Drizzle ORM:** mais leve e com melhor performance em edge runtimes, mas com ecossistema e documentação menores que o Prisma. Descartado pela familiaridade maior do Prisma no público-alvo.
- **Supabase (Postgres):** também serverless e com integração Vercel, mas traz autenticação e storage embutidos que aumentam a superfície de conceitos sem benefício no MVP. Descartado pela simplicidade do Neon.
- **PlanetScale (MySQL):** sem suporte a foreign keys por padrão — incompatível com o schema relacional do projeto. Descartado.
- **SQLite (local):** simples para dev, mas sem solução pronta para serverless em produção. Descartado.
