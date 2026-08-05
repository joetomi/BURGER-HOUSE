export interface AdminMenuItem {
  id: string;
  nameAr: string;
  nameEn: string;
  price: number;
  enabled: boolean;
}

export interface AdminMenuCategory {
  id: string;
  titleAr: string;
  titleEn: string;
  enabled: boolean;
  items: AdminMenuItem[];
}

export interface AdminMenuContent {
  version: number;
  food: AdminMenuCategory[];
  cafe: AdminMenuCategory[];
}

export interface PendingImage {
  path: string;
  publicPath: string;
  contentBase64: string;
  previewUrl: string;
}

export interface AdminPromotion {
  id: string;
  image: string;
  titleAr: string;
  titleEn: string;
  captionAr: string;
  captionEn: string;
  postUrl: string;
  enabled: boolean;
  pendingImage?: PendingImage;
}

export interface AdminPromotionsContent {
  version: number;
  items: AdminPromotion[];
}

export interface AdminContentResponse {
  baseSha: string;
  menu: AdminMenuContent;
  promotions: AdminPromotionsContent;
}

