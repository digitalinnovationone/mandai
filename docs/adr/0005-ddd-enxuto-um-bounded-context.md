# ADR-0005: DDD/Clean enxuto com 1 bounded context

- **Status:** Accepted
- **Data:** 2026-05-11
- **Decisores:** equipe Mandaí (mentoria DIO)

## Contexto

O objetivo da mentoria é ensinar a essência de DDD + Clean Architecture para um público de nível básico. O risco principal é afundar o aluno em padrões avançados — Result/Either, múltiplos bounded contexts, domain events, CQRS, Mapper classes — antes de entender a inversão de dependência e o papel de cada camada.

O domínio do Mandaí é deliberadamente simples: restaurantes têm cardápios, clientes montam sacolas e fazem pedidos. Não há billing, estoque, notificações assíncronas, ou integrações externas no MVP. Dividir isso em múltiplos bounded contexts seria forçado e prejudicial ao aprendizado.

Erros são situações excepcionais bem definidas (restaurante não encontrado, item indisponível) — o Result/Either pattern adicionaria tipos de retorno complexos sem resolver problemas reais nesse escopo.

## Decisão

Todo o domínio vive em `modules/ordering/` — único bounded context (ver §2.1). As quatro camadas são `domain`, `application`, `infra`, e `http`. Não há múltiplos bounded contexts, não há domain events, não há CQRS.

Erros lançam `HttpError` diretamente nos use cases — sem Result/Either. O handler global em `shared/errors.ts` intercepta e serializa.

Repositórios Prisma fazem o mapeamento `Prisma → Domain` com uma função `toDomain()` inline no fim do arquivo — sem classe `Mapper` separada (ver §2.2).

O único Value Object didático é `Money` em `domain/value-objects/money.ts` — valida valor ≥ 0 e formata BRL (ver §2.2).

## Consequências

- **Positivas:**
  - Estrutura de pastas cabe em uma tela — o aluno navega o projeto sem perder contexto.
  - A inversão de dependência fica clara: `domain/` não importa nada de Fastify ou Prisma.
  - `throw HttpError` é imediatamente compreensível para quem vem de Express/Fastify.
  - `toDomain()` inline elimina um arquivo de classe extra por entidade, sem sacrificar a separação lógica.

- **Negativas / tradeoffs:**
  - Se o projeto crescer (ex.: adicionar billing ou notificações), o módulo `ordering` precisará ser partido — o custo de refatorar para múltiplos bounded contexts cresce com o tempo.
  - `HttpError` no use case cria um acoplamento suave com HTTP — em um sistema com múltiplos transportes (gRPC, filas), seria problemático. Aceito para o escopo atual.
  - Sem Mapper class, a função `toDomain()` fica dispersa nos arquivos de repositório — pode ser difícil de encontrar em projetos maiores.

- **Neutras:**
  - Extensões pós-MVP sugeridas no §8 (Value Object `Cpf`, auth JWT, testes de use case com repo fake) se encaixam sem quebrar esta decisão.

## Alternativas consideradas

- **Multiple bounded contexts (ex.: `ordering` + `catalog` + `identity`):** modelagem mais fiel à realidade de um sistema de produção, mas transforma o demo em um exercício de orquestração inter-contexto antes de qualquer linha de regra de negócio. Descartado.
- **Result/Either pattern:** permite composição de erros sem exceções, mas exige que o aluno aprenda um novo tipo antes de escrever qualquer use case. Descartado.
- **Mapper classes explícitas:** mais fáceis de testar isoladamente, mas adicionam um arquivo a mais por entidade num projeto já pequeno. Descartado em favor de `toDomain()` inline.
- **Domain events + CQRS:** relevantes para consistência eventual, mas sem benefício real num MVP síncrono com um banco. Descartado.
