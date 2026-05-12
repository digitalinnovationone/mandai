"use client";

import Link from "next/link";
import { useEffect } from "react";
import { RefreshCw } from "lucide-react";

export default function RestaurantError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Restaurant page error:", error);
  }, [error]);

  return (
    <div
      className="container"
      style={{
        paddingTop: 80,
        paddingBottom: 80,
        textAlign: "center",
        maxWidth: 480,
      }}
    >
      <h2
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 800,
          fontSize: 26,
          letterSpacing: "-0.025em",
          color: "var(--ink-800)",
          marginBottom: 12,
        }}
      >
        Ih, não conseguimos carregar o cardápio
      </h2>
      <p style={{ color: "var(--fg-2)", marginBottom: 32, fontSize: 15 }}>
        Pode ter sido um erro de rede. Tenta de novo?
      </p>
      <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
        <button
          className="btn btn-primary"
          onClick={reset}
          style={{ display: "inline-flex" }}
        >
          <RefreshCw size={15} /> Tentar de novo
        </button>
        <Link
          href="/"
          className="btn btn-secondary"
          style={{ display: "inline-flex", textDecoration: "none" }}
        >
          Voltar
        </Link>
      </div>
    </div>
  );
}
