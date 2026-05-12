# ADR-0002: Fastify + DDD manual no backend

- **Status:** Accepted
- **Data:** 2026-05-11
- **Decisores:** equipe Mandaí (mentoria DIO)

## Contexto

O backend precisa expor cinco endpoints REST simples (ver §2.4). O projeto roda em Vercel Serverless Functions, onde cold starts importam. O objetivo pedagógico é mostrar as quatro camadas de Clean Architecture — `domain`, `application`, `infra`, `http` — de forma que o aluno veja cada camada como código explícito, sem mágica de framework.

NestJS seria a escolha "enterprise" óbvia em TypeScript, mas esconde as camadas atrás de decorators e um container de DI que requer entender `@Module`, `@Injectable`, `@Controller` antes de escrever qualquer regra de negócio. O cold start do NestJS também é significativamente maior que o do Fastify em funções serverless.

Express seria mais simples que NestJS, mas não tem validação de schema nativa e exigiria mais boilerplate para atingir o mesmo nível de type-safety com Zod.

## Decisão

Usamos Fastify com `fastify-type-provider-zod` para validação de payload e type-safety. As camadas DDD/Clean são estruturadas manualmente em `modules/ordering/{domain,application,infra,http}/`. A injeção de dependência é feita pela factory `buildOrderingModule(prisma)` em `ordering.module.ts` — sem decorators, sem container. Cada instanciação é explícita e visível no código (ver §2.3).

Erros são lançados como `HttpError` — sem Result/Either pattern. O handler global em `shared/errors.ts` transforma `HttpError` em resposta JSON com status code adequado.

## Consequências

- **Positivas:**
  - Cold start reduzido em serverless — Fastify parte em ~5 ms vs ~200–400 ms do NestJS.
  - O aluno lê `buildOrderingModule` e enxerga quem depende de quem sem seguir decorators ou metadata.
  - Zod valida e infere tipos ao mesmo tempo — um único schema serve para validação em runtime e tipagem em compile-time.
  - Camadas ficam explícitas como pastas: remover a camada `infra` e trocar por outra implementação é uma operação óbvia.

- **Negativas / tradeoffs:**
  - Sem scaffolding automático de controllers/modules — cada use case e rota é criado à mão.
  - `buildOrderingModule` cresce linearmente com o número de use cases; em projetos maiores, geradores ou um container seriam mais ergonômicos.
  - Tratamento de erros por exceção (`throw HttpError`) é menos composável que Result pattern em fluxos com múltiplos pontos de falha.

## Alternativas consideradas

- **NestJS:** arquitetura opinada com DI e decorators. Descartado porque esconde as camadas que queremos ensinar e tem cold start maior em serverless.
- **Express:** mais simples, mas sem validação de schema integrada e sem plugin system tipado. Descartado em favor do Fastify que oferece mais type-safety com menos boilerplate.
- **Hono:** leve e moderno, mas menos maduro e com ecossistema menor que o Fastify. Descartado por familiaridade e documentação.
