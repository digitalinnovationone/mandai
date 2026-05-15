"use client";

import { Gift, Check } from "lucide-react";
import { useCart } from "@/modules/cart/context";

/**
 * WelcomeCouponBanner — US-01 (ADR-0009)
 *
 * Shown on the Home page when the user hasn't redeemed the welcome coupon yet.
 * One click dispatches REDEEM_COUPON → banner switches to "redeemed" state.
 * State persists across navigation and refresh via localStorage.
 */
export default function WelcomeCouponBanner() {
  const { state, dispatch } = useCart();

  if (state.couponRedeemed) {
    return (
      <div
        style={{
          background: "var(--folha-50)",
          borderBottom: "1px solid var(--folha-200)",
          padding: "12px 0",
        }}
      >
        <div
          className="container"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            fontSize: 14,
            color: "var(--folha-800)",
            fontWeight: 600,
          }}
        >
          <Check size={16} color="var(--folha-600)" aria-hidden="true" />
          Cupom resgatado! Você ganhou R$10 de desconto — já aplicado na sua
          sacola.
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        background: "var(--manga-50)",
        borderBottom: "1px solid var(--manga-200)",
        padding: "14px 0",
      }}
    >
      <div
        className="container"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            flex: 1,
          }}
        >
          <Gift size={20} color="var(--manga-600)" aria-hidden="true" />
          <div>
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: 15,
                color: "var(--ink-800)",
              }}
            >
              Ganhe R$10 de desconto na sua primeira compra.
            </span>{" "}
            <span style={{ fontSize: 14, color: "var(--ink-600)" }}>
              Clique para resgatar.
            </span>
          </div>
        </div>

        <button
          onClick={() => dispatch({ type: "REDEEM_COUPON" })}
          style={{
            background: "var(--manga-400)",
            color: "var(--ink-900)",
            border: "none",
            borderRadius: "var(--r-sm)",
            padding: "8px 20px",
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: 14,
            cursor: "pointer",
            flexShrink: 0,
            transition: "background 0.15s",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.background = "var(--manga-500)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.background = "var(--manga-400)")
          }
        >
          Resgatar
        </button>
      </div>
    </div>
  );
}
