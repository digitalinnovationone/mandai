# US-08 Finalizar e receber código

**Como** cliente, **quero** confirmar meu pedido e receber um código `MA-XXXX` com QR para apresentar no balcão, **para** retirar meu rango sem precisar de cadastro.

---

## Telas relacionadas do handoff

- `screen-confirm.jsx (FormState)` — estado de preenchimento: campo de nome com autofoco, resumo com total e botão "Confirmar pedido". Copy: "Falta só seu nome".
- `screen-confirm.jsx (DoneState)` — estado de confirmação (tela principal do mock):
  - Card escuro com ícone de check verde, "Pode vir buscar, Marina!".
  - QR code 208×208 numa moldura branca.
  - Código `MA-XXXX` com botão "Copiar" (clipboard API).
  - Ações: "Baixar QR" e "WhatsApp" (pré-formatado via `wa.me`).
  - Tempo estimado de preparo e ID interno do pedido.
  - Card do restaurante com endereço, telefone, botões "Ver rota" e "Ligar".
  - Resumo de itens e totais.
  - Instruções de retirada em 4 passos.

## Fluxo principal

1. Cliente clica "Finalizar pedido" na sacola e é levado para o estado FORM em `/confirmacao/[orderId]`.
2. Digita seu nome (campo com autofoco).
3. Clica "Confirmar pedido" — o frontend faz `POST /api/orders` com o conteúdo da sacola.
4. O backend gera o código `MA-XXXX`, o `qrPayload` e o `estimatedReadyAt`.
5. O frontend redireciona para o estado DONE mostrando o QR e o código.
6. Cliente mostra o QR (ou diz o código) no balcão e paga diretamente ao restaurante.

## Notas de produto

- Formato do código: `MA-XXXX`, alfanumérico maiúsculo, **sem** os caracteres ambíguos `0`, `O`, `1`, `I`. O backend é responsável pela geração.
- O QR do handoff é decorativo (`QrCodePattern`). Em produção, usar `qrcode.react` renderizando o `qrPayload` retornado pelo backend.
- O código é copiável via clipboard API. Botão "Baixar QR" salva PNG; botão "WhatsApp" abre `wa.me/?text=…`.
- Não há autenticação — apenas o nome é solicitado para personalizar a mensagem no balcão.
- Pagamento acontece no balcão (Pix, cartão ou dinheiro); não há integração de pagamento online.
- Rota canônica: `/confirmacao/[orderId]` — conforme `ARQUITETURA.md §3.1`.
- Endpoint: `POST /api/orders` (criação) e `GET /api/orders/:id` (consulta).
