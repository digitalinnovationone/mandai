# Prompts da Live 2 — As 3 Formas de Usar o Claude Code

> **Mentoria Claude Code · DIO PRO Vitalício Week — Especial Agentes de AI**
>
> Esta é a coletânea de **todos os prompts e comandos** usados durante a Live 2, na ordem em que apareceram. Use este documento pra reproduzir a mentoria em casa, no seu projeto.

---

## Sobre este documento

A Live 2 demonstrou as **3 formas de usar o Claude Code** trabalhando em cima de um projeto real — o **Mandaí**, um app de pickup de comida:

| Forma | Característica | Demonstrada em | Documento gerado |
|---|---|---|---|
| **Default** | 1 agente, 1 contexto único | Etapa 4 | ERD em Mermaid |
| **Sub-agents** | Vários agentes, contextos isolados, sem comunicação | Etapa 5 | User Stories + ADRs |
| **Agent Teams** | Time orquestrado com Lead, comunicação entre agentes, split panes no tmux | Etapa 6 | Código do app (backend + frontend) |

**Como usar este documento:**

1. Garanta o estado inicial do repositório (próxima seção)
2. Siga as etapas em ordem (4 → 5 → 6)
3. Cada bloco contém: contexto, prompt/comando, e o que esperar de output

Todos os prompts foram pensados pra serem **copiados e colados** diretamente. Os system prompts dos sub-agents são **genéricos e reutilizáveis** — a especificidade do projeto Mandaí vai no prompt de invocação.

---

## Estado inicial do repositório

Antes de qualquer prompt, o repositório precisa estar nesse estado:

```
mandai-web/
├── ARCHITECTURE.md                ← decisões de arquitetura
├── design_handoff_mandai_web/     ← handoff exportado do Claude Design
│   ├── tokens.css
│   ├── app.css
│   ├── assets/
│   ├── screen-*.jsx
│   ├── shared.jsx
│   └── README.md
└── (vazio o resto — vamos construir nas etapas)
```

Comandos pra preparar:

```bash
# Cria o repo
mkdir mandai-web && cd mandai-web
git init

# (Adiciona ARCHITECTURE.md e design_handoff_mandai_web/ — ver materiais da live)
git add ARCHITECTURE.md design_handoff_mandai_web/
git commit -m "chore: estado inicial — arquitetura e handoff"
```

---

## Etapa 4 — Modo Default: ERD em Mermaid

> **Forma 1 do Claude Code:** 1 agente, 1 contexto único, até 1M tokens. Adequado pra tarefas contidas e focadas.

### Passo 1 — Inicializar o CLAUDE.md do projeto

Abra o Claude Code no diretório do projeto:

```bash
claude
```

Dentro do Claude Code, rode o slash command que gera o `CLAUDE.md` base:

```
/init
```

> O Claude Code lê o projeto e gera um `CLAUDE.md` base automaticamente.

Em seguida, **edite o `CLAUDE.md`** adicionando o contexto-chave do projeto (cole este conteúdo):

```markdown
## Sobre o projeto Mandaí

Mandaí é um app de pickup de comida sendo construído como demonstração
na Live 2 da DIO PRO Vitalício Week.

## Documentação do projeto

- ARCHITECTURE.md                  — decisões de arquitetura (raiz)
- design_handoff_mandai_web/       — handoff do Claude Design (raiz)
- docs/erd.md                      — modelo de dados em Mermaid
- docs/user-stories/               — user stories (1 arquivo por US)
- docs/adr/                        — ADRs numerados (NNNN-slug.md)

## Convenções

- Toda documentação fica em docs/
- Antes de qualquer decisão técnica, ler ARCHITECTURE.md
- NUNCA instalar dependência nova sem confirmação prévia
```

> **Por que isso importa:** esse arquivo vira a memória persistente do projeto. **Toda sessão futura** — em qualquer das 3 formas — vai ler isso antes de qualquer coisa. É o briefing pro próximo dev (que é uma IA).

### Passo 2 — Gerar o ERD em Mermaid

No mesmo Claude Code, cole o prompt principal:

```
Estou começando o projeto Mandaí — um app de pickup de comida.
A UI está especificada em design_handoff_mandai_web/.
As decisões de arquitetura estão em ARCHITECTURE.md.

Sua tarefa agora: gerar o ERD (Entity Relationship Diagram) do
Mandaí em Mermaid, salvo em docs/erd.md.

ANTES DE GERAR:
1. Leia o ARCHITECTURE.md, especialmente seção 4 (banco de dados)
2. Leia o design_handoff_mandai_web/ — telas e variações de estado
3. Identifique as entidades do domínio (Restaurant, MenuSection,
   MenuItem, Order, OrderItem) e os relacionamentos
4. Considere os estados das telas (sacola ativa, pedido em
   andamento, código MA-XXXX) — eles revelam atributos importantes
5. Me apresente um plano em até 7 bullets antes de escrever o ERD

QUANDO FOR ESCREVER:
- Use sintaxe Mermaid erDiagram
- Marque PK (chave primária) e FK (chave estrangeira) em cada entidade
- Inclua atributos essenciais (sem inflar com auditoria genérica)
- Comente cada relacionamento com cardinalidade clara
- Adicione um trecho de texto curto explicando as escolhas
  (especialmente os snapshots em OrderItem)

NÃO instale dependências. Não crie outros arquivos.
```

**O que esperar:**
- Plano em bullets antes da escrita
- Leitura dos arquivos do handoff e do `ARCHITECTURE.md`
- Geração de `docs/erd.md` com bloco `mermaid erDiagram` + texto explicativo

Abra o `docs/erd.md` no VS Code com o **preview Mermaid inline** (extensão *Markdown Preview Mermaid Support*) pra ver o diagrama renderizado.

### Passo 3 — Extrair o `.mmd` standalone (navegação visual)

Pra navegar no ERD com zoom, pan e foco em relacionamentos, gere um arquivo `.mmd` puro:

```
A partir de docs/erd.md, gere docs/erd.mmd contendo apenas o
código Mermaid puro (extraído do bloco mermaid), sem o wrapper
markdown. Mantenha o conteúdo do diagrama idêntico.

Esse arquivo .mmd vai ser aberto num plugin Mermaid do VS Code
pra navegação visual interativa.
```

**O que esperar:** `docs/erd.mmd` criado em segundos.

Abra `docs/erd.mmd` no VS Code com um **plugin Mermaid dedicado** (ex: *Mermaid Chart* ou *Mermaid Editor*) pra ter um painel interativo navegável.

### Commit final da Etapa 4

```bash
git add CLAUDE.md docs/erd.md docs/erd.mmd
git commit -m "feat: ERD do Mandaí gerado no modo Default (.md + .mmd)"
```

---

## Etapa 5 — Sub-agents: User Stories + ADRs em paralelo

> **Forma 2 do Claude Code:** múltiplos sub-agents especializados, cada um com **contexto isolado**, sem comunicação direta entre eles. Quem orquestra é o Claude principal.

A estratégia é criar **2 sub-agents genéricos e reutilizáveis** (PO e Arquiteto) e depois invocá-los em paralelo, passando a especificidade do projeto Mandaí no prompt de invocação.

### Passo 1 — Criar o sub-agente `po`

No Claude Code, abra a UI de agentes:

```
/agents
```

Navegue: **Library → Create new agent → Project scope → modo manual**.

**Campos a preencher:**

```
Nome:        po
Descrição:   Use este agente para escrever user stories estruturadas
             a partir de fontes (handoff, mockups, especificações).
             Especialista em traduzir requisitos em backlog rastreável.
Tools:       Read, Write, Edit, Glob, Grep
```

**System prompt do PO** (genérico — não amarra a projeto específico):

```
Você é um Product Owner experiente.

Sua especialidade é traduzir requisitos visuais e técnicos em user
stories claras, rastreáveis e prontas pra implementação. As tarefas
específicas — quais US, quais fontes ler, onde salvar, formato exato —
sempre vêm no prompt de invocação. Você é flexível e se adapta.

PRINCÍPIOS:
- User story segue o formato "Como X, quero Y, para Z"
- Cada US tem vínculo explícito com algum artefato (tela, mockup,
  documento, entidade) que justifica sua existência
- Estados (vazio, carregando, erro, populado) podem virar US separadas
  quando a complexidade justifica
- Cada US tem fronteira clara: o que entra, o que NÃO entra

PADRÃO DE ESCRITA (cada user story vira um arquivo .md):

# US-NN: <Título curto>

**Como** [usuário], **quero** [ação], **para** [benefício].

- Referência visual: <tela/mockup>
- Estados envolvidos: <lista>
- Entidades de domínio: <lista>

REGRAS GERAIS:
- Numeração com 2 dígitos, slug em kebab-case
  (ex: US-01-titulo-curto.md)
- Ao gerar múltiplas US num diretório, criar também um README.md
  com índice (links pros arquivos) e template padrão, salvo se a
  invocação pedir o contrário
- Linguagem simples, sem jargão técnico desnecessário
- Cada US foca em UM objetivo claro
- Se a fonte estiver ambígua, marque [DECISÃO PENDENTE] na US
- Se identificar algo importante que não foi pedido, marque
  [SUGESTÃO ADICIONAL] no README do diretório
```

O agente fica salvo em `.claude/agents/po.md`.

### Passo 2 — Criar o sub-agente `arquiteto`

Repita o fluxo:

```
/agents
```

**Campos:**

```
Nome:        arquiteto
Descrição:   Use este agente para documentar decisões arquiteturais
             em ADRs (Architecture Decision Records).
             Especialista no formato Michael Nygard.
Tools:       Read, Write, Edit, Glob, Grep
```

**System prompt do Arquiteto** (também genérico):

```
Você é um Arquiteto de Software experiente.

Sua especialidade é documentar decisões arquiteturais em ADRs
(Architecture Decision Records) seguindo o formato Michael Nygard.
As tarefas específicas — quais decisões, onde salvar, numeração,
fontes a consultar — sempre vêm no prompt de invocação. Você é
flexível e se adapta.

PRINCÍPIOS:
- ADR é decisão tomada, não discussão aberta
- Frases curtas e diretas: "decidimos X porque Y"
- Toda decisão referencia o contexto/força que a motivou
- Alternativas consideradas são sempre listadas, com motivo do descarte

PADRÃO DE ESCRITA (cada ADR vira um arquivo .md):

# ADR-NNNN: <título>

- **Status:** Accepted | Superseded by ADR-XXXX | Deprecated
- **Data:** YYYY-MM-DD

## Contexto
Qual problema ou força levou a esta decisão?

## Decisão
O que foi decidido, em frases curtas e diretas.

## Consequências
O que isso facilita, dificulta, ou compromete a manter.

## Alternativas consideradas
Outras opções e o motivo de cada uma ter sido descartada.

REGRAS GERAIS:
- Numeração com 4 dígitos, slug em kebab-case
  (ex: 0001-titulo-curto.md)
- Status Accepted é o padrão; Superseded vira quando uma decisão
  futura substitui a anterior
- No primeiro ADR de um projeto, criar também um README.md no
  diretório de ADRs com índice + template, salvo se a invocação
  pedir o contrário
```

Salvo em `.claude/agents/arquiteto.md`.

Commit dos dois agentes:

```bash
git add .claude/agents/
git commit -m "chore: cria sub-agents po e arquiteto"
```

### Passo 3 — Invocar os dois sub-agents em paralelo

Aqui está o **coração da Etapa 5**: um prompt grande que carrega **toda a especificidade do projeto Mandaí** e dispara os dois sub-agents em paralelo.

> **Por que paralelo:** demonstra a Forma 2 em estado puro — dois contextos isolados rodando ao mesmo tempo, sem nenhuma comunicação entre eles.

Cole o prompt no Claude Code principal:

```
Em paralelo, execute as duas tarefas abaixo:

═══ TAREFA 1 — Use o agente po ═══

Gere as user stories do projeto Mandaí em docs/user-stories/, com
1 arquivo .md por US, derivadas das telas do handoff e do modelo
de dados.

FONTES A LER:
- design_handoff_mandai_web/ — telas e variações de estado
- docs/erd.md                — modelo de dados
- ARCHITECTURE.md            — escopo e restrições do MVP

USER STORIES A GERAR (US-01 a US-10):

- US-01 Descobrir restaurantes — Como cliente, quero ver restaurantes
  próximos na Home, para escolher onde pedir.
- US-02 Filtrar por categoria — Como cliente, quero filtrar
  restaurantes por tipo de cozinha, para encontrar o que estou afim.
- US-03 Buscar — Como cliente, quero buscar por nome de restaurante
  ou prato, para localizar rapidamente.
- US-04 Ver cardápio — Como cliente, quero ver o cardápio de um
  restaurante com seções e fotos, para escolher um item.
- US-05 Customizar item — Como cliente, quero escolher acompanhamentos,
  adicionais e adicionar observações ao pedir, para personalizar.
- US-06 Gerenciar sacola — Como cliente, quero ajustar quantidade,
  remover itens e ver o total, antes de finalizar.
- US-07 Aplicar cupom — Como cliente, quero usar um código de cupom,
  para receber desconto. (opcional no MVP)
- US-08 Finalizar e receber código — Como cliente, quero confirmar
  o pedido e receber um código MA-XXXX + QR, para apresentar no balcão.
- US-09 Lidar com estados de erro — Como cliente, quero ver mensagem
  clara em restaurante fechado, item esgotado, busca sem resultados
  ou erro técnico.
- US-10 Trocar de restaurante com sacola — Como cliente, quero ser
  avisado ao mudar de restaurante com itens na sacola, para não
  perder a seleção. (opcional no MVP)

ESPECIFICIDADES:
- Saída: 1 arquivo por user story em docs/user-stories/, nomenclatura
  US-NN-slug.md (slug em kebab-case)
- Crie também docs/user-stories/README.md com índice (links pros 10
  arquivos) e o template padrão de US
- Sem critérios de aceite detalhados, sem points — escopo de mentoria
- Cada US ligada explicitamente à(s) tela(s) do handoff
- Se o handoff revelar algo fora desta lista, marque [SUGESTÃO ADICIONAL]
  no README do diretório

═══ TAREFA 2 — Use o agente arquiteto ═══

Gere os 7 ADRs iniciais em docs/adr/ documentando decisões do projeto
Mandaí. Crie também docs/adr/README.md com índice e template.

FONTES A LER:
- ARCHITECTURE.md            — decisões já tomadas (sua função é
                                DOCUMENTAR no formato ADR, não revisitar)
- design_handoff_mandai_web/ — contexto visual
- docs/erd.md                — modelo de dados

ADRs A GERAR (status Accepted em todos):

- 0001 Monorepo com pastas apps/* sem workspaces
  Contexto: público com nível básico, queremos simplicidade didática.
- 0002 Fastify + DDD manual no backend
  Contexto: camadas explícitas, DI sem mágica, friendly em serverless.
- 0003 Next.js 15 App Router no frontend
  Contexto: Vercel-native, next/image, Server Components por padrão.
- 0004 Prisma + Neon Postgres
  Contexto: ORM popular, Postgres serverless, integração 1-clique.
- 0005 DDD/Clean enxuto com 1 bounded context
  Contexto: 1 contexto ordering, sem múltiplos bounded contexts,
  sem Result pattern, sem CQRS.
- 0006 Sem autenticação no MVP
  Contexto: foco em arquitetura; auth fica como extensão pós-MVP.
- 0007 Documentação em docs/ (ERD, ADR, User Stories)
  Contexto: padroniza onde o "porquê" do projeto vive.

ESPECIFICIDADES:
- Saída: 7 arquivos docs/adr/NNNN-slug.md + docs/adr/README.md
- Slug em kebab-case
- Frases diretas, sem rodeios

═══ EXECUÇÃO ═══

Dispare as duas tarefas AO MESMO TEMPO. Não espere a primeira terminar
para começar a segunda. Quando ambas terminarem, sumário em 5 bullets
do que cada agente entregou.
```

**O que esperar:**
- Duas chamadas de sub-agent disparam simultaneamente
- Arquivos chegam **em paralelo** em `docs/user-stories/US-XX-*.md` e `docs/adr/00NN-*.md`
- Ao final, sumário consolidado pelo Claude principal

### Passo 4 (didático) — Demonstrar isolamento de contexto

Pra evidenciar que os sub-agents trabalharam em bolhas separadas, pergunte ao Claude principal:

```
Quantas user stories o PO gerou? E quais ADRs o arquiteto produziu?
```

**O que esperar:** o Claude principal responde com base nos **sumários** que recebeu de cada sub-agent — não tem acesso ao que cada um leu/pensou internamente. **Cada contexto morreu junto com o sub-agente.**

### Commit final da Etapa 5

```bash
git add docs/user-stories/ docs/adr/
git commit -m "feat: US e ADRs gerados via sub-agents em paralelo (po + arquiteto)"
```

---

## Etapa 6 — Agent Teams: time orquestrado em TMUX

> **Forma 3 do Claude Code:** feature experimental que monta um time com **Lead + N especialistas**, **comunicação entre os agentes**, e **split panes automáticos no tmux**. Adequado pra trabalhos grandes com partes paralelizáveis.

### Passo 1 — Pré-requisitos (instalação e configuração)

**1.1 — Instalar tmux**

```bash
# Mac
brew install tmux

# Linux (Debian/Ubuntu)
sudo apt install tmux

# Windows: rodar dentro do WSL2 (tmux não é nativo do Windows)

# Confirma
tmux -V
```

**1.2 — Atualizar o Claude Code**

```bash
claude update
claude --version
```

> Agent Teams é experimental. **Sempre atualize antes** pra garantir que o flag está disponível.

**1.3 — Habilitar Agent Teams + split panes automáticos**

Crie ou edite `~/.claude/settings.json`:

```bash
cat > ~/.claude/settings.json << 'EOF'
{
  "env": {
    "CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS": "1"
  },
  "preferences": {
    "tmuxSplitPanes": true
  }
}
EOF
```

**O que cada chave faz:**
- `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1` — habilita o feature de Agent Teams
- `tmuxSplitPanes: true` — faz o Claude Code criar os panes do tmux automaticamente quando o time é criado

**1.4 — Criar uma sessão tmux**

```bash
tmux new-session -s claude-work
```

**1.5 — Iniciar o Claude Code com permissões liberadas**

Dentro da sessão tmux:

```bash
claude --dangerously-skip-permissions
```

> ⚠️ **Atenção ao flag `--dangerously-skip-permissions`**: ele pula as confirmações que o Claude Code pediria pra cada arquivo que vai mexer e cada comando que vai rodar. **Pra demo ao vivo faz sentido — senão a sessão inteira passa em aprovações.** **Pra projeto sério, NÃO use isso, principalmente em código que não está em sandbox seguro.**

### Passo 2 — Criar o `mandaí-development-team`

Dentro do Claude Code rodando na sessão tmux, cole o prompt de criação completo:

```
Crie um Agent Team chamado `mandaí-development-team` com 4 agentes em
paralelo, que utilizarão o ERD, as User Stories e os ADRs, além do
handoff do Claude Design, para desenvolver uma solução completa
incluindo backend e frontend. Baseie-se também no arquivo
ARCHITECTURE.md na raiz do projeto.

Agente 1 — Product Owner
- Name: product-owner-agent
- Model: Sonnet
- Ferramentas: busca de arquivos para inspecionar as user stories em /docs/
- Output: sempre arquivos `.md` — pode incrementar arquivos existentes
  ou criar novos conforme necessário
- Responsabilidades:
  - Responder dúvidas dos outros agentes em relação às user stories
  - Resolver conflitos de requisitos
  - Resolver ambiguidades
  - Documentar as principais decisões da equipe

Agente 2 — Architect
- Name: architect-agent
- Model: Sonnet
- Base de decisões: arquivo `ARCHITECTURE.md` na raiz e ADRs em `/docs/adr/`
- Output: arquivos `.md` — novos ADRs em `/docs/adr/` sempre que tomar decisões técnicas
- Responsabilidades:
  - Responder dúvidas dos outros agentes do time de desenvolvimento
  - Tomar decisões técnicas conforme necessário e documentar TODAS em arquivos ADR
  - Validar se a solução desenvolvida pelos outros agentes está aderente à arquitetura e ao design documentados

Agente 3 — Backend Developer
- Name: backend-agent
- Model: Sonnet
- Output: código do backend em `apps/api/`, na estrutura definida pelos ADRs
- Base de convenções: instruções em `/docs/` e arquivo `ARCHITECTURE.md`
- Responsabilidades:
  - Ler o ERD em `docs/erd.md`
  - Ler as user stories em `docs/user-stories/`
  - Ler os ADRs em `docs/adr/`
  - Ler o `ARCHITECTURE.md` na raiz
  - Começar pelas funcionalidades com menor dependência
  - Implementar todas as user stories que ainda não foram implementadas
  - Respeitar as decisões arquiteturais e de design
  - Em caso de dúvida sobre funcionalidades, consultar o `product-owner-agent`
  - Em caso de dúvida técnica, consultar o `architect-agent`
  - Garantir que o código está limpo e funcionando antes de finalizar

Agente 4 — Frontend Developer
- Name: frontend-agent
- Model: Sonnet
- Descrição: responsável pela implementação, testes e integração do frontend com o restante da equipe
- Output: código do frontend em `apps/web/`, na estrutura definida pelos ADRs
- Base de convenções: instruções em `/docs/` e arquivo `ARCHITECTURE.md`
- Responsabilidades:
  - Ler as user stories em `docs/user-stories/`
  - Ler os ADRs em `docs/adr/`
  - Ler o `ARCHITECTURE.md` na raiz
  - Conversar com o `backend-agent` para obter o contrato da API que deverá integrar
  - Começar pelas atividades com menor dependência
  - Criar os componentes React
  - Integrar os componentes nas páginas
  - Integrar com a API do backend
  - Manter o código limpo
  - Implementar todas as user stories definidas
  - Respeitar as decisões arquiteturais e de design
  - Em caso de dúvida técnica, consultar o `architect-agent`
  - Em caso de dúvida funcional, consultar o `product-owner-agent`

Lead
- Name: lead-agent
- Model: Sonnet
- Descrição: garantir a perfeita coordenação entre os 4 agentes do time
- Output: relatório final de release em `/docs/release/0_1_0.md`, consolidando os reports de cada agente
- Responsabilidades:
  - Coordenar a comunicação e o fluxo de trabalho entre PO, Architect, Backend Dev e Frontend Dev
  - Consolidar o relatório final de release contendo as seguintes seções:
    - Funcionalidades implementadas
    - Lista de dúvidas de negócio surgidas durante a implementação
    - Lista de dúvidas técnicas surgidas durante a implementação
    - Versão executiva do relatório, voltada para os stakeholders
    - Riscos mapeados pelos 4 agentes
    - Próximo passo esperado para a equipe
```

**O que esperar:**
- O Claude Code cria os **panes automaticamente** no tmux (1 pane por teammate)
- O **Lead** começa a coordenar — divide tarefas, recebe status, ajusta rota
- Os 4 especialistas trabalham em paralelo, cada um no seu pane
- Ao final, o Lead consolida o relatório de release em `docs/release/0_1_0.md`

### Validação do resultado

Ao final do trabalho do time, suba a aplicação localmente pra validar:

```bash
# Backend
cd apps/api
npx prisma db push
npx prisma db seed
npm run dev          # roda na porta 3001

# Frontend (em outro terminal)
cd apps/web
npm run dev          # roda na porta 3000
```

Abra `http://localhost:3000` no navegador.

---

## Resumo: o que muda em cada forma

| Aspecto | Default | Sub-agents | Agent Teams |
|---|---|---|---|
| Quantos agentes? | 1 | N (isolados) | Lead + N teammates |
| Contexto | Único | 1 por agente, isolado | 1 por agente, com comunicação |
| Comunicação entre agentes | N/A | **Não existe** | **Sim, coordenada pelo Lead** |
| Quem orquestra? | Você | Claude principal | Lead |
| TMUX necessário? | Não | Não | Sim |
| Quando usar | Tarefa contida e focada | Especialização sem mistura de contexto | Trabalho coletivo coordenado |

---

## Links úteis

- **Documentação Claude Code**: https://docs.claude.com/en/docs/claude-code/overview
- **Sub-agents (`/agents`)**: https://docs.claude.com/en/docs/claude-code/sub-agents
- **Claude Design (suporte)**: https://support.claude.com/en/articles/14604416-get-started-with-claude-design
- **tmux cheatsheet**: https://tmuxcheatsheet.com
- **Mermaid `erDiagram`**: https://mermaid.js.org/syntax/entityRelationshipDiagram.html

---

*DIO PRO Vitalício Week — Especial Agentes de AI · Live 2 · As 3 Formas de Usar o Claude Code*
