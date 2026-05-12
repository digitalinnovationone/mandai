import Link from "next/link";
import { Store } from "lucide-react";

export default function RestauranteNotFound() {
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
      <div
        style={{
          width: 64,
          height: 64,
          background: "var(--ink-100)",
          borderRadius: "var(--r-pill)",
          display: "grid",
          placeItems: "center",
          margin: "0 auto 24px",
        }}
      >
        <Store size={28} color="var(--ink-400)" />
      </div>
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
        Restaurante não encontrado
      </h2>
      <p style={{ color: "var(--fg-2)", marginBottom: 32, fontSize: 15 }}>
        Esse restaurante pode ter saído do Mandaí ou o link tá errado.
      </p>
      <Link
        href="/"
        className="btn btn-primary"
        style={{ display: "inline-flex", textDecoration: "none" }}
      >
        Ver outros restaurantes
      </Link>
    </div>
  );
}
