import type { Metadata } from "next";
import Link from "next/link";
import { searchRestaurants } from "@/modules/restaurants/services/restaurants.api";
import type { Restaurant } from "@/modules/restaurants/types";
import { Star, Clock, Search } from "lucide-react";

interface Props {
  searchParams: Promise<{ q?: string }>;
}

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const { q } = await searchParams;
  return {
    title: q ? `Busca por "${q}"` : "Busca",
  };
}

interface HighlightProps {
  text: string;
  query: string;
}

function Highlight({ text, query }: HighlightProps) {
  if (!query) return <>{text}</>;
  const idx = text.toLowerCase().indexOf(query.toLowerCase());
  if (idx === -1) return <>{text}</>;
  return (
    <>
      {text.slice(0, idx)}
      <mark
        style={{
          background: "var(--manga-100)",
          color: "inherit",
          padding: "0 2px",
          borderRadius: 3,
        }}
      >
        {text.slice(idx, idx + query.length)}
      </mark>
      {text.slice(idx + query.length)}
    </>
  );
}

export default async function BuscaPage({ searchParams }: Props) {
  const { q } = await searchParams;
  const query = q?.trim() ?? "";

  let restaurants: Restaurant[] = [];
  if (query) {
    try {
      const result = await searchRestaurants(query);
      restaurants = result.restaurants ?? [];
    } catch {
      // Show empty state on fetch error
    }
  }

  return (
    <div className="container" style={{ paddingTop: 40, paddingBottom: 64 }}>
      <h2
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 800,
          fontSize: 28,
          letterSpacing: "-0.025em",
          color: "var(--ink-800)",
          marginBottom: 8,
        }}
      >
        {query ? (
          <>
            Resultados para{" "}
            <span style={{ color: "var(--tomate-500)" }}>
              &ldquo;{query}&rdquo;
            </span>
          </>
        ) : (
          "Busca"
        )}
      </h2>

      {!query && (
        <p style={{ color: "var(--fg-2)", marginTop: 8, marginBottom: 40 }}>
          Use a barra de busca no topo para encontrar restaurantes ou pratos.
        </p>
      )}

      {query && restaurants.length === 0 && (
        <div style={{ textAlign: "center", padding: "80px 0" }}>
          <Search
            size={48}
            color="var(--ink-200)"
            style={{ marginBottom: 16 }}
          />
          <p
            style={{
              fontSize: 18,
              fontWeight: 600,
              color: "var(--ink-700)",
              marginBottom: 8,
            }}
          >
            Ih, não achamos nada para &ldquo;{query}&rdquo;
          </p>
          <p style={{ color: "var(--fg-2)", marginBottom: 24 }}>
            Tenta outro nome ou da uma olhada nos restaurantes perto de você.
          </p>
          <Link
            href="/"
            className="btn btn-secondary"
            style={{ display: "inline-flex", textDecoration: "none" }}
          >
            Ver todos os restaurantes
          </Link>
        </div>
      )}

      {restaurants.length > 0 && (
        <>
          <p
            style={{
              color: "var(--fg-2)",
              fontSize: 14,
              marginBottom: 24,
              marginTop: 4,
            }}
          >
            {restaurants.length} restaurante
            {restaurants.length > 1 ? "s" : ""} encontrado
            {restaurants.length > 1 ? "s" : ""}
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 24,
            }}
          >
            {restaurants.map((r) => (
              <Link
                key={r.id}
                href={`/restaurante/${r.id}`}
                className="r-card"
                style={{ textDecoration: "none" }}
              >
                <div
                  className="cover"
                  style={{ backgroundImage: `url(${r.coverUrl})` }}
                />
                <div className="body">
                  <div className="row">
                    <div className="name">
                      <Highlight text={r.name} query={query} />
                    </div>
                    <div className="rating">
                      <Star size={11} color="var(--folha-600)" />
                      {r.rating.toFixed(1).replace(".", ",")}
                    </div>
                  </div>
                  <div className="tags">{r.category}</div>
                  <div className="meta">
                    <span>
                      <Clock size={12} /> ~25 min
                    </span>
                    <span className="dot">·</span>
                    <span className="free">Retirada grátis</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
