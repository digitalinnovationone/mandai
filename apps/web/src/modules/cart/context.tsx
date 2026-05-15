"use client";

import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import type { CartState, CartAction, CartItem } from "./types";

// ─── Constants ───────────────────────────────────────────────────

/** Welcome coupon value in cents (R$10,00). Mirrored in backend CreateOrderUseCase. */
const WELCOME_COUPON_VALUE_CENTS = 1000;

// ─── Initial state ────────────────────────────────────────────────

const INITIAL_STATE: CartState = {
  restaurantId: null,
  restaurantName: "",
  items: [],
  couponRedeemed: false,
};

const STORAGE_KEY = "mandai:cart";

// ─── Reducer ─────────────────────────────────────────────────────

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    // Defensive spread: old localStorage values without couponRedeemed default to false
    case "HYDRATE":
      return { ...INITIAL_STATE, ...action.payload };

    case "ADD_ITEM": {
      const { restaurantId, restaurantName, item, force } = action.payload;

      const newItem: CartItem = {
        ...item,
        id: `${item.menuItemId}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      };

      // force = user already confirmed switch → clear items but KEEP coupon state (ADR-0009)
      if (force) {
        return {
          restaurantId,
          restaurantName,
          items: [newItem],
          couponRedeemed: state.couponRedeemed,
        };
      }

      // Same restaurant (or empty cart) → merge
      if (!state.restaurantId || state.restaurantId === restaurantId) {
        // Exact same item+modifiers+note → increment qty
        const existingIndex = state.items.findIndex(
          (i) =>
            i.menuItemId === item.menuItemId &&
            JSON.stringify(i.modifiers) === JSON.stringify(item.modifiers) &&
            (i.note ?? "") === (item.note ?? ""),
        );

        if (existingIndex >= 0) {
          const updated = [...state.items];
          updated[existingIndex] = {
            ...updated[existingIndex],
            qty: updated[existingIndex].qty + item.qty,
          };
          return { ...state, restaurantId, restaurantName, items: updated };
        }

        return {
          ...state,
          restaurantId,
          restaurantName,
          items: [...state.items, newItem],
        };
      }

      // Different restaurant, caller must use force=true after confirmation
      return state;
    }

    case "REMOVE_ITEM":
      return {
        ...state,
        items: state.items.filter((i) => i.id !== action.payload.id),
      };

    case "UPDATE_QTY": {
      const { id, qty } = action.payload;
      if (qty <= 0)
        return { ...state, items: state.items.filter((i) => i.id !== id) };
      return {
        ...state,
        items: state.items.map((i) => (i.id === id ? { ...i, qty } : i)),
      };
    }

    // Preserve coupon state across cart clears (ADR-0009: coupon is per-session)
    case "CLEAR_CART":
      return { ...INITIAL_STATE, couponRedeemed: state.couponRedeemed };

    case "REDEEM_COUPON":
      return { ...state, couponRedeemed: true };

    default:
      return state;
  }
}

// ─── Context ─────────────────────────────────────────────────────

interface CartContextValue {
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
  /** Items total before any discount, in cents */
  subtotalCents: number;
  /** Discount in cents — min(R$10, subtotal) when coupon redeemed, else 0 */
  discountCents: number;
  /** Final total in cents (subtotalCents − discountCents) */
  totalCents: number;
  /** True when cart has items from a different restaurant than the given id */
  wouldSwitchRestaurant: (restaurantId: string) => boolean;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, INITIAL_STATE);

  // Hydrate from localStorage on mount (client only)
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const persisted = JSON.parse(raw) as CartState;
        dispatch({ type: "HYDRATE", payload: persisted });
      }
    } catch {
      // ignore — start fresh
    }
  }, []);

  // Persist to localStorage on every state change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // ignore quota errors
    }
  }, [state]);

  const subtotalCents = state.items.reduce((sum, item) => {
    const modTotal = item.modifiers.reduce((m, mod) => m + mod.priceDelta, 0);
    return sum + (item.basePriceCents + modTotal) * item.qty;
  }, 0);

  const discountCents = state.couponRedeemed
    ? Math.min(WELCOME_COUPON_VALUE_CENTS, subtotalCents)
    : 0;

  const totalCents = subtotalCents - discountCents;

  const wouldSwitchRestaurant = useCallback(
    (restaurantId: string) =>
      state.items.length > 0 &&
      state.restaurantId !== null &&
      state.restaurantId !== restaurantId,
    [state.items.length, state.restaurantId],
  );

  return (
    <CartContext.Provider
      value={{
        state,
        dispatch,
        subtotalCents,
        discountCents,
        totalCents,
        wouldSwitchRestaurant,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}
