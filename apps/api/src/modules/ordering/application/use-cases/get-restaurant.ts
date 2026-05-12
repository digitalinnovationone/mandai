import { Restaurant } from '../../domain/entities/restaurant';
import { IRestaurantRepository } from '../../domain/repositories/restaurant.repository';
import { HttpError } from '../../../../shared/errors';

export class GetRestaurantUseCase {
  constructor(private readonly restaurantRepo: IRestaurantRepository) {}

  async execute(id: string): Promise<Restaurant> {
    const restaurant = await this.restaurantRepo.findById(id);
    if (!restaurant) {
      throw new HttpError(404, `Restaurant not found: ${id}`, 'RESTAURANT_NOT_FOUND');
    }
    return restaurant;
  }
}
