import menuContent from "./menu.json";

export interface MenuItem {
  id: string;
  nameAr: string;
  nameEn: string;
  price: number;
  enabled?: boolean;
}

export interface MenuCategory {
  id: string;
  titleEn: string;
  titleAr: string;
  enabled?: boolean;
  items: MenuItem[];
}

interface MenuContent {
  version: number;
  food: MenuCategory[];
  cafe: MenuCategory[];
}

const content = menuContent as MenuContent;

const visibleCategories = (categories: MenuCategory[]) =>
  categories
    .filter((category) => category.enabled !== false)
    .map((category) => ({
      ...category,
      items: category.items.filter((item) => item.enabled !== false),
    }));

export const MENU_DATA = visibleCategories(content.food);
export const CAFE_MENU_DATA = visibleCategories(content.cafe);

