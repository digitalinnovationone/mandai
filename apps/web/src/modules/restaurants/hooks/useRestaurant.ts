"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchRestaurant } from "../services/restaurants.api";
import { restaurantKeys } from "./keys";

export function useRestaurant(id: string) {
  return useQuery({
    queryKey: restaurantKeys.detail(id),
    queryFn: () => fetchRestaurant(id),
    enabled: Boolean(id),
  });
}
