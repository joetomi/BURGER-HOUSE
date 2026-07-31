export interface MenuItem {
  id: string;
  nameAr: string;
  nameEn: string;
  price: number;
}

export interface MenuCategory {
  id: string;
  titleEn: string;
  titleAr: string;
  items: MenuItem[];
}

export const MENU_DATA: MenuCategory[] = [
  {
    id: "burgers",
    titleEn: "Burgers",
    titleAr: "برجر",
    items: [
      { id: "b1", nameAr: "كلاسيك برجر", nameEn: "Classic Burger", price: 12 },
      { id: "b2", nameAr: "تشكن برجر", nameEn: "Chicken Burger", price: 11 },
      { id: "b3", nameAr: "زنجر برجر", nameEn: "Zinger Burger", price: 12 },
      { id: "b4", nameAr: "عربي برجر", nameEn: "Arabi Burger", price: 14 },
      { id: "b5", nameAr: "تشيز برجر", nameEn: "Cheese Burger", price: 15 },
      { id: "b6", nameAr: "هالبينو برجر", nameEn: "Jalapeno Burger", price: 13 },
      { id: "b7", nameAr: "باربكيو برجر", nameEn: "BBQ Burger", price: 14 },
      { id: "b8", nameAr: "ستيك لحم برجر", nameEn: "Beef Steak Burger", price: 17 },
      { id: "b9", nameAr: "ستيك دجاج برجر", nameEn: "Chicken Steak Burger", price: 16 },
      { id: "b10", nameAr: "شرمب برجر", nameEn: "Shrimp Burger", price: 18 },
      { id: "b11", nameAr: "شوفان لحم برجر", nameEn: "Oat Beef Burger", price: 13 },
      { id: "b12", nameAr: "شوفان دجاج برجر", nameEn: "Oat Chicken Burger", price: 12 },
      { id: "b13", nameAr: "فلات برجر", nameEn: "Flat Burger", price: 11 },
      { id: "b14", nameAr: "تشكن فيليه برجر", nameEn: "Chicken Fillet Burger", price: 13 },
    ],
  },
  {
    id: "sandwiches",
    titleEn: "Sandwiches & Wraps",
    titleAr: "ساندوتشات راب",
    items: [
      { id: "s1", nameAr: "ساندوتش دجاج", nameEn: "Chicken Sandwich", price: 13 },
      { id: "s2", nameAr: "فاهيتا دجاج", nameEn: "Chicken Fajita", price: 12 },
      { id: "s3", nameAr: "مسحب", nameEn: "Musahhab", price: 14 },
      { id: "s4", nameAr: "تشيز ستيك", nameEn: "Cheese Steak", price: 20 },
      { id: "s5", nameAr: "تشكن لودر", nameEn: "Chicken Loader", price: 20 },
      { id: "s6", nameAr: "تشكن راب", nameEn: "Chicken Wrap", price: 15 },
      { id: "s7", nameAr: "شيلي راب", nameEn: "Chili Wrap", price: 20 },
      { id: "s8", nameAr: "زنجر راب", nameEn: "Zinger Wrap", price: 14 },
      { id: "s9", nameAr: "كاساديا لحم", nameEn: "Beef Quesadilla", price: 22 },
      { id: "s10", nameAr: "تشكن دايت", nameEn: "Diet Chicken", price: 12 },
    ],
  },
  {
    id: "meals",
    titleEn: "Meals & Loaded Fries",
    titleAr: "وجبات",
    items: [
      { id: "m1", nameAr: "وجبة شيش طاووق", nameEn: "Shish Taouk Meal", price: 27 },
      { id: "m2", nameAr: "وجبة تشكن فيليه", nameEn: "Chicken Fillet Meal", price: 27 },
      { id: "m3", nameAr: "وجبة كفتة", nameEn: "Kofta Meal", price: 30 },
      { id: "m4", nameAr: "وجبة مسحب", nameEn: "Musahhab Meal", price: 30 },
      { id: "m5", nameAr: "تشيز فرايز", nameEn: "Cheese Fries", price: 25 },
      { id: "m6", nameAr: "تشكن تشيز فرايز", nameEn: "Chicken Cheese Fries", price: 30 },
    ],
  },
  {
    id: "sides",
    titleEn: "Sides & Extras",
    titleAr: "المقبلات",
    items: [
      { id: "sd1", nameAr: "بطاطا", nameEn: "Fries", price: 4 },
      { id: "sd2", nameAr: "حلقات بصل", nameEn: "Onion Rings", price: 5 },
      { id: "sd3", nameAr: "أصابع جبنة", nameEn: "Mozzarella Sticks", price: 7 },
      { id: "sd4", nameAr: "صوص", nameEn: "Sauce", price: 2 },
    ],
  },
  {
    id: "drinks",
    titleEn: "Beverages",
    titleAr: "المشروبات",
    items: [
      { id: "d1", nameAr: "ماء", nameEn: "Water", price: 1 },
      { id: "d2", nameAr: "مشروب غازي", nameEn: "Soft Drink", price: 3 },
      { id: "d3", nameAr: "عصير", nameEn: "Juice", price: 4 },
      { id: "d4", nameAr: "سن توب", nameEn: "Sun Top", price: 3 },
    ],
  },
];
