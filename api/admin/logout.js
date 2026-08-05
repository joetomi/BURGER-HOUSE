import { clearSessionCookie, isAllowedOrigin } from "../../server/admin-auth.js";

export default function handler(request, response) {
  response.setHeader("Cache-Control", "no-store");
  if (request.method !== "POST") return response.status(405).json({ error: "Method not allowed." });
  if (!isAllowedOrigin(request)) return response.status(403).json({ error: "الطلب غير مسموح." });
  response.setHeader("Set-Cookie", clearSessionCookie());
  return response.status(200).json({ authenticated: false });
}

