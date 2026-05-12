"use client";

import Link from "next/link";
import { useEffect } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log to error reporting service in production
    console.error("Global error:", error);
  }, [error]);

  return (
    <div
      className="container"
      style={{
        paddingTop: 80,
        paddingBottom: 80,
        textAlign: "center",
        maxWidth: 560,
      }}
    >
      <div
        style={{
          width: 64,
          height: 64,
          background: "var(--tomate-50)",
          borderRadius: "var(--r-pill)",
          display: "grid",
          placeItems: "center",
          margin: "0 auto 24px",
        }}
      >
        <AlertTriangle size={28} color="var(--tomate-600)" />
      </div>

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
        Ih, deu ruim aqui.
      </h2>
      <p
        style={{
          color: "var(--fg-2)",
          marginBottom: 12,
          fontSize: 16,
          lineHeight: 1.5,
        }}
      >
        Aconteceu um erro inesperado. A gente já foi notificado e tá
        resolvendo.
      </p>

      {error.digest && (
        <code
          style={{
            display: "inline-block",
            fontSize: 12,
            color: "var(--fg-3)",
            background: "var(--ink-100)",
            padding: "4px 10px",
            borderRadius: "var(--r-xs)",
            marginBottom: 32,
            fontFamily: "var(--font-mono)",
          }}
          title="Código de erro"
        >
          {error.digest}
        </code>
      )}

      {!error.digest && <div style={{ marginBottom: 32 }} />}

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
          Voltar pro início
        </Link>
      </div>
    </div>
  );
}
