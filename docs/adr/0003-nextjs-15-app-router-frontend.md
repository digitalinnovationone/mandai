# ADR-0003: Next.js 15 App Router no frontend

- **Status:** Accepted
- **Data:** 2026-05-11
- **Decisores:** equipe Mandaí (mentoria DIO)

## Contexto

O frontend precisa renderizar páginas de restaurante com SEO (Google indexa cardápios), otimizar imagens de pratos vindas do Unsplash, e manter um estado de sacola persistido no cliente. O handoff é desktop-only (1440 px) e não há autenticação no MVP.

A Vercel, plataforma de deploy escolhida, tem integração nativa com Next.js: detecta o framework automaticamente, configura build e previews sem intervenção manual. Server Components, introduzidos no App Router, permitem que páginas de listagem de restaurantes façam `fetch()` direto no servidor — eliminando o roundtrip cliente→API para dados públicos.

O estado da sacola, por outro lado, é inerentemente client-side: precisa de `localStorage` e reatividade imediata. Isso exige `'use client'` nos componentes de sacola e no modal de adição.

## Decisão

Usamos Next.js 15 com App Router. Server Components são o padrão para páginas de listagem e cardápio (ver §3.2). Componentes que requerem interatividade — `CartContext`, `AddItemModal`, `CartSidebar` — são marcados `'use client'`. TanStack Query é usado apenas para mutations e leituras client-side que dependem do estado da sacola.

A sacola é implementada como `CartContext + useReducer + localStorage` — sem Zustand ou outra lib de state management (ver §3.2).

Rotas seguem paths em português, conforme §3.1: `/`, `/categoria/[slug]`, `/restaurante/[id]`, `/busca`, `/sacola`, `/confirmacao/[orderId]`.

## Consequências

- **Positivas:**
  - Deploy em um clique na Vercel com zero configuração de framework.
  - `next/image` otimiza e serve imagens do Unsplash com lazy loading, blur placeholder e dimensionamento automático.
  - Server Components eliminam JS no cliente para páginas puramente de leitura (Home, Categoria, Cardápio).
  - App Router introduz layouts aninhados e loading states nativos — reduz boilerplate de loading/error por rota.

- **Negativas / tradeoffs:**
  - App Router tem curva de aprendizado maior que Pages Router para quem já conhece Next.js — a distinção Server Component / Client Component precisa ser ensinada explicitamente.
  - Sem Zustand, a sacola é reimplementada com Context + useReducer; isso é mais verboso, mas serve ao objetivo didático de mostrar a primitiva antes da abstração.
  - `NEXT_PUBLIC_API_BASE_URL` precisa ser configurada corretamente para cada ambiente (local, Vercel preview, produção).

- **Neutras:**
  - TanStack Query fica como dependência mínima — só para mutations e leituras dependentes de estado client-side. O aluno aprende o conceito sem o peso de uma solução de state management completa.

## Alternativas consideradas

- **Next.js com Pages Router:** mais familiar para quem aprendeu Next.js antes de 2023, mas não aproveita Server Components e exige mais configuração de `getServerSideProps`/`getStaticProps`. Descartado em favor do App Router que é o padrão atual.
- **Remix:** similar ao App Router em filosofia (loaders server-side, actions), mas menos integrado à Vercel e com ecossistema menor de tutoriais em português. Descartado.
- **Vite + React SPA:** mais simples para o aluno iniciante, mas perde SSR para SEO de cardápios. Descartado.
