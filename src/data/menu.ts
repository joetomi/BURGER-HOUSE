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

export const CAFE_MENU_DATA: MenuCategory[] = [
  {
    id: "hot-coffee",
    titleEn: "Hot Coffee",
    titleAr: "قهوة ساخنة",
    items: [
      { id: "hc1", nameAr: "إسبريسو", nameEn: "Espresso", price: 6 },
      { id: "hc2", nameAr: "دبل إسبريسو", nameEn: "Double Espresso", price: 8 },
      { id: "hc3", nameAr: "أمريكانو", nameEn: "Americano", price: 7 },
      { id: "hc4", nameAr: "كابتشينو", nameEn: "Cappuccino", price: 10 },
      { id: "hc5", nameAr: "كافيه لاتيه", nameEn: "Café Latte", price: 11 },
      { id: "hc6", nameAr: "فلات وايت", nameEn: "Flat White", price: 11 },
      { id: "hc7", nameAr: "سبانيش لاتيه", nameEn: "Spanish Latte", price: 13 },
      { id: "hc8", nameAr: "موكا", nameEn: "Mocha", price: 12 },
    ],
  },
  {
    id: "iced-coffee",
    titleEn: "Iced Coffee",
    titleAr: "قهوة باردة",
    items: [
      { id: "ic1", nameAr: "آيس أمريكانو", nameEn: "Iced Americano", price: 9 },
      { id: "ic2", nameAr: "آيس لاتيه", nameEn: "Iced Latte", price: 12 },
      { id: "ic3", nameAr: "آيس سبانيش لاتيه", nameEn: "Iced Spanish Latte", price: 14 },
      { id: "ic4", nameAr: "آيس موكا", nameEn: "Iced Mocha", price: 13 },
      { id: "ic5", nameAr: "كولد برو", nameEn: "Cold Brew", price: 13 },
      { id: "ic6", nameAr: "أفوجاتو", nameEn: "Affogato", price: 12 },
    ],
  },
  {
    id: "fresh-juices",
    titleEn: "Fresh Juices",
    titleAr: "عصائر طبيعية",
    items: [
      { id: "fj1", nameAr: "برتقال طبيعي", nameEn: "Fresh Orange", price: 10 },
      { id: "fj2", nameAr: "ليمون ونعناع", nameEn: "Lemon & Mint", price: 9 },
      { id: "fj3", nameAr: "مانجو", nameEn: "Mango", price: 12 },
      { id: "fj4", nameAr: "فراولة", nameEn: "Strawberry", price: 12 },
      { id: "fj5", nameAr: "بطيخ", nameEn: "Watermelon", price: 10 },
      { id: "fj6", nameAr: "توت مشكل", nameEn: "Mixed Berries", price: 14 },
      { id: "fj7", nameAr: "كوكتيل طبيعي", nameEn: "Fresh Cocktail", price: 14 },
    ],
  },
  {
    id: "milkshakes",
    titleEn: "Milkshakes",
    titleAr: "ميلك شيك",
    items: [
      { id: "ms1", nameAr: "فانيليا", nameEn: "Vanilla", price: 13 },
      { id: "ms2", nameAr: "شوكولاتة", nameEn: "Chocolate", price: 14 },
      { id: "ms3", nameAr: "أوريو", nameEn: "Oreo", price: 16 },
      { id: "ms4", nameAr: "لوتس", nameEn: "Lotus", price: 17 },
      { id: "ms5", nameAr: "فراولة", nameEn: "Strawberry", price: 15 },
    ],
  },
];
