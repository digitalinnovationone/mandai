import { Order } from '../../domain/entities/order';
import { IOrderRepository } from '../../domain/repositories/order.repository';
import { IRestaurantRepository } from '../../domain/repositories/restaurant.repository';
import { HttpError } from '../../../../shared/errors';

export interface CreateOrderInput {
  restaurantId: string;
  customerName: string;
  items: Array<{
    menuItemId: string;
    qty: number;
    note?: string;
    modifiers: Array<{ group: string; option: string; priceDelta: number }>;
  }>;
  couponCode?: string;
  // discountCents is intentionally absent: the backend always sets it to 0 in the MVP.
  // Coupon validation lives here (domain rule), not in the caller.
}

/**
 * Generates a pickup code in the format MA-XXXX.
 * Alphanumeric uppercase, no ambiguous chars (0, O, 1, I).
 */
function generatePickupCode(): string {
  const ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let suffix = '';
  for (let i = 0; i < 4; i++) {
    suffix += ALPHABET[Math.floor(Math.random() * ALPHABET.length)];
  }
  return `MA-${suffix}`;
}

export class CreateOrderUseCase {
  constructor(
    private readonly orderRepo: IOrderRepository,
    private readonly restaurantRepo: IRestaurantRepository,
  ) {}

  async execute(input: CreateOrderInput): Promise<Order> {
    // 1. Load restaurant — validates existence and open status
    const restaurant = await this.restaurantRepo.findById(input.restaurantId);
    if (!restaurant) {
      throw new HttpError(404, `Restaurant not found: ${input.restaurantId}`, 'RESTAURANT_NOT_FOUND');
    }
    if (!restaurant.isOpen) {
      throw new HttpError(409, `Restaurant "${restaurant.name}" is currently closed.`, 'RESTAURANT_CLOSED');
    }

    // 2. Load all menu items for the restaurant to validate and snapshot
    const allItems = restaurant.sections.flatMap((s) => s.items);
    const itemMap = new Map(allItems.map((item) => [item.id, item]));

    if (input.items.length === 0) {
      throw new HttpError(400, 'Order must contain at least one item.', 'EMPTY_ORDER');
    }

    // 3. Validate each item and compute subtotal
    let subtotalCents = 0;
    const orderItems = input.items.map((lineItem) => {
      const menuItem = itemMap.get(lineItem.menuItemId);
      if (!menuItem) {
        throw new HttpError(
          400,
          `Menu item not found or does not belong to this restaurant: ${lineItem.menuItemId}`,
          'ITEM_NOT_FOUND',
        );
      }
      if (!menuItem.available) {
        throw new HttpError(
          409,
          `Menu item "${menuItem.name}" is currently unavailable.`,
          'ITEM_UNAVAILABLE',
        );
      }
      if (lineItem.qty < 1 || lineItem.qty > 20) {
        throw new HttpError(
          400,
          `Quantity for item "${menuItem.name}" must be between 1 and 20.`,
          'INVALID_QTY',
        );
      }

      const modifierTotal = lineItem.modifiers.reduce((sum, m) => sum + m.priceDelta, 0);
      subtotalCents += (menuItem.priceCents + modifierTotal) * lineItem.qty;

      return {
        menuItemId: menuItem.id,
        nameSnapshot: menuItem.name,
        priceCentsSnapshot: menuItem.priceCents,
        qty: lineItem.qty,
        note: lineItem.note,
        modifiers: lineItem.modifiers,
      };
    });

    // 4. Discount — always 0 in MVP (no coupon validation; couponCode is snapshot-only).
    // Business rule lives here, not in the caller.
    const discountCents = 0;
    const totalCents = subtotalCents;

    // 5. Generate pickup code + QR payload
    const code = generatePickupCode();
    const qrPayload = `https://mandai.app/r/${code}`;

    // 6. Estimated ready time (18 minutes from now — fixed for MVP)
    const estimatedReadyAt = new Date(Date.now() + 18 * 60 * 1000);

    // 7. Persist
    return this.orderRepo.create({
      restaurantId: input.restaurantId,
      customerName: input.customerName.trim(),
      items: orderItems,
      subtotalCents,
      discountCents,
      couponCode: input.couponCode,
      totalCents,
      code,
      qrPayload,
      estimatedReadyAt,
    });
  }
}
