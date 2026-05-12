# Architecture Decision Records — Mandaí

Este diretório contém os ADRs (Architecture Decision Records) do projeto Mandaí. Cada arquivo registra uma decisão arquitetural tomada, o contexto que a motivou, e as alternativas descartadas.

## Índice

| Nº | Título | Status |
|---|---|---|
| [ADR-0001](0001-monorepo-sem-workspaces.md) | Monorepo com pastas `apps/*` sem workspaces | Accepted |
| [ADR-0002](0002-fastify-ddd-manual-backend.md) | Fastify + DDD manual no backend | Accepted |
| [ADR-0003](0003-nextjs-15-app-router-frontend.md) | Next.js 15 App Router no frontend | Accepted |
| [ADR-0004](0004-prisma-neon-postgres.md) | Prisma + Neon Postgres | Accepted |
| [ADR-0005](0005-ddd-enxuto-um-bounded-context.md) | DDD/Clean enxuto com 1 bounded context | Accepted |
| [ADR-0006](0006-sem-autenticacao-no-mvp.md) | Sem autenticação no MVP | Accepted |
| [ADR-0007](0007-documentacao-em-docs.md) | Documentação em `docs/` (ERD, ADR, User Stories) | Accepted |
| [ADR-0008](0008-fastify-5-type-provider-zod.md) | Adoção do Fastify 5 (exigido por fastify-type-provider-zod v4) | Accepted |

---

## Processo de superseding

ADRs são **imutáveis**. Se uma decisão mudar:

1. Crie um novo ADR com o próximo número disponível descrevendo a nova decisão.
2. No ADR antigo, altere o campo `Status` para `Superseded by ADR-NNNN` (onde `NNNN` é o número do novo ADR).
3. Nunca edite o corpo de um ADR já aceito — o histórico deve ser preservado.

---

## Template

```markdown
# ADR-NNNN: Título curto

- **Status:** Accepted | Superseded by ADR-XXXX | Deprecated
- **Data:** YYYY-MM-DD
- **Decisores:** equipe Mandaí (mentoria DIO)

## Contexto
Qual problema ou força levou a esta decisão? (2–5 parágrafos curtos)

## Decisão
O que foi decidido, em frases curtas e diretas. (1–2 parágrafos)

## Consequências
- **Positivas:** [bullets]
- **Negativas / tradeoffs:** [bullets]
- **Neutras:** [bullets, se aplicável]

## Alternativas consideradas
Outras opções e o motivo de cada uma ter sido descartada.
```
