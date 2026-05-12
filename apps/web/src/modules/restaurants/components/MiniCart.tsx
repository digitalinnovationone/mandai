"use client";

import Link from "next/link";
import { ArrowRight, Store } from "lucide-react";
import { useCart } from "@/modules/cart/context";

function formatPrice(cents: number): string {
  return (cents / 100).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

export default function MiniCart() {
  const { state, totalCents } = useCart();

  return (
    <div
      style={{
        position: "sticky",
        top: 100,
        background: "var(--bg-surface)",
        borderRadius: "var(--r-lg)",
        boxShadow: "var(--shadow-3)",
        padding: 20,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 16,
        }}
      >
        <h3
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 18,
            fontWeight: 700,
            color: "var(--ink-800)",
          }}
        >
          Sua sacola
        </h3>
        {state.items.length > 0 && (
          <span style={{ fontSize: 13, color: "var(--fg-2)" }}>
            {state.items.reduce((s, i) => s + i.qty, 0)}{" "}
            {state.items.reduce((s, i) => s + i.qty, 0) === 1
              ? "item"
              : "itens"}
          </span>
        )}
      </div>

      {state.items.length === 0 ? (
        <p style={{ color: "var(--fg-3)", fontSize: 14, marginBottom: 16 }}>
          Adicione itens do cardápio para montar sua sacola.
        </p>
      ) : (
        <>
          <div
            style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 4 }}
          >
            {state.items.map((item) => {
              const itemCents =
                (item.basePriceCents +
                  item.modifiers.reduce((s, m) => s + m.priceDelta, 0)) *
                item.qty;
              return (
                <div
                  key={item.id}
                  style={{ display: "flex", gap: 12, alignItems: "flex-start" }}
                >
                  <span
                    style={{
                      background: "var(--ink-100)",
                      color: "var(--ink-700)",
                      padding: "2px 8px",
                      borderRadius: 6,
                      fontSize: 12,
                      fontFamily: "var(--font-mono)",
                      fontWeight: 600,
                      minWidth: 28,
                      textAlign: "center",
                      flexShrink: 0,
                    }}
                  >
                    {item.qty}×
                  </span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        fontSize: 14,
                        fontWeight: 600,
                        color: "var(--ink-800)",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {item.name}
                    </div>
                    {item.modifiers.length > 0 && (
                      <div
                        style={{
                          fontSize: 12,
                          color: "var(--fg-3)",
                          marginTop: 2,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {item.modifiers.map((m) => m.option).join(", ")}
                      </div>
                    )}
                    <div
                      className="price"
                      style={{ fontSize: 13, color: "var(--fg-2)", marginTop: 2 }}
                    >
                      {formatPrice(itemCents)}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <hr className="divider" />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
              marginBottom: 16,
            }}
          >
            <span style={{ fontSize: 13, color: "var(--fg-2)" }}>Subtotal</span>
            <span className="price" style={{ fontSize: 18, color: "var(--ink-800)" }}>
              {formatPrice(totalCents)}
            </span>
          </div>
        </>
      )}

      <Link
        href="/sacola"
        className="btn btn-primary btn-block"
        style={{ textDecoration: "none", justifyContent: "center", gap: 8 }}
      >
        {state.items.length > 0 ? (
          <>
            Ver sacola <ArrowRight size={14} />
          </>
        ) : (
          "Ver sacola"
        )}
      </Link>

      <div
        style={{
          fontSize: 12,
          color: "var(--fg-3)",
          textAlign: "center",
          marginTop: 10,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 6,
        }}
      >
        <Store size={12} /> Retirada no balcão · sem taxa
      </div>
    </div>
  );
}
