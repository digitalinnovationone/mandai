import { api } from "@/shared/lib/api";

export interface CreateOrderInput {
  restaurantId: string;
  customerName: string;
  items: {
    menuItemId: string;
    qty: number;
    modifiers: { group: string; option: string; priceDelta: number }[];
    note?: string;
  }[];
  /** Present only when the user redeemed the welcome coupon — backend validates. */
  couponCode?: string;
}

export interface OrderItem {
  id: string;
  menuItemId: string;
  nameSnapshot: string;
  priceCentsSnapshot: number;
  qty: number;
  note: string | null;
  modifiers: { group: string; option: string; priceDelta: number }[];
}

export interface OrderConfirmation {
  id: string;
  code: string; // MA-XXXX
  restaurantId: string;
  customerName: string;
  status: string;
  subtotalCents: number;
  discountCents: number;
  couponCode: string | null;
  totalCents: number;
  qrPayload: string;
  estimatedReadyAt: string;
  createdAt: string;
  items: OrderItem[];
}

export async function createOrder(
  input: CreateOrderInput,
): Promise<OrderConfirmation> {
  return api.post<OrderConfirmation>("/api/orders", input);
}

export async function fetchOrder(id: string): Promise<OrderConfirmation> {
  return api.get<OrderConfirmation>(`/api/orders/${id}`);
}
