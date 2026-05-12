import type { Metadata } from "next";
import Link from "next/link";
import { fetchRestaurants } from "@/modules/restaurants/services/restaurants.api";
import type { Restaurant } from "@/modules/restaurants/types";
import { ChevronRight, Star, Clock } from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

function formatDistance(meters: number): string {
  if (meters < 1000) return `${meters} m`;
  return `${(meters / 1000).toFixed(1).replace(".", ",")} km`;
}

const CATEGORY_LABELS: Record<string, string> = {
  pizza: "Pizza",
  japonesa: "Japonesa",
  hamburguer: "Hambúrguer",
  acai: "Açaí",
  saudavel: "Saudável",
  doces: "Doces",
  bebidas: "Bebidas",
  brasileira: "Brasileira",
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const label = CATEGORY_LABELS[slug] ?? slug;
  return { title: `${label} perto de você` };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const label = CATEGORY_LABELS[slug] ?? slug;

  let restaurants: Restaurant[] = [];
  try {
    restaurants = await fetchRestaurants(slug);
  } catch {
    // Show empty state on fetch error
  }

  return (
    <div className="container" style={{ paddingTop: 40, paddingBottom: 64 }}>
      {/* Breadcrumb */}
      <nav
        aria-label="Navegação estrutural"
        style={{
          display: "flex",
          alignItems: "center",
          gap: 6,
          fontSize: 14,
          color: "var(--fg-2)",
          marginBottom: 28,
        }}
      >
        <Link href="/" style={{ color: "var(--fg-link)" }}>
          Início
        </Link>
        <ChevronRight size={14} aria-hidden="true" />
        <span>{label}</span>
      </nav>

      {/* Heading */}
      <div className="section-head" style={{ marginBottom: 32 }}>
        <div>
          <h2>{label}</h2>
          <div className="sub">
            {restaurants.length > 0
              ? `${restaurants.length} restaurante${restaurants.length > 1 ? "s" : ""} encontrado${restaurants.length > 1 ? "s" : ""}`
              : "Nenhum restaurante encontrado nesta categoria."}
          </div>
        </div>
      </div>

      {/* Grid */}
      {restaurants.length > 0 ? (
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
              >
                {!r.isOpen && <span className="promo-badge">Fechado agora</span>}
              </div>
              <div className="body">
                <div className="row">
                  <div className="name">{r.name}</div>
                  <div className="rating">
                    <Star size={11} color="var(--folha-600)" />
                    {r.rating.toFixed(1).replace(".", ",")}
                  </div>
                </div>
                <div className="tags">{r.category}</div>
                <div className="meta">
                  <span>
                    <Clock size={12} /> Pronto em ~25 min
                  </span>
                  <span className="dot">·</span>
                  <span>{formatDistance(r.distanceMeters)}</span>
                  <span className="dot">·</span>
                  <span className="free">Retirada grátis</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div
          style={{
            textAlign: "center",
            padding: "80px 0",
            color: "var(--fg-2)",
          }}
        >
          <p style={{ fontSize: 18 }}>
            Bora indicar um restaurante de {label.toLowerCase()} pra gente? 😅
          </p>
          <Link
            href="/"
            className="btn btn-secondary"
            style={{ marginTop: 24, display: "inline-flex" }}
          >
            Ver todos os restaurantes
          </Link>
        </div>
      )}
    </div>
  );
}
