import type { Metadata } from "next";
import Link from "next/link";
import { fetchRestaurants } from "@/modules/restaurants/services/restaurants.api";
import type { Restaurant } from "@/modules/restaurants/types";
import { ArrowRight, Check, Flame, Star, Clock, ChevronRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Mandaí — Peça e retire no balcão",
};

// Unsplash URL helper (mirrors handoff U() helper)
function U(id: string, w = 800) {
  return `https://images.unsplash.com/photo-${id}?w=${w}&q=80&auto=format&fit=crop`;
}

const CATEGORIES = [
  { slug: "pizza", label: "Pizza", emoji: "🍕", bg: "var(--tomate-50)" },
  { slug: "japonesa", label: "Japonesa", emoji: "🍱", bg: "var(--folha-50)" },
  { slug: "hamburguer", label: "Hambúrguer", emoji: "🍔", bg: "var(--manga-50)" },
  { slug: "acai", label: "Açaí", emoji: "🥭", bg: "#F6E9F2" },
  { slug: "saudavel", label: "Saudável", emoji: "🥗", bg: "var(--folha-50)" },
  { slug: "doces", label: "Doces", emoji: "🍰", bg: "var(--manga-50)" },
  { slug: "bebidas", label: "Bebidas", emoji: "🥤", bg: "#E0EEF0" },
  { slug: "brasileira", label: "Brasileira", emoji: "🌶️", bg: "var(--tomate-50)" },
];

function formatDistance(meters: number): string {
  if (meters < 1000) return `${meters} m`;
  return `${(meters / 1000).toFixed(1).replace(".", ",")} km`;
}

function RestaurantCard({ restaurant }: { restaurant: Restaurant }) {
  return (
    <Link href={`/restaurante/${restaurant.id}`} className="r-card" style={{ textDecoration: "none" }}>
      <div
        className="cover"
        style={{ backgroundImage: `url(${restaurant.coverUrl})` }}
      >
        {!restaurant.isOpen && (
          <span className="promo-badge">Fechado agora</span>
        )}
      </div>
      <div className="body">
        <div className="row">
          <div className="name">{restaurant.name}</div>
          <div className="rating">
            <Star size={11} color="var(--folha-600)" />
            {restaurant.rating.toFixed(1).replace(".", ",")}
          </div>
        </div>
        <div className="tags">{restaurant.category}</div>
        <div className="meta">
          <span>
            <Clock size={12} /> Pronto em ~25 min
          </span>
          <span className="dot">·</span>
          <span>{formatDistance(restaurant.distanceMeters)}</span>
          <span className="dot">·</span>
          <span className="free">Retirada grátis</span>
        </div>
      </div>
    </Link>
  );
}

export default async function HomePage() {
  // Server-side data fetch — no TanStack Query needed for static listing
  let restaurants: Restaurant[] = [];
  try {
    restaurants = await fetchRestaurants();
  } catch {
    // Show page without restaurants rather than crashing
  }

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section
        style={{
          background: "var(--ink-800)",
          color: "#fff",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          className="container"
          style={{
            display: "grid",
            gridTemplateColumns: "1.2fr 1fr",
            gap: 56,
            padding: "72px 24px",
            alignItems: "center",
            position: "relative",
            zIndex: 2,
          }}
        >
          <div>
            <span
              className="eyebrow"
              style={{ color: "var(--manga-300)" }}
            >
              Manda aí, retira e leva
            </span>
            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 64,
                fontWeight: 800,
                letterSpacing: "-0.04em",
                lineHeight: 1.02,
                color: "#fff",
                marginTop: 14,
              }}
            >
              A comida boa do bairro
              <br />
              <span style={{ color: "var(--tomate-300)" }}>
                pronta quando você chega
              </span>
            </h1>
            <p
              style={{
                fontSize: 18,
                color: "var(--ink-200)",
                marginTop: 18,
                maxWidth: 480,
                lineHeight: 1.5,
              }}
            >
              Pede pelo Mandaí, retira no balcão do restaurante. Sem fila, sem
              taxa de entrega, sem espera de motoboy.
            </p>
            <div style={{ display: "flex", gap: 12, marginTop: 28 }}>
              <Link
                href="/categoria/pizza"
                className="btn btn-primary"
                style={{ padding: "16px 28px", fontSize: 16 }}
              >
                Pedir agora <ArrowRight size={16} />
              </Link>
            </div>
            <div
              style={{
                display: "flex",
                gap: 32,
                marginTop: 36,
                fontSize: 13,
                color: "var(--ink-300)",
              }}
            >
              {[
                "Sem taxa de entrega",
                "Código no balcão",
                "Pagamento no local",
              ].map((text) => (
                <span
                  key={text}
                  style={{ display: "inline-flex", alignItems: "center", gap: 8 }}
                >
                  <Check size={14} color="var(--folha-300)" /> {text}
                </span>
              ))}
            </div>
          </div>

          {/* Hero stacked photos */}
          <div style={{ position: "relative", height: 380 }}>
            <div
              style={{
                position: "absolute",
                top: 0,
                right: 60,
                width: 240,
                height: 240,
                borderRadius: "50%",
                overflow: "hidden",
                boxShadow: "var(--shadow-pop)",
                border: "6px solid var(--ink-800)",
                background: `url(${U("1513104890138-7c749659a591", 600)}) center/cover`,
              }}
            />
            <div
              style={{
                position: "absolute",
                top: 130,
                right: 220,
                width: 200,
                height: 200,
                borderRadius: "50%",
                overflow: "hidden",
                boxShadow: "var(--shadow-pop)",
                border: "6px solid var(--ink-800)",
                background: `url(${U("1568901346375-23c9450c58cd", 600)}) center/cover`,
              }}
            />
            <div
              style={{
                position: "absolute",
                top: 60,
                right: 320,
                width: 140,
                height: 140,
                borderRadius: "50%",
                overflow: "hidden",
                boxShadow: "var(--shadow-pop)",
                border: "6px solid var(--ink-800)",
                background: `url(${U("1490474418585-ba9bad8fd0ea", 500)}) center/cover`,
              }}
            />
            <span
              style={{
                position: "absolute",
                top: 290,
                right: 0,
                background: "var(--manga-400)",
                color: "var(--ink-900)",
                padding: "10px 16px",
                borderRadius: 999,
                fontWeight: 700,
                fontSize: 13,
                boxShadow: "var(--shadow-2)",
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                fontFamily: "var(--font-display)",
              }}
            >
              <Flame size={14} /> 800+ restaurantes
            </span>
          </div>
        </div>

        {/* Faint dot pattern overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.04,
            backgroundImage:
              "radial-gradient(circle, #fff 1.2px, transparent 1.5px)",
            backgroundSize: "18px 18px",
            pointerEvents: "none",
          }}
          aria-hidden="true"
        />
      </section>

      {/* ── Category tiles ─────────────────────────────────── */}
      <section className="container" style={{ paddingTop: 56, paddingBottom: 8 }}>
        <div className="section-head">
          <div>
            <h2>O que vai ser hoje?</h2>
            <div className="sub">Mais de 800 restaurantes a poucos minutos de você.</div>
          </div>
          <Link href="/categoria/pizza" className="more">
            Ver tudo <ChevronRight size={14} />
          </Link>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(8, 1fr)",
            gap: 14,
          }}
        >
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              href={`/categoria/${cat.slug}`}
              className="cat-tile"
              style={{ textDecoration: "none" }}
            >
              <span
                className="blob"
                style={{ background: cat.bg }}
              >
                {cat.emoji}
              </span>
              <span className="lbl">{cat.label}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Restaurants list ──────────────────────────────── */}
      <section
        className="container"
        style={{ paddingTop: 56, paddingBottom: 64 }}
      >
        <div className="section-head">
          <div>
            <h2>Perto de você</h2>
            <div className="sub">Restaurantes prontos para receber seu pedido.</div>
          </div>
        </div>

        {restaurants.length === 0 ? (
          <p style={{ color: "var(--fg-2)", textAlign: "center", padding: "48px 0" }}>
            Nenhum restaurante disponível no momento.
          </p>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 24,
            }}
          >
            {restaurants.map((r) => (
              <RestaurantCard key={r.id} restaurant={r} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
