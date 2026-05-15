"use client";

import { useRouter } from "next/navigation";
import { QRCodeSVG } from "qrcode.react";

import { Copy, Check, Home, Clock, Store } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/modules/cart/context";
import type { OrderConfirmation } from "@/modules/orders/services/orders.api";

function formatPrice(cents: number): string {
  return (cents / 100).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

function formatEstimatedTime(isoString: string): string {
  try {
    const readyAt = new Date(isoString);
    const now = new Date();
    const diffMin = Math.round((readyAt.getTime() - now.getTime()) / 60000);
    if (diffMin > 0) return `~${diffMin} min`;
  } catch {
    // ignore
  }
  return "em breve";
}

export default function ConfirmationClient({
  order,
}: {
  order: OrderConfirmation;
}) {
  const [copied, setCopied] = useState(false);
  const { dispatch } = useCart();
  const router = useRouter();

  function handleGoHome() {
    dispatch({ type: "CLEAR_CART" });
    router.push("/");
  }

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(order.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback: nothing
    }
  }

  const customerFirstName = order.customerName.split(" ")[0];

  return (
    <div
      className="container"
      style={{
        maxWidth: 720,
        paddingTop: 56,
        paddingBottom: 80,
        textAlign: "center",
      }}
    >
      {/* Success eyebrow */}
      <span className="eyebrow" style={{ color: "var(--folha-600)" }}>
        Pedido confirmado!
      </span>

      <h1
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 800,
          fontSize: 40,
          letterSpacing: "-0.035em",
          color: "var(--ink-800)",
          marginTop: 12,
          marginBottom: 8,
        }}
      >
        Pode vir buscar, {customerFirstName}! 🎉
      </h1>
      <p
        style={{
          color: "var(--fg-2)",
          fontSize: 18,
          maxWidth: 480,
          margin: "0 auto 16px",
          lineHeight: 1.5,
        }}
      >
        Mostre o código abaixo no balcão para retirar seu pedido.
      </p>

      {/* ETA */}
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          background: "var(--folha-50)",
          color: "var(--folha-700)",
          padding: "8px 16px",
          borderRadius: "var(--r-pill)",
          fontSize: 14,
          fontWeight: 600,
          marginBottom: 40,
        }}
      >
        <Clock size={14} />
        Pronto {formatEstimatedTime(order.estimatedReadyAt)}
      </div>

      {/* QR + code card */}
      <div
        style={{
          background: "var(--bg-surface)",
          borderRadius: "var(--r-xl)",
          boxShadow: "var(--shadow-3)",
          padding: "40px 48px",
          display: "inline-block",
          textAlign: "center",
          marginBottom: 40,
        }}
      >
        {/* QR Code */}
        <div
          style={{
            background: "#fff",
            padding: 12,
            borderRadius: "var(--r-md)",
            display: "inline-block",
            marginBottom: 24,
            boxShadow: "var(--shadow-1)",
          }}
        >
          <QRCodeSVG
            value={order.qrPayload}
            size={208}
            aria-label={`QR code do pedido ${order.code}`}
          />
        </div>

        {/* Code label */}
        <div
          style={{
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "var(--fg-3)",
            marginBottom: 8,
          }}
        >
          Código de retirada
        </div>

        {/* Code + copy */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 12,
            marginBottom: 24,
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontWeight: 700,
              fontSize: 40,
              letterSpacing: "0.08em",
              color: "var(--ink-800)",
            }}
          >
            {order.code}
          </span>
          <button
            className="icon-btn"
            onClick={handleCopy}
            aria-label={copied ? "Código copiado!" : "Copiar código"}
            style={{ flexShrink: 0 }}
          >
            {copied ? (
              <Check size={16} color="var(--folha-500)" />
            ) : (
              <Copy size={16} />
            )}
          </button>
        </div>

        {/* Order summary */}
        {order.items.length > 0 && (
          <div
            style={{
              textAlign: "left",
              borderTop: "1px solid var(--border-1)",
              paddingTop: 16,
              marginBottom: 16,
            }}
          >
            {order.items.map((item) => (
              <div
                key={item.id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: 13,
                  color: "var(--fg-2)",
                  marginBottom: 6,
                  gap: 12,
                }}
              >
                <span>
                  {item.qty}× {item.nameSnapshot}
                </span>
                <span className="price" style={{ flexShrink: 0 }}>
                  {formatPrice(item.priceCentsSnapshot * item.qty)}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Subtotal + discount (only when coupon was applied) */}
        {order.discountCents > 0 && (
          <div
            style={{
              borderTop: "1px solid var(--border-1)",
              paddingTop: 12,
              marginBottom: 4,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: 13,
                color: "var(--fg-2)",
                marginBottom: 6,
              }}
            >
              <span>Subtotal</span>
              <span className="price">{formatPrice(order.subtotalCents)}</span>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: 13,
                color: "var(--folha-700)",
                fontWeight: 600,
                marginBottom: 4,
              }}
            >
              <span>Desconto cupom de boas-vindas</span>
              <span className="price">−{formatPrice(order.discountCents)}</span>
            </div>
          </div>
        )}

        {/* Total */}
        <div
          style={{
            borderTop: "1px solid var(--border-1)",
            paddingTop: 16,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 14,
          }}
        >
          <span style={{ color: "var(--fg-2)" }}>
            <Store size={13} style={{ verticalAlign: "middle", marginRight: 4 }} />
            Total · Pague no balcão
          </span>
          <span
            className="price"
            style={{
              color: "var(--ink-800)",
              fontWeight: 700,
              fontSize: 18,
            }}
          >
            {formatPrice(order.totalCents)}
          </span>
        </div>
      </div>

      {/* Actions */}
      <div
        style={{
          display: "flex",
          gap: 12,
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        <button
          className="btn btn-secondary"
          style={{ display: "inline-flex" }}
          onClick={handleGoHome}
        >
          <Home size={16} /> Início
        </button>
      </div>
    </div>
  );
}
