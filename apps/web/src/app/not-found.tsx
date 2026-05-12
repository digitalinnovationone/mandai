import Link from "next/link";

export default function NotFound() {
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
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 80,
          fontWeight: 600,
          color: "var(--ink-200)",
          display: "block",
          marginBottom: 16,
        }}
      >
        404
      </span>
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
      <p style={{ color: "var(--fg-2)", marginBottom: 32, fontSize: 16 }}>
        A página que você procurou não existe ou foi movida.
      </p>
      <Link
        href="/"
        className="btn btn-primary"
        style={{ display: "inline-flex", textDecoration: "none" }}
      >
        Voltar pro início
      </Link>
    </div>
  );
}
