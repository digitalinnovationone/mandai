// Restaurant module types — mirrors backend response shapes

export interface Restaurant {
  id: string;
  name: string;
  slug: string;
  category: string;
  rating: number;
  distanceMeters: number;
  coverUrl: string;
  isOpen: boolean;
  address?: string;
  neighborhood?: string;
  phone?: string;
}

/** Modifier groups are designed-for but not yet served by the API — kept for future use */
export interface MenuItemModifierOption {
  id: string;
  label: string;
  priceDeltaCents: number;
}

export interface MenuItemModifierGroup {
  id: string;
  label: string;
  required: boolean;
  multiple: boolean;
  options: MenuItemModifierOption[];
}

export interface MenuItem {
  id: string;
  sectionId?: string;
  name: string;
  description: string;
  priceCents: number;
  imageUrl: string;
  available: boolean;
  /** Populated when available from backend — not in v0.1.0 API */
  modifierGroups?: MenuItemModifierGroup[];
}

export interface MenuSection {
  id: string;
  name: string;
  order: number;
  items: MenuItem[];
}

export interface RestaurantDetail extends Restaurant {
  sections: MenuSection[];
}

export interface SearchResult {
  restaurants: Restaurant[];
  dishes: {
    id: string;
    sectionId: string;
    name: string;
    description: string;
    priceCents: number;
    imageUrl: string;
    available: boolean;
  }[];
}
