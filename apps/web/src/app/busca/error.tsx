"use client";

import { useEffect } from "react";
import { RefreshCw } from "lucide-react";

export default function BuscaError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Search error:", error);
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
          color: "var(--ink-800)",
          letterSpacing: "-0.025em",
          marginBottom: 12,
        }}
      >
        Não conseguimos fazer a busca agora
      </h2>
      <p style={{ color: "var(--fg-2)", marginBottom: 32, fontSize: 15 }}>
        Verifica sua conexão e tenta de novo.
      </p>
      <button
        className="btn btn-primary"
        onClick={reset}
        style={{ display: "inline-flex" }}
      >
        <RefreshCw size={15} /> Tentar de novo
      </button>
    </div>
  );
}
