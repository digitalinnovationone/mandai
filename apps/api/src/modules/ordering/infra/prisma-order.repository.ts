import { PrismaClient } from '@prisma/client';
import { IOrderRepository, CreateOrderInput } from '../domain/repositories/order.repository';
import { Order, OrderItemEntity, OrderModifier, OrderStatus } from '../domain/entities/order';

export class PrismaOrderRepository implements IOrderRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async create(input: CreateOrderInput): Promise<Order> {
    const row = await this.prisma.order.create({
      data: {
        code: input.code,
        restaurantId: input.restaurantId,
        customerName: input.customerName,
        status: 'pending',
        subtotalCents: input.subtotalCents,
        discountCents: input.discountCents,
        couponCode: input.couponCode ?? null,
        totalCents: input.totalCents,
        qrPayload: input.qrPayload,
        estimatedReadyAt: input.estimatedReadyAt,
        items: {
          create: input.items.map((item) => ({
            menuItemId: item.menuItemId,
            nameSnapshot: item.nameSnapshot,
            priceCentsSnapshot: item.priceCentsSnapshot,
            qty: item.qty,
            note: item.note ?? null,
            modifiers: item.modifiers as unknown as Parameters<typeof this.prisma.orderItem.create>[0]['data']['modifiers'],
          })),
        },
      },
      include: { items: true },
    });

    return toDomain(row);
  }

  async findById(id: string): Promise<Order | null> {
    const row = await this.prisma.order.findUnique({
      where: { id },
      include: { items: true },
    });
    if (!row) return null;
    return toDomain(row);
  }
}

// ─── toDomain (inline, no Mapper class per ARQUITETURA.md) ────────────────

type PrismaOrderRow = {
  id: string;
  code: string;
  restaurantId: string;
  customerName: string;
  status: string;
  subtotalCents: number;
  discountCents: number;
  couponCode: string | null;
  totalCents: number;
  qrPayload: string;
  estimatedReadyAt: Date;
  createdAt: Date;
  items: Array<{
    id: string;
    orderId: string;
    menuItemId: string;
    nameSnapshot: string;
    priceCentsSnapshot: number;
    qty: number;
    note: string | null;
    modifiers: unknown;
  }>;
};

function toDomain(row: PrismaOrderRow): Order {
  const items: OrderItemEntity[] = row.items.map((item) => ({
    id: item.id,
    orderId: item.orderId,
    menuItemId: item.menuItemId,
    nameSnapshot: item.nameSnapshot,
    priceCentsSnapshot: item.priceCentsSnapshot,
    qty: item.qty,
    note: item.note,
    modifiers: (item.modifiers as OrderModifier[]) ?? [],
  }));

  return new Order(
    row.id,
    row.code,
    row.restaurantId,
    row.customerName,
    row.status as OrderStatus,
    row.subtotalCents,
    row.discountCents,
    row.couponCode,
    row.totalCents,
    row.qrPayload,
    row.estimatedReadyAt,
    row.createdAt,
    items,
  );
}
