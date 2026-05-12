import { Order, OrderItemEntity } from '../entities/order';

export interface CreateOrderInput {
  restaurantId: string;
  customerName: string;
  items: Array<{
    menuItemId: string;
    nameSnapshot: string;
    priceCentsSnapshot: number;
    qty: number;
    note?: string;
    modifiers: Array<{ group: string; option: string; priceDelta: number }>;
  }>;
  subtotalCents: number;
  discountCents: number;
  couponCode?: string;
  totalCents: number;
  code: string;
  qrPayload: string;
  estimatedReadyAt: Date;
}

export interface IOrderRepository {
  create(input: CreateOrderInput): Promise<Order>;
  findById(id: string): Promise<Order | null>;
}
