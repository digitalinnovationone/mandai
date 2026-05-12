import { PrismaClient } from '@prisma/client';
import { IRestaurantRepository, ListRestaurantsFilter, SearchResult } from '../domain/repositories/restaurant.repository';
import { Restaurant, MenuSectionEntity, MenuItemEntity } from '../domain/entities/restaurant';
import { MenuItem } from '../domain/entities/menu-item';

export class PrismaRestaurantRepository implements IRestaurantRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findAll(filter?: ListRestaurantsFilter): Promise<Restaurant[]> {
    const rows = await this.prisma.restaurant.findMany({
      where: filter?.category ? { category: filter.category } : undefined,
      orderBy: { distanceMeters: 'asc' },
    });
    return rows.map(toDomain);
  }

  async findById(id: string): Promise<Restaurant | null> {
    const row = await this.prisma.restaurant.findUnique({
      where: { id },
      include: {
        sections: {
          orderBy: { order: 'asc' },
          include: {
            items: {
              orderBy: { name: 'asc' },
            },
          },
        },
      },
    });
    if (!row) return null;
    return toDomainWithSections(row);
  }

  async search(query: string): Promise<SearchResult> {
    const [restaurants, items] = await Promise.all([
      this.prisma.restaurant.findMany({
        where: {
          name: { contains: query, mode: 'insensitive' },
        },
        orderBy: { distanceMeters: 'asc' },
      }),
      this.prisma.menuItem.findMany({
        where: {
          name: { contains: query, mode: 'insensitive' },
          available: true,
        },
        include: { section: true },
      }),
    ]);

    return {
      restaurants: restaurants.map(toDomain),
      dishes: items.map((item) =>
        new MenuItem(
          item.id,
          item.sectionId,
          item.name,
          item.description,
          item.priceCents,
          item.imageUrl,
          item.available,
        ),
      ),
    };
  }
}

// ─── toDomain helpers (inline, no Mapper class per ARQUITETURA.md) ─────────

type PrismaRestaurantRow = {
  id: string;
  name: string;
  slug: string;
  category: string;
  rating: number;
  distanceMeters: number;
  coverUrl: string;
  isOpen: boolean;
  address: string;
  neighborhood: string;
  phone: string;
};

function toDomain(row: PrismaRestaurantRow): Restaurant {
  return new Restaurant(
    row.id,
    row.name,
    row.slug,
    row.category,
    row.rating,
    row.distanceMeters,
    row.coverUrl,
    row.isOpen,
    row.address,
    row.neighborhood,
    row.phone,
    [],
  );
}

type PrismaRestaurantWithSections = PrismaRestaurantRow & {
  sections: Array<{
    id: string;
    restaurantId: string;
    name: string;
    order: number;
    items: Array<{
      id: string;
      sectionId: string;
      name: string;
      description: string;
      priceCents: number;
      imageUrl: string;
      available: boolean;
    }>;
  }>;
};

function toDomainWithSections(row: PrismaRestaurantWithSections): Restaurant {
  const sections: MenuSectionEntity[] = row.sections.map((section) => ({
    id: section.id,
    restaurantId: section.restaurantId,
    name: section.name,
    order: section.order,
    items: section.items.map((item): MenuItemEntity => ({
      id: item.id,
      sectionId: item.sectionId,
      name: item.name,
      description: item.description,
      priceCents: item.priceCents,
      imageUrl: item.imageUrl,
      available: item.available,
    })),
  }));

  return new Restaurant(
    row.id,
    row.name,
    row.slug,
    row.category,
    row.rating,
    row.distanceMeters,
    row.coverUrl,
    row.isOpen,
    row.address,
    row.neighborhood,
    row.phone,
    sections,
  );
}
