import { api } from "@/shared/lib/api";
import type { Restaurant, RestaurantDetail, SearchResult } from "../types";

export async function fetchRestaurants(category?: string): Promise<Restaurant[]> {
  const qs = category ? `?category=${encodeURIComponent(category)}` : "";
  return api.get<Restaurant[]>(`/api/restaurants${qs}`);
}

export async function fetchRestaurant(id: string): Promise<RestaurantDetail> {
  return api.get<RestaurantDetail>(`/api/restaurants/${id}`);
}

export async function searchRestaurants(q: string): Promise<SearchResult> {
  return api.get<SearchResult>(`/api/search?q=${encodeURIComponent(q)}`);
}
