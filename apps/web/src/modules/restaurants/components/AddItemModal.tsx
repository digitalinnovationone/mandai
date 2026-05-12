"use client";

import { useState, useEffect, useId } from "react";
import { X, Minus, Plus } from "lucide-react";
import { useCart } from "@/modules/cart/context";
import ClearCartModal from "@/modules/cart/components/ClearCartModal";
import type { MenuItem, MenuItemModifierGroup } from "../types";

interface AddItemModalProps {
  item: MenuItem;
  restaurantId: string;
  restaurantName: string;
  onClose: () => void;
}

function formatPrice(cents: number): string {
  return (cents / 100).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

export default function AddItemModal({
  item,
  restaurantId,
  restaurantName,
  onClose,
}: AddItemModalProps) {
  const { dispatch, wouldSwitchRestaurant } = useCart();
  const noteId = useId();

  const [qty, setQty] = useState(1);
  const [note, setNote] = useState("");
  // radio selections: groupId → optionId
  const [radioSelections, setRadioSelections] = useState<
    Record<string, string>
  >({});
  // checkbox selections: groupId → Set<optionId>
  const [checkboxSelections, setCheckboxSelections] = useState<
    Record<string, Set<string>>
  >({});
  const [showClearModal, setShowClearModal] = useState(false);

  const groups: MenuItemModifierGroup[] = item.modifierGroups ?? [];
  const requiredGroups = groups.filter((g) => g.required && !g.multiple);

  // All required radio groups must have a selection before submit
  const canSubmit = requiredGroups.every((g) => Boolean(radioSelections[g.id]));

  // Close on Escape
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  // Compute total price in cents
  const totalCents = (() => {
    let base = item.priceCents * qty;
    for (const g of groups) {
      if (!g.multiple) {
        const selId = radioSelections[g.id];
        if (selId) {
          const opt = g.options.find((o) => o.id === selId);
          if (opt) base += opt.priceDeltaCents * qty;
        }
      } else {
        const selSet = checkboxSelections[g.id];
        if (selSet) {
          for (const optId of selSet) {
            const opt = g.options.find((o) => o.id === optId);
            if (opt) base += opt.priceDeltaCents * qty;
          }
        }
      }
    }
    return base;
  })();

  function buildModifiers() {
    const mods: { group: string; option: string; priceDelta: number }[] = [];
    for (const g of groups) {
      if (!g.multiple) {
        const selId = radioSelections[g.id];
        if (selId) {
          const opt = g.options.find((o) => o.id === selId);
          if (opt)
            mods.push({
              group: g.label,
              option: opt.label,
              priceDelta: opt.priceDeltaCents,
            });
        }
      } else {
        const selSet = checkboxSelections[g.id];
        if (selSet) {
          for (const optId of selSet) {
            const opt = g.options.find((o) => o.id === optId);
            if (opt)
              mods.push({
                group: g.label,
                option: opt.label,
                priceDelta: opt.priceDeltaCents,
              });
          }
        }
      }
    }
    return mods;
  }

  function doAddToCart(force = false) {
    dispatch({
      type: "ADD_ITEM",
      payload: {
        restaurantId,
        restaurantName,
        force,
        item: {
          menuItemId: item.id,
          name: item.name,
          basePriceCents: item.priceCents,
          qty,
          modifiers: buildModifiers(),
          note: note.trim() || undefined,
        },
      },
    });
    onClose();
  }

  function handleAddToCart() {
    if (wouldSwitchRestaurant(restaurantId)) {
      setShowClearModal(true);
    } else {
      doAddToCart(false);
    }
  }

  return (
    <>
      {/* Backdrop */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(20, 16, 10, 0.55)",
          zIndex: 100,
        }}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal card */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label={`Adicionar ${item.name}`}
        style={{
          position: "fixed",
          top: 80,
          left: "50%",
          transform: "translateX(-50%)",
          width: 760,
          maxHeight: "calc(100vh - 120px)",
          background: "#fff",
          borderRadius: "var(--r-xl)",
          boxShadow: "var(--shadow-pop)",
          overflow: "hidden",
          zIndex: 101,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Hero image */}
        <div style={{ position: "relative", flexShrink: 0 }}>
          {item.imageUrl ? (
            <div
              style={{
                height: 240,
                backgroundImage: `url(${item.imageUrl})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
          ) : (
            <div
              style={{
                height: 160,
                background: "var(--ink-100)",
                display: "grid",
                placeItems: "center",
                color: "var(--ink-300)",
                fontSize: 14,
              }}
            >
              Sem foto
            </div>
          )}
          <button
            className="icon-btn"
            style={{
              position: "absolute",
              top: 16,
              right: 16,
              boxShadow: "var(--shadow-2)",
            }}
            onClick={onClose}
            aria-label="Fechar"
          >
            <X size={18} color="var(--ink-800)" />
          </button>
        </div>

        {/* Scrollable body */}
        <div style={{ overflowY: "auto", flex: 1, padding: "24px 32px 0" }}>
          {/* Name + price */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              gap: 20,
            }}
          >
            <div>
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 26,
                  fontWeight: 800,
                  color: "var(--ink-800)",
                  letterSpacing: "-0.025em",
                  marginBottom: 8,
                }}
              >
                {item.name}
              </h2>
              {item.description && (
                <p
                  style={{
                    fontSize: 15,
                    color: "var(--fg-2)",
                    lineHeight: 1.5,
                    maxWidth: 520,
                  }}
                >
                  {item.description}
                </p>
              )}
            </div>
            <span
              className="price"
              style={{
                fontSize: 22,
                color: "var(--ink-800)",
                whiteSpace: "nowrap",
                flexShrink: 0,
              }}
            >
              {formatPrice(item.priceCents)}
            </span>
          </div>

          {/* Modifier groups */}
          {groups.map((group) => (
            <div key={group.id}>
              <hr className="divider" />
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: 14,
                }}
              >
                <div>
                  <div
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: 17,
                      fontWeight: 700,
                      color: "var(--ink-800)",
                    }}
                  >
                    {group.label}
                  </div>
                  <div style={{ fontSize: 13, color: "var(--fg-2)", marginTop: 2 }}>
                    {group.multiple ? "Quantos quiser" : "Escolha 1 opção"}
                  </div>
                </div>
                <span
                  style={{
                    background: group.required
                      ? "var(--ink-100)"
                      : "var(--folha-50)",
                    color: group.required
                      ? "var(--ink-700)"
                      : "var(--folha-700)",
                    padding: "4px 10px",
                    borderRadius: 999,
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: "0.05em",
                    textTransform: "uppercase",
                  }}
                >
                  {group.required ? "Obrigatório" : "Opcional"}
                </span>
              </div>

              {/* Radio group (pick one) */}
              {!group.multiple && (
                <div
                  style={{ display: "flex", flexDirection: "column", gap: 8 }}
                >
                  {group.options.map((opt) => {
                    const selected = radioSelections[group.id] === opt.id;
                    return (
                      <label
                        key={opt.id}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 12,
                          padding: "12px 14px",
                          border: selected
                            ? "1.5px solid var(--tomate-500)"
                            : "1px solid var(--border-2)",
                          background: selected
                            ? "var(--tomate-50)"
                            : "var(--bg-surface)",
                          borderRadius: "var(--r-sm)",
                          cursor: "pointer",
                        }}
                      >
                        <input
                          type="radio"
                          name={`group-${group.id}`}
                          checked={selected}
                          onChange={() =>
                            setRadioSelections((prev) => ({
                              ...prev,
                              [group.id]: opt.id,
                            }))
                          }
                          style={{ display: "none" }}
                        />
                        <span
                          style={{
                            width: 20,
                            height: 20,
                            borderRadius: "50%",
                            border: selected
                              ? "6px solid var(--tomate-500)"
                              : "1.5px solid var(--border-2)",
                            background: "#fff",
                            flexShrink: 0,
                          }}
                          aria-hidden="true"
                        />
                        <span
                          style={{
                            flex: 1,
                            fontSize: 14,
                            fontWeight: selected ? 600 : 500,
                            color: "var(--ink-800)",
                          }}
                        >
                          {opt.label}
                        </span>
                        <span
                          className="price"
                          style={{
                            fontSize: 13,
                            color:
                              opt.priceDeltaCents === 0
                                ? "var(--folha-600)"
                                : "var(--fg-2)",
                            fontWeight: 600,
                          }}
                        >
                          {opt.priceDeltaCents === 0
                            ? "Grátis"
                            : `+ ${formatPrice(opt.priceDeltaCents)}`}
                        </span>
                      </label>
                    );
                  })}
                </div>
              )}

              {/* Checkbox group (pick many) */}
              {group.multiple && (
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 8,
                  }}
                >
                  {group.options.map((opt) => {
                    const selected =
                      checkboxSelections[group.id]?.has(opt.id) ?? false;
                    return (
                      <label
                        key={opt.id}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 10,
                          padding: "10px 12px",
                          border: selected
                            ? "1.5px solid var(--tomate-500)"
                            : "1px solid var(--border-2)",
                          background: selected
                            ? "var(--tomate-50)"
                            : "var(--bg-surface)",
                          borderRadius: "var(--r-sm)",
                          cursor: "pointer",
                        }}
                      >
                        <input
                          type="checkbox"
                          checked={selected}
                          onChange={() => {
                            setCheckboxSelections((prev) => {
                              const current = new Set(prev[group.id] ?? []);
                              if (current.has(opt.id)) {
                                current.delete(opt.id);
                              } else {
                                current.add(opt.id);
                              }
                              return { ...prev, [group.id]: current };
                            });
                          }}
                          style={{ display: "none" }}
                        />
                        <span
                          style={{
                            width: 20,
                            height: 20,
                            borderRadius: 6,
                            border: selected
                              ? "0"
                              : "1.5px solid var(--border-2)",
                            background: selected
                              ? "var(--tomate-500)"
                              : "#fff",
                            display: "grid",
                            placeItems: "center",
                            flexShrink: 0,
                          }}
                          aria-hidden="true"
                        >
                          {selected && (
                            <svg
                              width="13"
                              height="13"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="#fff"
                              strokeWidth="3"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                          )}
                        </span>
                        <span
                          style={{
                            flex: 1,
                            fontSize: 13,
                            fontWeight: selected ? 600 : 500,
                            color: "var(--ink-800)",
                          }}
                        >
                          {opt.label}
                        </span>
                        <span
                          className="price"
                          style={{ fontSize: 12, color: "var(--fg-2)" }}
                        >
                          {opt.priceDeltaCents > 0
                            ? `+ ${formatPrice(opt.priceDeltaCents)}`
                            : "Grátis"}
                        </span>
                      </label>
                    );
                  })}
                </div>
              )}
            </div>
          ))}

          {/* Notes */}
          <hr className="divider" />
          <div style={{ marginBottom: 24 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 12,
              }}
            >
              <label
                htmlFor={noteId}
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 17,
                  fontWeight: 700,
                  color: "var(--ink-800)",
                }}
              >
                Algum recado pro restaurante?
              </label>
              <span style={{ fontSize: 12, color: "var(--fg-3)" }}>
                {note.length}/140
              </span>
            </div>
            <textarea
              id={noteId}
              placeholder="Ex: sem cebola, bem passado, etc."
              value={note}
              maxLength={140}
              onChange={(e) => setNote(e.target.value)}
              style={{
                width: "100%",
                background: "var(--bg-surface)",
                border: "1px solid var(--border-2)",
                borderRadius: "var(--r-sm)",
                padding: "12px 14px",
                fontFamily: "var(--font-body)",
                fontSize: 14,
                color: "var(--ink-800)",
                resize: "none",
                minHeight: 72,
                outline: "none",
              }}
            />
          </div>
        </div>

        {/* Sticky bottom CTA */}
        <div
          style={{
            padding: "20px 32px",
            borderTop: "1px solid var(--border-1)",
            background: "var(--bg-page)",
            display: "flex",
            alignItems: "center",
            gap: 16,
            flexShrink: 0,
          }}
        >
          {/* Qty stepper */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 4,
              background: "var(--bg-surface)",
              borderRadius: 999,
              padding: 4,
              border: "1px solid var(--border-2)",
              boxShadow: "var(--shadow-inner)",
            }}
          >
            <button
              style={{
                width: 38,
                height: 38,
                borderRadius: "50%",
                background: "transparent",
                border: 0,
                color: "var(--ink-700)",
                cursor: qty <= 1 ? "not-allowed" : "pointer",
                display: "grid",
                placeItems: "center",
                opacity: qty <= 1 ? 0.4 : 1,
              }}
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              disabled={qty <= 1}
              aria-label="Diminuir quantidade"
            >
              <Minus size={16} />
            </button>
            <span
              style={{
                minWidth: 28,
                textAlign: "center",
                fontFamily: "var(--font-mono)",
                fontWeight: 700,
                fontSize: 16,
                color: "var(--ink-800)",
              }}
              role="spinbutton"
              aria-valuenow={qty}
              aria-valuemin={1}
              aria-valuemax={20}
              aria-label={`Quantidade: ${qty}`}
            >
              {qty}
            </span>
            <button
              style={{
                width: 38,
                height: 38,
                borderRadius: "50%",
                background: "var(--tomate-500)",
                border: 0,
                color: "#fff",
                cursor: "pointer",
                display: "grid",
                placeItems: "center",
              }}
              onClick={() => setQty((q) => Math.min(20, q + 1))}
              aria-label="Aumentar quantidade"
            >
              <Plus size={16} color="#fff" strokeWidth={2.5} />
            </button>
          </div>

          {/* Add to cart button */}
          <button
            className="btn btn-primary"
            style={{
              flex: 1,
              padding: "16px 24px",
              fontSize: 15,
              justifyContent: "space-between",
              opacity: canSubmit ? 1 : 0.5,
              cursor: canSubmit ? "pointer" : "not-allowed",
            }}
            onClick={handleAddToCart}
            disabled={!canSubmit}
          >
            <span>Adicionar à sacola</span>
            <span className="price" style={{ fontSize: 16 }}>
              {formatPrice(totalCents)}
            </span>
          </button>
        </div>
      </div>

      {/* Clear cart confirmation */}
      {showClearModal && (
        <ClearCartModal
          fromRestaurant={restaurantName}
          onConfirm={() => {
            setShowClearModal(false);
            doAddToCart(true);
          }}
          onCancel={() => setShowClearModal(false)}
        />
      )}
    </>
  );
}
