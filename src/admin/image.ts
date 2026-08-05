import type { PendingImage } from "./types";

const readAsDataUrl = (blob: Blob) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error("تعذر قراءة الصورة."));
    reader.readAsDataURL(blob);
  });

export const preparePromotionImage = async (file: File, promotionId: string): Promise<PendingImage> => {
  if (!file.type.startsWith("image/")) throw new Error("الملف المحدد ليس صورة.");
  if (file.size > 10_000_000) throw new Error("حجم الصورة الأصلية كبير جداً.");

  const bitmap = await createImageBitmap(file);
  const maximumDimension = 1600;
  const scale = Math.min(1, maximumDimension / Math.max(bitmap.width, bitmap.height));
  const width = Math.max(1, Math.round(bitmap.width * scale));
  const height = Math.max(1, Math.round(bitmap.height * scale));
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext("2d");
  if (!context) throw new Error("تعذر تجهيز الصورة.");
  context.drawImage(bitmap, 0, 0, width, height);
  bitmap.close();

  const optimized = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob((blob) => (blob ? resolve(blob) : reject(new Error("تعذر ضغط الصورة."))), "image/webp", 0.84);
  });
  if (optimized.size > 1_800_000) throw new Error("الصورة ما زالت أكبر من الحد المسموح بعد الضغط.");

  const dataUrl = await readAsDataUrl(optimized);
  const safeId = promotionId.toLowerCase().replace(/[^a-z0-9._-]/g, "-").slice(0, 50) || "promotion";
  const filename = `${safeId}-${Date.now()}.webp`;
  return {
    path: `public/promotions/${filename}`,
    publicPath: `/promotions/${filename}`,
    contentBase64: dataUrl.split(",")[1],
    previewUrl: dataUrl,
  };
};

