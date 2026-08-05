import { requireAdmin } from "../../server/admin-auth.js";
import { loadAdminContent } from "../../server/github-content.js";

export default async function handler(request, response) {
  response.setHeader("Cache-Control", "no-store");
  if (request.method !== "GET") return response.status(405).json({ error: "Method not allowed." });
  if (!requireAdmin(request, response)) return;

  try {
    return response.status(200).json(await loadAdminContent());
  } catch (error) {
    return response.status(error.status || 500).json({ error: error.message || "تعذر تحميل محتوى الموقع." });
  }
}

