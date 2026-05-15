// Cart types — v0.2.0 (US-01: coupon welcome, ADR-0009)

export interface CartItemModifier {
  group: string;
  option: string;
  priceDelta: number;
}

export interface CartItem {
  /** Unique entry ID */
  id: string;
  /** Reference to the backend menu item */
  menuItemId: string;
  name: string;
  /** Base price in cents */
  basePriceCents: number;
  qty: number;
  modifiers: CartItemModifier[];
  note?: string;
}

export interface CartState {
  /** Cart is mono-restaurant — null when empty */
  restaurantId: string | null;
  restaurantName: string;
  items: CartItem[];
  /**
   * True when the user redeemed the R$10 welcome coupon.
   * Survives restaurant switches and page refreshes (persisted in localStorage).
   * Intentionally NOT reset on CLEAR_CART — coupon is per-session, not per-order.
   */
  couponRedeemed: boolean;
}

// ─── Actions ─────────────────────────────────────────────────────

export type CartAction =
  | {
      type: "ADD_ITEM";
      payload: {
        restaurantId: string;
        restaurantName: string;
        item: Omit<CartItem, "id">;
        /** If true, clears existing cart before adding (used after user confirms switch) */
        force?: boolean;
      };
    }
  | { type: "REMOVE_ITEM"; payload: { id: string } }
  | { type: "UPDATE_QTY"; payload: { id: string; qty: number } }
  | { type: "CLEAR_CART" }
  | { type: "HYDRATE"; payload: CartState }
  | { type: "REDEEM_COUPON" };
