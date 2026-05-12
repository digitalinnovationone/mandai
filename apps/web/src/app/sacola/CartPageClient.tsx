"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { useCart } from "@/modules/cart/context";
import { useCreateOrder } from "@/modules/orders/hooks/useCreateOrder";
import type { CartItem } from "@/modules/cart/types";

function formatPrice(cents: number): string {
  return (cents / 100).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

function CartItemRow({ item }: { item: CartItem }) {
  const { dispatch } = useCart();

  const itemTotal =
    (item.basePriceCents +
      item.modifiers.reduce((s, m) => s + m.priceDelta, 0)) *
    item.qty;

  return (
    <div
      style={{
        display: "flex",
        gap: 16,
        padding: "16px 0",
        borderBottom: "1px solid var(--border-1)",
      }}
    >
      <div style={{ flex: 1 }}>
        <div
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: 16,
            color: "var(--ink-800)",
            marginBottom: 4,
          }}
        >
          {item.name}
        </div>
        {item.modifiers.length > 0 && (
          <div
            style={{
              fontSize: 13,
              color: "var(--fg-2)",
              marginBottom: 4,
              lineHeight: 1.4,
            }}
          >
            {item.modifiers.map((m) => m.option).join(", ")}
          </div>
        )}
        {item.note && (
          <div style={{ fontSize: 12, color: "var(--fg-3)", marginBottom: 4 }}>
            Obs: {item.note}
          </div>
        )}
        <span className="price" style={{ fontSize: 15, color: "var(--ink-800)" }}>
          {formatPrice(itemTotal)}
        </span>
      </div>

      {/* Qty stepper + remove */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          flexShrink: 0,
        }}
      >
        <button
          className="icon-btn"
          style={{ width: 32, height: 32 }}
          aria-label="Diminuir quantidade"
          onClick={() =>
            dispatch({
              type: "UPDATE_QTY",
              payload: { id: item.id, qty: item.qty - 1 },
            })
          }
        >
          <Minus size={14} />
        </button>
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontWeight: 600,
            fontSize: 16,
            width: 24,
            textAlign: "center",
          }}
          role="spinbutton"
          aria-valuenow={item.qty}
          aria-valuemin={0}
          aria-valuemax={20}
          aria-label={`Quantidade: ${item.qty}`}
        >
          {item.qty}
        </span>
        <button
          className="icon-btn"
          style={{ width: 32, height: 32 }}
          aria-label="Aumentar quantidade"
          onClick={() =>
            dispatch({
              type: "UPDATE_QTY",
              payload: { id: item.id, qty: item.qty + 1 },
            })
          }
        >
          <Plus size={14} />
        </button>

        <button
          className="icon-btn"
          style={{ width: 32, height: 32, marginLeft: 4 }}
          aria-label={`Remover ${item.name}`}
          onClick={() =>
            dispatch({ type: "REMOVE_ITEM", payload: { id: item.id } })
          }
        >
          <Trash2 size={14} color="var(--tomate-600)" />
        </button>
      </div>
    </div>
  );
}

export default function CartPageClient() {
  const { state, totalCents, dispatch } = useCart();
  const router = useRouter();
  const createOrder = useCreateOrder();
  const [customerName, setCustomerName] = useState("");

  const isEmpty = state.items.length === 0;
  const canFinalize = customerName.trim().length > 0 && !createOrder.isPending;

  async function handleFinalize() {
    if (!state.restaurantId || !canFinalize) return;
    try {
      const order = await createOrder.mutateAsync({
        restaurantId: state.restaurantId,
        customerName: customerName.trim(),
        items: state.items.map((i) => ({
          menuItemId: i.menuItemId,
          qty: i.qty,
          modifiers: i.modifiers,
          note: i.note,
        })),
      });
      router.push(`/confirmacao/${order.id}`);
    } catch (err) {
      console.error("Erro ao finalizar pedido:", err);
    }
  }

  // ── Empty state ─────────────────────────────────────────────────
  if (isEmpty) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "60vh",
          textAlign: "center",
          padding: "80px 24px",
        }}
      >
        <ShoppingBag
          size={72}
          color="var(--ink-150)"
          style={{ marginBottom: 24 }}
        />
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 800,
            fontSize: 28,
            letterSpacing: "-0.025em",
            color: "var(--ink-800)",
            marginBottom: 12,
          }}
        >
          Carrinho vazio que nem geladeira de domingo
        </h2>
        <p
          style={{
            color: "var(--fg-2)",
            marginBottom: 32,
            fontSize: 16,
            maxWidth: 400,
          }}
        >
          Que tal escolher algo gostoso pra pedir? São mais de 800 restaurantes
          esperando você.
        </p>
        <Link
          href="/"
          className="btn btn-primary"
          style={{ display: "inline-flex", textDecoration: "none" }}
        >
          Bora escolher um rango? <ArrowRight size={16} />
        </Link>
      </div>
    );
  }

  // ── Cart with items ──────────────────────────────────────────────
  return (
    <div
      className="container"
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 380px",
        gap: 40,
        paddingTop: 40,
        paddingBottom: 64,
        alignItems: "start",
      }}
    >
      {/* Left: items list */}
      <div>
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 800,
            fontSize: 28,
            letterSpacing: "-0.025em",
            color: "var(--ink-800)",
            marginBottom: 4,
          }}
        >
          Sua sacola
        </h2>
        {state.restaurantName && (
          <p style={{ color: "var(--fg-2)", fontSize: 14, marginBottom: 24 }}>
            {state.restaurantName}
          </p>
        )}

        {state.items.map((item) => (
          <CartItemRow key={item.id} item={item} />
        ))}

        <button
          className="btn btn-ghost"
          style={{
            marginTop: 16,
            fontSize: 14,
            color: "var(--tomate-600)",
            padding: "8px 0",
          }}
          onClick={() => dispatch({ type: "CLEAR_CART" })}
        >
          Limpar sacola
        </button>
      </div>

      {/* Right: order summary + finalize */}
      <aside
        style={{
          position: "sticky",
          top: 100,
          background: "var(--bg-surface)",
          borderRadius: "var(--r-lg)",
          boxShadow: "var(--shadow-3)",
          padding: 24,
        }}
      >
        <h3
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: 18,
            color: "var(--ink-800)",
            marginBottom: 20,
          }}
        >
          Resumo do pedido
        </h3>

        {/* Items summary */}
        {state.items.map((item) => {
          const itemTotal =
            (item.basePriceCents +
              item.modifiers.reduce((s, m) => s + m.priceDelta, 0)) *
            item.qty;
          return (
            <div
              key={item.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: 14,
                marginBottom: 8,
                gap: 12,
              }}
            >
              <span style={{ color: "var(--fg-2)" }}>
                {item.qty}× {item.name}
              </span>
              <span className="price" style={{ flexShrink: 0 }}>
                {formatPrice(itemTotal)}
              </span>
            </div>
          );
        })}

        <hr className="divider" />

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: 18,
            color: "var(--ink-800)",
            marginBottom: 20,
          }}
        >
          <span>Total</span>
          <span className="price">{formatPrice(totalCents)}</span>
        </div>

        {/* Customer name */}
        <div style={{ marginBottom: 16 }}>
          <label
            htmlFor="customer-name"
            style={{
              display: "block",
              fontSize: 13,
              fontWeight: 600,
              color: "var(--ink-700)",
              marginBottom: 8,
            }}
          >
            Seu nome para o balcão
          </label>
          <input
            id="customer-name"
            type="text"
            placeholder="Ex: Marina, João…"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            maxLength={100}
            style={{
              width: "100%",
              background: "var(--bg-surface)",
              border: "1px solid var(--border-2)",
              borderRadius: "var(--r-sm)",
              padding: "10px 14px",
              fontFamily: "var(--font-body)",
              fontSize: 14,
              color: "var(--ink-800)",
              outline: "none",
              boxSizing: "border-box",
            }}
            onFocus={(e) =>
              (e.currentTarget.style.borderColor = "var(--tomate-500)")
            }
            onBlur={(e) =>
              (e.currentTarget.style.borderColor = "var(--border-2)")
            }
          />
        </div>

        <button
          className="btn btn-primary btn-block"
          onClick={handleFinalize}
          disabled={!canFinalize}
          style={{
            gap: 10,
            opacity: canFinalize ? 1 : 0.55,
            cursor: canFinalize ? "pointer" : "not-allowed",
          }}
        >
          {createOrder.isPending ? (
            "Finalizando…"
          ) : (
            <>
              Finalizar pedido <ArrowRight size={16} />
            </>
          )}
        </button>

        {createOrder.isError && (
          <p
            style={{
              color: "var(--tomate-600)",
              fontSize: 13,
              marginTop: 12,
              textAlign: "center",
            }}
          >
            Ih, deu ruim. Tenta de novo?
          </p>
        )}

        <p
          style={{
            fontSize: 12,
            color: "var(--fg-3)",
            textAlign: "center",
            marginTop: 12,
          }}
        >
          Pagamento direto no restaurante
        </p>
      </aside>
    </div>
  );
}
