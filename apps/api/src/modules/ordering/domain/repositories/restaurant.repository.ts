import { Restaurant } from '../entities/restaurant';
import { MenuItem } from '../entities/menu-item';

export interface ListRestaurantsFilter {
  category?: string;
}

export interface SearchResult {
  restaurants: Restaurant[];
  dishes: MenuItem[];
}

export interface IRestaurantRepository {
  findAll(filter?: ListRestaurantsFilter): Promise<Restaurant[]>;
  findById(id: string): Promise<Restaurant | null>;
  search(query: string): Promise<SearchResult>;
}
