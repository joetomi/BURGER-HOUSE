const ID_PATTERN = /^[a-z0-9][a-z0-9._-]{1,63}$/;
const IMAGE_PATTERN = /^\/(?:promotions\/[a-z0-9._-]+\.(?:jpg|jpeg|png|webp)|ad-[a-z0-9._-]+\.(?:jpg|jpeg|png|webp))$/i;

const cleanText = (value, label, maxLength = 120) => {
  if (typeof value !== "string") throw new Error(`${label} غير صالح.`);
  const cleaned = value.trim();
  if (!cleaned || cleaned.length > maxLength) throw new Error(`${label} مطلوب ويجب ألا يتجاوز ${maxLength} حرفاً.`);
  return cleaned;
};

const cleanId = (value, label) => {
  const id = cleanText(value, label, 64).toLowerCase();
  if (!ID_PATTERN.test(id)) throw new Error(`${label} يحتوي على أحرف غير مسموحة.`);
  return id;
};

const cleanEnabled = (value) => value !== false;

const cleanIngredients = (value, label) => {
  if (value == null || (typeof value === "string" && !value.trim())) return "";
  return cleanText(value, label, 500);
};

const cleanSize = (size) => {
  const price = Number(size?.price);
  if (!Number.isFinite(price) || price < 0 || price > 1000) throw new Error("سعر الحجم غير صالح.");
  return {
    nameAr: cleanText(size?.nameAr, "اسم الحجم بالعربية", 40),
    nameEn: size?.nameEn ? cleanText(size.nameEn, "اسم الحجم بالإنجليزية", 40) : "",
    price: Math.round(price * 100) / 100,
  };
};

const cleanSizes = (sizes) => {
  if (!Array.isArray(sizes) || sizes.length === 0) return [];
  return sizes.map(cleanSize);
};

const cleanMenuItem = (item) => {
  const price = Number(item?.price);
  if (!Number.isFinite(price) || price < 0 || price > 1000) throw new Error("سعر الصنف غير صالح.");

  return {
    id: cleanId(item?.id, "معرّف الصنف"),
    nameAr: cleanText(item?.nameAr, "اسم الصنف بالعربية"),
    nameEn: cleanText(item?.nameEn, "اسم الصنف بالإنجليزية"),
    price: Math.round(price * 100) / 100,
    enabled: cleanEnabled(item?.enabled),
    ingredientsVisible: item?.ingredientsVisible === true,
    ingredientsAr: cleanIngredients(item?.ingredientsAr, "المكونات بالعربية"),
    ingredientsEn: cleanIngredients(item?.ingredientsEn, "المكونات بالإنجليزية"),
    sizesEnabled: item?.sizesEnabled === true,
    sizes: item?.sizesEnabled === true ? cleanSizes(item?.sizes) : [],
  };
};

const CATEGORY_IMAGE_PATTERN = /^\/(?:categories\/[a-z0-9._-]+\.(?:jpg|jpeg|png|webp)|hero-burger\.png|category-(?:wraps|meals)\.png|category-default\.svg)$/i;

const cleanCategory = (category) => {
  if (!Array.isArray(category?.items) || category.items.length > 100) throw new Error("قائمة الأصناف غير صالحة.");
  const itemIds = new Set();
  const items = category.items.map(cleanMenuItem);
  for (const item of items) {
    if (itemIds.has(item.id)) throw new Error(`معرّف الصنف مكرر: ${item.id}`);
    itemIds.add(item.id);
  }

  const image = category?.image || "/category-default.svg";
  if (typeof image !== "string" || image.length > 180 || !CATEGORY_IMAGE_PATTERN.test(image)) {
    throw new Error("مسار صورة القسم غير صالح.");
  }
  return {
    image,
    imageVisible: cleanEnabled(category?.imageVisible),
    id: cleanId(category?.id, "معرّف القسم"),
    titleAr: cleanText(category?.titleAr, "اسم القسم بالعربية"),
    titleEn: cleanText(category?.titleEn, "اسم القسم بالإنجليزية"),
    enabled: cleanEnabled(category?.enabled),
    items,
  };
};

const cleanCategories = (categories, label) => {
  if (!Array.isArray(categories) || categories.length > 50) throw new Error(`${label} غير صالح.`);
  const ids = new Set();
  const cleaned = categories.map(cleanCategory);
  for (const category of cleaned) {
    if (ids.has(category.id)) throw new Error(`معرّف القسم مكرر: ${category.id}`);
    ids.add(category.id);
  }
  return cleaned;
};

export const validateMenu = (menu) => ({
  version: 1,
  food: cleanCategories(menu?.food, "منيو الطعام"),
  cafe: cleanCategories(menu?.cafe, "منيو الكافيه"),
});

export const validatePromotions = (promotions) => {
  if (!Array.isArray(promotions?.items) || promotions.items.length > 30) throw new Error("قائمة المنشورات غير صالحة.");
  const ids = new Set();

  const items = promotions.items.map((promotion) => {
    const id = cleanId(promotion?.id, "معرّف المنشور");
    if (ids.has(id)) throw new Error(`معرّف المنشور مكرر: ${id}`);
    ids.add(id);

    const postUrl = cleanText(promotion?.postUrl, "رابط المنشور", 500);
    let parsedUrl;
    try {
      parsedUrl = new URL(postUrl);
    } catch {
      throw new Error("رابط منشور فيسبوك غير صالح.");
    }
    if (
      parsedUrl.protocol !== "https:" ||
      (parsedUrl.hostname !== "facebook.com" && !parsedUrl.hostname.endsWith(".facebook.com"))
    ) {
      throw new Error("يجب استخدام رابط منشور Facebook صالح.");
    }

    const image = cleanText(promotion?.image, "صورة المنشور", 180);
    if (!IMAGE_PATTERN.test(image)) throw new Error("مسار صورة المنشور غير صالح.");

    return {
      id,
      image,
      titleAr: cleanText(promotion?.titleAr, "عنوان المنشور بالعربية"),
      titleEn: cleanText(promotion?.titleEn || promotion?.titleAr, "عنوان المنشور بالإنجليزية"),
      captionAr: cleanText(promotion?.captionAr, "وصف المنشور بالعربية", 300),
      captionEn: cleanText(promotion?.captionEn || promotion?.captionAr, "وصف المنشور بالإنجليزية", 300),
      postUrl,
      enabled: cleanEnabled(promotion?.enabled),
    };
  });

  return { version: 1, items };
};

export const validateImages = (images) => {
  if (images == null) return [];
  if (!Array.isArray(images) || images.length > 8) throw new Error("عدد الصور المرفوعة في عملية واحدة كبير جداً.");

  let totalBytes = 0;
  return images.map((image) => {
    if (typeof image?.path !== "string" || !/^public\/(?:promotions|categories)\/[a-z0-9._-]+\.(jpg|jpeg|png|webp)$/i.test(image.path)) {
      throw new Error("مسار الصورة المرفوعة غير صالح.");
    }
    if (typeof image?.contentBase64 !== "string" || !/^[A-Za-z0-9+/=]+$/.test(image.contentBase64)) {
      throw new Error("بيانات الصورة غير صالحة.");
    }
    const size = Buffer.byteLength(image.contentBase64, "base64");
    totalBytes += size;
    if (size > 1_800_000) throw new Error("حجم الصورة يجب ألا يتجاوز 1.8 ميجابايت.");
    if (totalBytes > 2_500_000) throw new Error("إجمالي حجم الصور في عملية الحفظ كبير جداً.");
    return { path: image.path, contentBase64: image.contentBase64 };
  });
};
