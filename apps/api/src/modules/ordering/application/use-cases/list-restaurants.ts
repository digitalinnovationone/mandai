import { Restaurant } from '../../domain/entities/restaurant';
import { IRestaurantRepository, ListRestaurantsFilter } from '../../domain/repositories/restaurant.repository';

export class ListRestaurantsUseCase {
  constructor(private readonly restaurantRepo: IRestaurantRepository) {}

  async execute(filter?: ListRestaurantsFilter): Promise<Restaurant[]> {
    return this.restaurantRepo.findAll(filter);
  }
}
