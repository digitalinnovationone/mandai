import { IRestaurantRepository, SearchResult } from '../../domain/repositories/restaurant.repository';
import { HttpError } from '../../../../shared/errors';

export class SearchUseCase {
  constructor(private readonly restaurantRepo: IRestaurantRepository) {}

  async execute(query: string): Promise<SearchResult> {
    const q = query.trim();
    if (q.length < 2) {
      throw new HttpError(400, 'Search query must be at least 2 characters.', 'QUERY_TOO_SHORT');
    }
    return this.restaurantRepo.search(q);
  }
}
