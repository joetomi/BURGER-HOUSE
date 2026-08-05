import { isAllowedOrigin, requireAdmin } from "../../server/admin-auth.js";
import { validateImages, validateMenu, validatePromotions } from "../../server/content-validation.js";
import { publishAdminContent } from "../../server/github-content.js";

export const config = { api: { bodyParser: { sizeLimit: "4mb" } } };

export default async function handler(request, response) {
  response.setHeader("Cache-Control", "no-store");
  if (request.method !== "POST") return response.status(405).json({ error: "Method not allowed." });
  if (!isAllowedOrigin(request)) return response.status(403).json({ error: "الطلب غير مسموح." });
  if (!requireAdmin(request, response)) return;

  try {
    const menu = validateMenu(request.body?.menu);
    const promotions = validatePromotions(request.body?.promotions);
    const images = validateImages(request.body?.images);
    const baseSha = String(request.body?.baseSha || "");
    if (!/^[a-f0-9]{40}$/i.test(baseSha)) return response.status(400).json({ error: "نسخة المحتوى غير صالحة." });

    return response.status(200).json(await publishAdminContent({ baseSha, menu, promotions, images }));
  } catch (error) {
    return response.status(error.status || 400).json({ error: error.message || "تعذر نشر التعديلات." });
  }
}

