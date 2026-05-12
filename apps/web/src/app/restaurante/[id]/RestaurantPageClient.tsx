"use client";

import { useState } from "react";
import { MapPin, Star, Clock, Check, Plus } from "lucide-react";
import type { RestaurantDetail, MenuItem } from "@/modules/restaurants/types";
import AddItemModal from "@/modules/restaurants/components/AddItemModal";
import MiniCart from "@/modules/restaurants/components/MiniCart";

function formatPrice(cents: number): string {
  return (cents / 100).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

function formatDistance(meters: number): string {
  if (meters < 1000) return `${meters} m`;
  return `${(meters / 1000).toFixed(1).replace(".", ",")} km`;
}

interface RestaurantPageClientProps {
  restaurant: RestaurantDetail;
}

export default function RestaurantPageClient({
  restaurant,
}: RestaurantPageClientProps) {
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  // Sort defensively by section.order (Prisma already returns ORDER BY order ASC,
  // but this ensures correct display even if the array arrives out of order)
  const sections = [...restaurant.sections].sort((a, b) => a.order - b.order);
  const allSectionNames = sections.map((s) => s.name);

  return (
    <>
      {/* Hero cover */}
      <section style={{ position: "relative" }}>
        <div
          style={{
            height: 260,
            backgroundImage: `linear-gradient(180deg, rgba(28,24,18,0.05) 0%, rgba(28,24,18,0.45) 100%), url(${restaurant.coverUrl})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="container" style={{ position: "relative" }}>
          <div
            style={{
              background: "#fff",
              borderRadius: "var(--r-lg)",
              boxShadow: "var(--shadow-3)",
              padding: "24px 28px",
              marginTop: -64,
              display: "flex",
              gap: 24,
              alignItems: "center",
              position: "relative",
              zIndex: 2,
            }}
          >
            {/* Thumb */}
            <div
              style={{
                width: 88,
                height: 88,
                borderRadius: 18,
                backgroundImage: `url(${restaurant.coverUrl})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                flexShrink: 0,
                boxShadow: "var(--shadow-1)",
                border: "3px solid #fff",
              }}
            />

            <div style={{ flex: 1 }}>
              <div
                style={{ display: "flex", alignItems: "center", gap: 10 }}
              >
                <h1
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: 32,
                    fontWeight: 800,
                    color: "var(--ink-800)",
                    letterSpacing: "-0.025em",
                  }}
                >
                  {restaurant.name}
                </h1>
                <span
                  style={{
                    background: restaurant.isOpen
                      ? "var(--folha-50)"
                      : "var(--ink-100)",
                    color: restaurant.isOpen
                      ? "var(--folha-700)"
                      : "var(--ink-500)",
                    fontSize: 12,
                    fontWeight: 700,
                    padding: "5px 9px",
                    borderRadius: "var(--r-xs)",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 4,
                  }}
                >
                  {restaurant.isOpen ? (
                    <>
                      <Check size={11} /> Aberto agora
                    </>
                  ) : (
                    "Fechado agora"
                  )}
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  gap: 16,
                  marginTop: 8,
                  alignItems: "center",
                  color: "var(--fg-2)",
                  fontSize: 14,
                }}
              >
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 5,
                    fontFamily: "var(--font-mono)",
                    color: "var(--ink-700)",
                  }}
                >
                  <Star size={13} fill="var(--manga-400)" color="var(--manga-400)" />{" "}
                  {restaurant.rating.toFixed(1).replace(".", ",")}
                </span>
                <span style={{ color: "var(--ink-200)" }}>·</span>
                <span>{restaurant.category}</span>
                <span style={{ color: "var(--ink-200)" }}>·</span>
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 4,
                    fontFamily: "var(--font-mono)",
                  }}
                >
                  <MapPin size={13} /> {formatDistance(restaurant.distanceMeters)}
                </span>
              </div>
            </div>

            {/* ETA */}
            <div
              style={{
                background: restaurant.isOpen
                  ? "var(--folha-50)"
                  : "var(--ink-100)",
                padding: "14px 18px",
                borderRadius: "var(--r-md)",
                textAlign: "center",
                flexShrink: 0,
              }}
            >
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: restaurant.isOpen
                    ? "var(--folha-700)"
                    : "var(--ink-500)",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                }}
              >
                Pronto em
              </div>
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 22,
                  fontWeight: 700,
                  color: restaurant.isOpen
                    ? "var(--folha-700)"
                    : "var(--ink-400)",
                  marginTop: 2,
                }}
              >
                ~25 min
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Closed banner */}
      {!restaurant.isOpen && (
        <div
          className="container"
          style={{ paddingTop: 16 }}
        >
          <div
            style={{
              background: "var(--ink-100)",
              borderRadius: "var(--r-md)",
              padding: "14px 20px",
              fontSize: 14,
              color: "var(--fg-2)",
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            <Clock size={16} color="var(--ink-400)" />
            Restaurante fechado no momento. Você pode ver o cardápio mas não é
            possível fazer pedidos agora.
          </div>
        </div>
      )}

      {/* 3-column layout: nav | menu | cart */}
      <section
        className="container"
        style={{ paddingTop: 32, paddingBottom: 64 }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "240px 1fr 340px",
            gap: 32,
            alignItems: "flex-start",
          }}
        >
          {/* Left: section nav (sticky) */}
          <aside>
            <div
              style={{
                position: "sticky",
                top: 100,
              }}
            >
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  color: "var(--ink-500)",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  marginBottom: 14,
                }}
              >
                Cardápio
              </div>
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: 4,
                }}
              >
                {allSectionNames.map((name, i) => (
                  <li key={name}>
                    <a
                      href={`#section-${i}`}
                      style={{
                        display: "block",
                        padding: "10px 14px",
                        color:
                          i === 0
                            ? "var(--ink-800)"
                            : "var(--ink-600)",
                        fontWeight: i === 0 ? 600 : 500,
                        fontSize: 14,
                        background:
                          i === 0
                            ? "var(--tomate-50)"
                            : "transparent",
                        borderLeft:
                          i === 0
                            ? "3px solid var(--tomate-500)"
                            : "3px solid transparent",
                        borderRadius: 6,
                        textDecoration: "none",
                        transition: "all var(--dur-fast) var(--ease-out)",
                      }}
                    >
                      {name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* Center: menu sections */}
          <div>
            {sections.length === 0 ? (
              <p style={{ color: "var(--fg-2)", padding: "32px 0" }}>
                Cardápio ainda não disponível.
              </p>
            ) : (
              sections.map((section, si) => (
                <div
                  key={section.id}
                  id={`section-${si}`}
                  style={{ marginBottom: 40 }}
                >
                  <h2
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: 24,
                      fontWeight: 700,
                      color: "var(--ink-800)",
                      letterSpacing: "-0.02em",
                      marginBottom: 18,
                    }}
                  >
                    {section.name}
                  </h2>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr",
                      gap: 14,
                    }}
                  >
                    {section.items.map((item) => (
                      <div
                        key={item.id}
                        style={{
                          background: "var(--bg-surface)",
                          borderRadius: "var(--r-md)",
                          padding: 16,
                          boxShadow: "var(--shadow-1)",
                          display: "flex",
                          gap: 18,
                          alignItems: "stretch",
                          cursor:
                            item.available && restaurant.isOpen
                              ? "pointer"
                              : "default",
                          opacity: item.available ? 1 : 0.55,
                        }}
                        onClick={() => {
                          if (item.available && restaurant.isOpen)
                            setSelectedItem(item);
                        }}
                      >
                        <div
                          style={{
                            flex: 1,
                            display: "flex",
                            flexDirection: "column",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              gap: 8,
                              alignItems: "center",
                              marginBottom: 6,
                              flexWrap: "wrap",
                            }}
                          >
                            {!item.available && (
                              <span
                                style={{
                                  background: "var(--ink-100)",
                                  color: "var(--ink-500)",
                                  padding: "2px 8px",
                                  borderRadius: 6,
                                  fontSize: 11,
                                  fontWeight: 700,
                                }}
                              >
                                Esgotado
                              </span>
                            )}
                          </div>
                          <div
                            style={{
                              fontFamily: "var(--font-display)",
                              fontSize: 17,
                              fontWeight: 700,
                              color: "var(--ink-800)",
                              letterSpacing: "-0.01em",
                            }}
                          >
                            {item.name}
                          </div>
                          {item.description && (
                            <p
                              style={{
                                fontSize: 14,
                                color: "var(--fg-2)",
                                lineHeight: 1.4,
                                marginTop: 4,
                                flex: 1,
                              }}
                            >
                              {item.description}
                            </p>
                          )}
                          <div
                            className="price"
                            style={{
                              fontSize: 17,
                              color: "var(--ink-800)",
                              marginTop: 10,
                            }}
                          >
                            {formatPrice(item.priceCents)}
                          </div>
                        </div>

                        <div
                          style={{ position: "relative", flexShrink: 0 }}
                        >
                          {item.imageUrl && (
                            <div
                              style={{
                                width: 130,
                                height: 130,
                                borderRadius: "var(--r-md)",
                                backgroundImage: `url(${item.imageUrl})`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                              }}
                            />
                          )}
                          {item.available && restaurant.isOpen && (
                            <button
                              style={{
                                position: "absolute",
                                bottom: -10,
                                right: -10,
                                width: 40,
                                height: 40,
                                borderRadius: "50%",
                                background: "var(--tomate-500)",
                                color: "#fff",
                                border: "3px solid #fff",
                                boxShadow: "var(--shadow-2)",
                                cursor: "pointer",
                                display: "grid",
                                placeItems: "center",
                              }}
                              aria-label={`Adicionar ${item.name}`}
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedItem(item);
                              }}
                            >
                              <Plus size={18} color="#fff" strokeWidth={2.5} />
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Right: mini cart (sticky) */}
          <aside>
            <MiniCart />
          </aside>
        </div>
      </section>

      {/* AddItemModal overlay */}
      {selectedItem && (
        <AddItemModal
          item={selectedItem}
          restaurantId={restaurant.id}
          restaurantName={restaurant.name}
          onClose={() => setSelectedItem(null)}
        />
      )}
    </>
  );
}
