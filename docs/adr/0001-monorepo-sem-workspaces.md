# ADR-0001: Monorepo com pastas `apps/*` sem workspaces

- **Status:** Accepted
- **Data:** 2026-05-11
- **Decisores:** equipe Mandaí (mentoria DIO)

## Contexto

O projeto tem dois apps independentes: `apps/web` (Next.js) e `apps/api` (Fastify). O público-alvo da mentoria tem conhecimento básico — qualquer overhead de ferramental reduz o tempo disponível para ensinar arquitetura.

Ferramentas como npm workspaces, pnpm workspaces e Turborepo exigem que o aluno entenda hoisting de dependências, root `package.json`, e o conceito de workspace antes de rodar qualquer coisa. Isso não é o foco do curso.

A Vercel suporta natively o modelo de "dois projetos, um repositório" via campo Root Directory — o que torna desnecessária qualquer orquestração monorepo para o deploy (ver §5.1).

## Decisão

Não haverá `package.json` na raiz do repositório nem configuração de workspaces. Cada pasta em `apps/` é um projeto npm independente: para desenvolver, o aluno entra na pasta, roda `npm install` e `npm run dev`. Para fazer deploy, dois projetos Vercel apontam para o mesmo repositório com Root Directory diferente.

## Consequências

- **Positivas:**
  - Onboarding trivial: `cd apps/web && npm install && npm run dev` funciona sem pré-requisitos.
  - Sem mágica de hoisting — o aluno vê exatamente quais dependências cada app tem.
  - Compatível com o deploy Vercel descrito em §5.1 sem configuração extra.

- **Negativas / tradeoffs:**
  - Dependências compartilhadas (TypeScript, Zod, etc.) são instaladas duas vezes — uma em cada `apps/*`.
  - Sem `npm run dev` na raiz para subir tudo de uma vez; o desenvolvedor precisa abrir dois terminais.
  - Scripts de CI precisam iterar explicitamente sobre cada `apps/*`.

- **Neutras:**
  - Código não é compartilhado entre `apps/web` e `apps/api` — não há pacote `packages/shared` neste projeto, o que elimina a principal razão para workspaces.

## Alternativas consideradas

- **npm workspaces / pnpm workspaces:** permitem um `npm install` na raiz e scripts unificados, mas exigem que o aluno entenda hoisting e o conceito de workspace antes de chegar em qualquer linha de produto. Descartado por adicionar complexidade de ferramental desnecessária para o objetivo didático.
- **Turborepo:** adiciona cache de builds e execução paralela, mas traz seu próprio arquivo de configuração (`turbo.json`) e mais um conceito a explicar. Descartado pelo mesmo motivo.
- **Dois repositórios separados:** eliminaria completamente qualquer confusão de monorepo, mas dificultaria mostrar a relação entre frontend e backend no mesmo contexto de aula. Descartado.
