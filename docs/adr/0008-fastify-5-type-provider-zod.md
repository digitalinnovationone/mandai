# ADR-0008: Adoção do Fastify 5 (exigido por fastify-type-provider-zod v4)

- **Status:** Accepted
- **Data:** 2026-05-11
- **Decisores:** equipe Mandaí (mentoria DIO)

## Contexto

ADR-0002 decidiu pelo uso de Fastify com `fastify-type-provider-zod` para validação de payload e type-safety. À época da escrita do `ARQUITETURA.md` §2, o Fastify 4 era a versão estável mais difundida e estava implicitamente assumida como alvo.

Durante a implementação do skeleton em `apps/api`, verificou-se que `fastify-type-provider-zod@4` (a versão com suporte a Zod v3 e type inference completa) exige `fastify >= 5.0.0` como peer dependency. Usar `fastify-type-provider-zod@3` (compatível com Fastify 4) implicaria abrir mão de melhorias relevantes de inferência de tipos introduzidas na v4 do provider.

O Fastify 5 tem API pública backward-compatible com Fastify 4 para o subset de funcionalidades usado neste projeto (registro de plugins, `fastify-type-provider-zod`, `@fastify/cors`, `setErrorHandler`). Não há quebra de contratos nos endpoints definidos em §2.4.

## Decisão

Adotamos **Fastify 5** como runtime do backend. A escolha é determinada pela dependência transitiva: `fastify-type-provider-zod@4` exige Fastify 5. A superfície de API utilizada no projeto é totalmente compatível com a migração. ADR-0002 permanece válido — esta decisão é um refinamento de versão, não uma mudança de stack.

## Consequências

- **Positivas:**
  - `fastify-type-provider-zod@4` oferece inferência de tipos mais precisa para schemas Zod nos handlers — menos `as` casts necessários.
  - Fastify 5 traz melhorias internas de performance e ajustes de type-safety no core; nenhuma mudança visível nos endpoints do projeto.
  - Alinhamento com a versão mais recente estável facilita encontrar exemplos e documentação atualizados.

- **Negativas / tradeoffs:**
  - Fastify 5 é mais recente — alguns tutoriais e respostas do Stack Overflow ainda referenciam Fastify 4; pequena chance de confusão para mentees que pesquisarem.
  - A decisão de versão ficou implícita durante a implementação; este ADR a torna explícita retroativamente.

- **Neutras:**
  - Nenhuma alteração nas quatro camadas DDD (`domain`, `application`, `infra`, `http`) — a mudança é transparente para as regras de negócio.

## Alternativas consideradas

- **Manter Fastify 4 + fastify-type-provider-zod@3:** possível, mas perde as melhorias de inferência de tipos da v4 do provider. A penalidade de ergonomia de TypeScript não vale manter uma versão mais antiga do framework. Descartado.
- **Trocar fastify-type-provider-zod por validação Zod manual nos handlers:** removeria a integração nativa de schema/type, aumentando boilerplate e reduzindo a didática de "um schema serve para runtime e compile-time". Descartado.
