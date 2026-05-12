"use client";

import { useEffect } from "react";
import { AlertTriangle } from "lucide-react";

interface ClearCartModalProps {
  fromRestaurant: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ClearCartModal({
  fromRestaurant,
  onConfirm,
  onCancel,
}: ClearCartModalProps) {
  // Close on Escape key
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onCancel();
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onCancel]);

  return (
    <>
      {/* Backdrop */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(20, 16, 10, 0.55)",
          zIndex: 200,
        }}
        onClick={onCancel}
        aria-hidden="true"
      />

      {/* Dialog */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="clear-cart-title"
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 440,
          background: "var(--bg-surface)",
          borderRadius: "var(--r-xl)",
          boxShadow: "var(--shadow-pop)",
          padding: "32px",
          zIndex: 201,
        }}
      >
        {/* Icon */}
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: "var(--r-pill)",
            background: "var(--manga-50)",
            display: "grid",
            placeItems: "center",
            marginBottom: 20,
          }}
        >
          <AlertTriangle size={22} color="var(--manga-500)" />
        </div>

        <h2
          id="clear-cart-title"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 800,
            fontSize: 22,
            color: "var(--ink-800)",
            letterSpacing: "-0.02em",
            marginBottom: 10,
          }}
        >
          Limpar sacola e começar de novo?
        </h2>

        <p style={{ color: "var(--fg-2)", fontSize: 15, lineHeight: 1.5, marginBottom: 28 }}>
          Você já tem itens de outro restaurante na sacola. Para adicionar de{" "}
          <strong style={{ color: "var(--ink-800)" }}>{fromRestaurant}</strong>,
          precisa limpar a sacola atual.
        </p>

        <div style={{ display: "flex", gap: 12 }}>
          <button
            className="btn btn-secondary"
            style={{ flex: 1 }}
            onClick={onCancel}
          >
            Cancelar
          </button>
          <button
            className="btn btn-primary"
            style={{ flex: 1 }}
            onClick={onConfirm}
          >
            Limpar sacola
          </button>
        </div>
      </div>
    </>
  );
}
