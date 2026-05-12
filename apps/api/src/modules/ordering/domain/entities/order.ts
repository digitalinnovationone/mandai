export type OrderStatus = 'pending' | 'confirmed' | 'ready' | 'picked_up' | 'cancelled';

export interface OrderModifier {
  group: string;
  option: string;
  priceDelta: number;
}

export interface OrderItemEntity {
  id: string;
  orderId: string;
  menuItemId: string;
  nameSnapshot: string;
  priceCentsSnapshot: number;
  qty: number;
  note?: string | null;
  modifiers: OrderModifier[];
}

export class Order {
  constructor(
    public readonly id: string,
    public readonly code: string,
    public readonly restaurantId: string,
    public readonly customerName: string,
    public readonly status: OrderStatus,
    public readonly subtotalCents: number,
    public readonly discountCents: number,
    public readonly couponCode: string | null,
    public readonly totalCents: number,
    public readonly qrPayload: string,
    public readonly estimatedReadyAt: Date,
    public readonly createdAt: Date,
    public readonly items: OrderItemEntity[],
  ) {}
}
