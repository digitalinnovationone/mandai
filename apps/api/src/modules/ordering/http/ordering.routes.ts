import { FastifyInstance } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import { z } from 'zod';
import { ListRestaurantsUseCase } from '../application/use-cases/list-restaurants';
import { GetRestaurantUseCase } from '../application/use-cases/get-restaurant';
import { SearchUseCase } from '../application/use-cases/search';
import { CreateOrderUseCase } from '../application/use-cases/create-order';
import { GetOrderUseCase } from '../application/use-cases/get-order';

interface OrderingRoutesDeps {
  listRestaurants: ListRestaurantsUseCase;
  getRestaurant: GetRestaurantUseCase;
  search: SearchUseCase;
  createOrder: CreateOrderUseCase;
  getOrder: GetOrderUseCase;
}

export async function orderingRoutes(
  app: FastifyInstance,
  deps: OrderingRoutesDeps,
): Promise<void> {
  const typed = app.withTypeProvider<ZodTypeProvider>();

  // ── GET /api/restaurants ──────────────────────────────────────────────────
  typed.get(
    '/restaurants',
    {
      schema: {
        querystring: z.object({
          category: z.string().optional(),
        }),
        response: {
          200: z.array(
            z.object({
              id: z.string(),
              name: z.string(),
              slug: z.string(),
              category: z.string(),
              rating: z.number(),
              distanceMeters: z.number(),
              coverUrl: z.string(),
              isOpen: z.boolean(),
              address: z.string(),
              neighborhood: z.string(),
              phone: z.string(),
            }),
          ),
        },
      },
    },
    async (request) => {
      const { category } = request.query;
      const restaurants = await deps.listRestaurants.execute({ category });
      return restaurants.map((r) => ({
        id: r.id,
        name: r.name,
        slug: r.slug,
        category: r.category,
        rating: r.rating,
        distanceMeters: r.distanceMeters,
        coverUrl: r.coverUrl,
        isOpen: r.isOpen,
        address: r.address,
        neighborhood: r.neighborhood,
        phone: r.phone,
      }));
    },
  );

  // ── GET /api/restaurants/:id ──────────────────────────────────────────────
  typed.get(
    '/restaurants/:id',
    {
      schema: {
        params: z.object({
          id: z.string(),
        }),
        response: {
          200: z.object({
            id: z.string(),
            name: z.string(),
            slug: z.string(),
            category: z.string(),
            rating: z.number(),
            distanceMeters: z.number(),
            coverUrl: z.string(),
            isOpen: z.boolean(),
            address: z.string(),
            neighborhood: z.string(),
            phone: z.string(),
            sections: z.array(
              z.object({
                id: z.string(),
                name: z.string(),
                order: z.number(),
                items: z.array(
                  z.object({
                    id: z.string(),
                    name: z.string(),
                    description: z.string(),
                    priceCents: z.number(),
                    imageUrl: z.string(),
                    available: z.boolean(),
                  }),
                ),
              }),
            ),
          }),
        },
      },
    },
    async (request) => {
      const { id } = request.params;
      const restaurant = await deps.getRestaurant.execute(id);
      return {
        id: restaurant.id,
        name: restaurant.name,
        slug: restaurant.slug,
        category: restaurant.category,
        rating: restaurant.rating,
        distanceMeters: restaurant.distanceMeters,
        coverUrl: restaurant.coverUrl,
        isOpen: restaurant.isOpen,
        address: restaurant.address,
        neighborhood: restaurant.neighborhood,
        phone: restaurant.phone,
        sections: restaurant.sections.map((s) => ({
          id: s.id,
          name: s.name,
          order: s.order,
          items: s.items.map((item) => ({
            id: item.id,
            name: item.name,
            description: item.description,
            priceCents: item.priceCents,
            imageUrl: item.imageUrl,
            available: item.available,
          })),
        })),
      };
    },
  );

  // ── GET /api/search ───────────────────────────────────────────────────────
  typed.get(
    '/search',
    {
      schema: {
        querystring: z.object({
          q: z.string(),
        }),
        response: {
          200: z.object({
            restaurants: z.array(
              z.object({
                id: z.string(),
                name: z.string(),
                slug: z.string(),
                category: z.string(),
                rating: z.number(),
                distanceMeters: z.number(),
                coverUrl: z.string(),
                isOpen: z.boolean(),
                address: z.string(),
                neighborhood: z.string(),
                phone: z.string(),
              }),
            ),
            dishes: z.array(
              z.object({
                id: z.string(),
                sectionId: z.string(),
                name: z.string(),
                description: z.string(),
                priceCents: z.number(),
                imageUrl: z.string(),
                available: z.boolean(),
              }),
            ),
          }),
        },
      },
    },
    async (request) => {
      const { q } = request.query;
      const result = await deps.search.execute(q);
      return {
        restaurants: result.restaurants.map((r) => ({
          id: r.id,
          name: r.name,
          slug: r.slug,
          category: r.category,
          rating: r.rating,
          distanceMeters: r.distanceMeters,
          coverUrl: r.coverUrl,
          isOpen: r.isOpen,
          address: r.address,
          neighborhood: r.neighborhood,
          phone: r.phone,
        })),
        dishes: result.dishes.map((d) => ({
          id: d.id,
          sectionId: d.sectionId,
          name: d.name,
          description: d.description,
          priceCents: d.priceCents,
          imageUrl: d.imageUrl,
          available: d.available,
        })),
      };
    },
  );

  // ── POST /api/orders ──────────────────────────────────────────────────────
  const modifierSchema = z.object({
    group: z.string(),
    option: z.string(),
    priceDelta: z.number().int(),
  });

  const orderItemSchema = z.object({
    menuItemId: z.string(),
    qty: z.number().int().min(1).max(20),
    note: z.string().max(140).optional(),
    modifiers: z.array(modifierSchema).default([]),
  });

  typed.post(
    '/orders',
    {
      schema: {
        body: z.object({
          restaurantId: z.string(),
          customerName: z.string().min(1).max(100),
          items: z.array(orderItemSchema).min(1),
          couponCode: z.string().optional(),
          // discountCents is NOT accepted from callers — backend always sets it to 0 (MVP rule).
        }),
        response: {
          201: z.object({
            id: z.string(),
            code: z.string(),
            restaurantId: z.string(),
            customerName: z.string(),
            status: z.string(),
            subtotalCents: z.number(),
            discountCents: z.number(),
            couponCode: z.string().nullable(),
            totalCents: z.number(),
            qrPayload: z.string(),
            estimatedReadyAt: z.string(),
            createdAt: z.string(),
            items: z.array(
              z.object({
                id: z.string(),
                menuItemId: z.string(),
                nameSnapshot: z.string(),
                priceCentsSnapshot: z.number(),
                qty: z.number(),
                note: z.string().nullable(),
                modifiers: z.array(modifierSchema),
              }),
            ),
          }),
        },
      },
    },
    async (request, reply) => {
      const order = await deps.createOrder.execute(request.body);
      reply.status(201);
      return {
        id: order.id,
        code: order.code,
        restaurantId: order.restaurantId,
        customerName: order.customerName,
        status: order.status,
        subtotalCents: order.subtotalCents,
        discountCents: order.discountCents,
        couponCode: order.couponCode,
        totalCents: order.totalCents,
        qrPayload: order.qrPayload,
        estimatedReadyAt: order.estimatedReadyAt.toISOString(),
        createdAt: order.createdAt.toISOString(),
        items: order.items.map((item) => ({
          id: item.id,
          menuItemId: item.menuItemId,
          nameSnapshot: item.nameSnapshot,
          priceCentsSnapshot: item.priceCentsSnapshot,
          qty: item.qty,
          note: item.note ?? null,
          modifiers: item.modifiers,
        })),
      };
    },
  );

  // ── GET /api/orders/:id ───────────────────────────────────────────────────
  typed.get(
    '/orders/:id',
    {
      schema: {
        params: z.object({
          id: z.string(),
        }),
        response: {
          200: z.object({
            id: z.string(),
            code: z.string(),
            restaurantId: z.string(),
            customerName: z.string(),
            status: z.string(),
            subtotalCents: z.number(),
            discountCents: z.number(),
            couponCode: z.string().nullable(),
            totalCents: z.number(),
            qrPayload: z.string(),
            estimatedReadyAt: z.string(),
            createdAt: z.string(),
            items: z.array(
              z.object({
                id: z.string(),
                menuItemId: z.string(),
                nameSnapshot: z.string(),
                priceCentsSnapshot: z.number(),
                qty: z.number(),
                note: z.string().nullable(),
                modifiers: z.array(modifierSchema),
              }),
            ),
          }),
        },
      },
    },
    async (request) => {
      const { id } = request.params;
      const order = await deps.getOrder.execute(id);
      return {
        id: order.id,
        code: order.code,
        restaurantId: order.restaurantId,
        customerName: order.customerName,
        status: order.status,
        subtotalCents: order.subtotalCents,
        discountCents: order.discountCents,
        couponCode: order.couponCode,
        totalCents: order.totalCents,
        qrPayload: order.qrPayload,
        estimatedReadyAt: order.estimatedReadyAt.toISOString(),
        createdAt: order.createdAt.toISOString(),
        items: order.items.map((item) => ({
          id: item.id,
          menuItemId: item.menuItemId,
          nameSnapshot: item.nameSnapshot,
          priceCentsSnapshot: item.priceCentsSnapshot,
          qty: item.qty,
          note: item.note ?? null,
          modifiers: item.modifiers,
        })),
      };
    },
  );
}
