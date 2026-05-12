import { PrismaClient } from '@prisma/client';
import { PrismaRestaurantRepository } from './infra/prisma-restaurant.repository';
import { PrismaOrderRepository } from './infra/prisma-order.repository';
import { ListRestaurantsUseCase } from './application/use-cases/list-restaurants';
import { GetRestaurantUseCase } from './application/use-cases/get-restaurant';
import { SearchUseCase } from './application/use-cases/search';
import { CreateOrderUseCase } from './application/use-cases/create-order';
import { GetOrderUseCase } from './application/use-cases/get-order';

/**
 * Manual DI factory — explicit wiring, no decorators, no container.
 * Didactic: the reader can trace every dependency from here.
 */
export function buildOrderingModule(prisma: PrismaClient) {
  const restaurantRepo = new PrismaRestaurantRepository(prisma);
  const orderRepo = new PrismaOrderRepository(prisma);

  return {
    listRestaurants: new ListRestaurantsUseCase(restaurantRepo),
    getRestaurant: new GetRestaurantUseCase(restaurantRepo),
    search: new SearchUseCase(restaurantRepo),
    createOrder: new CreateOrderUseCase(orderRepo, restaurantRepo),
    getOrder: new GetOrderUseCase(orderRepo),
  };
}
