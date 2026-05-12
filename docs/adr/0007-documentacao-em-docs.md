# ADR-0007: Documentação em `docs/` (ERD, ADR, User Stories)

- **Status:** Accepted
- **Data:** 2026-05-11
- **Decisores:** equipe Mandaí (mentoria DIO)

## Contexto

Projetos educacionais precisam de documentação que sobreviva à rotatividade de mentees. O "porquê" de cada decisão arquitetural, o modelo de dados, e o escopo de produto precisam ser localizáveis sem precisar perguntar a alguém.

Sem uma convenção clara, documentação tende a ficar espalhada em comentários de código, wikis externas, ou simplesmente não existir. O GitHub renderiza Mermaid nativamente em arquivos `.md`, o que elimina a necessidade de ferramentas externas para diagramas.

A raiz do repositório já tem `ARQUITETURA.md` como documento canônico de intenção; `docs/` organiza os artefatos derivados e evolutivos.

## Decisão

Toda documentação de produto e arquitetura vive em `docs/` na raiz do repositório, com três artefatos obrigatórios (ver §6):

1. **`docs/erd.md`** — diagrama `erDiagram` em Mermaid refletindo o `schema.prisma`. Qualquer PR que altere `schema.prisma` deve atualizar `docs/erd.md` no mesmo commit.

2. **`docs/adr/`** — um arquivo Markdown numerado por decisão arquitetural. ADRs são imutáveis: para mudar uma decisão, cria-se um novo ADR e o anterior recebe `Status: Superseded by ADR-NNNN`. O arquivo `docs/adr/README.md` mantém o índice e o template.

3. **`docs/user-stories.md`** — US-01 a US-10 derivadas das telas do handoff, formato "Como X, quero Y, para Z", sem critérios de aceite detalhados (ver §6.3).

## Consequências

- **Positivas:**
  - Um único lugar para procurar documentação — sem fragmentação entre wiki, comentários e Notion.
  - `docs/erd.md` renderiza no GitHub sem plugin externo (Mermaid nativo).
  - ADRs imutáveis criam histórico auditável de decisões — é possível entender o raciocínio em qualquer ponto do tempo.
  - A regra de co-commit ERD + schema impede que o diagrama fique desatualizado silenciosamente.

- **Negativas / tradeoffs:**
  - A regra de co-commit `erd.md + schema.prisma` exige disciplina — não há validação automática no CI por padrão.
  - ADRs imutáveis significam que erros de escrita não podem ser corrigidos sem criar um novo ADR ou um commit de errata explícito.
  - `docs/user-stories.md` sem critérios de aceite formais é suficiente para a mentoria, mas insuficiente para um time de produto real.

- **Neutras:**
  - O template de ADR adotado é o formato Michael Nygard (Contexto / Decisão / Consequências / Alternativas consideradas) — padrão amplamente reconhecido e fácil de aprender.

## Alternativas consideradas

- **Wiki do GitHub:** centralizado, mas desacoplado do código — não aparece em PRs, não é versionado junto com mudanças de schema. Descartado.
- **Notion ou Confluence:** ferramentas externas exigem acesso separado e criam risco de documentação sair de sincronia com o código. Descartado.
- **Comentários JSDoc no código:** adequado para documentação de API, mas inadequado para decisões arquiteturais e modelos de dados. Descartado para este fim.
- **ADRs no diretório raiz (sem `docs/`):** possível, mas polui a raiz junto com `ARQUITETURA.md`, `.nvmrc`, `.gitignore`. Descartado em favor de um diretório dedicado.
