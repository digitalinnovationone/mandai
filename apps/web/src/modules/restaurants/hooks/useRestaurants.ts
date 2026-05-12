"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchRestaurants } from "../services/restaurants.api";
import { restaurantKeys } from "./keys";

export function useRestaurants(category?: string) {
  return useQuery({
    queryKey: restaurantKeys.list(category),
    queryFn: () => fetchRestaurants(category),
  });
}
