export interface MenuItemEntity {
  id: string;
  sectionId: string;
  name: string;
  description: string;
  priceCents: number;
  imageUrl: string;
  available: boolean;
}

export interface MenuSectionEntity {
  id: string;
  restaurantId: string;
  name: string;
  order: number;
  items: MenuItemEntity[];
}

export class Restaurant {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly slug: string,
    public readonly category: string,
    public readonly rating: number,
    public readonly distanceMeters: number,
    public readonly coverUrl: string,
    public readonly isOpen: boolean,
    public readonly address: string,
    public readonly neighborhood: string,
    public readonly phone: string,
    public readonly sections: MenuSectionEntity[] = [],
  ) {}

  /** Business rule: a closed restaurant cannot receive new orders. */
  ensureOpen(): void {
    if (!this.isOpen) {
      throw new Error(`Restaurant "${this.name}" is currently closed.`);
    }
  }
}
