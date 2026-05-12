import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { fetchRestaurant } from "@/modules/restaurants/services/restaurants.api";
import RestaurantPageClient from "./RestaurantPageClient";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  try {
    const restaurant = await fetchRestaurant(id);
    return { title: restaurant.name };
  } catch {
    return { title: "Restaurante" };
  }
}

export default async function RestaurantPage({ params }: Props) {
  const { id } = await params;

  let restaurant;
  try {
    restaurant = await fetchRestaurant(id);
  } catch {
    notFound();
  }

  // Pass full data to Client Component for interactive menu
  return <RestaurantPageClient restaurant={restaurant} />;
}
