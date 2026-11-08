import { createHmac } from "node:crypto";
import { createSessionCookie, isAllowedOrigin, verifyPassword } from "../../server/admin-auth.js";

const auditLogin = (request, outcome) => {
  const ip = request.headers["x-forwarded-for"]?.split(",")[0]?.trim() || request.socket?.remoteAddress || "unknown";
  const client = createHmac("sha256", process.env.ADMIN_SESSION_SECRET).update(ip).digest("hex").slice(0, 24);
  const event = { event: "admin_login", outcome, client, time: new Date().toISOString() };
  if (outcome === "success") console.info(JSON.stringify(event));
  else console.warn(JSON.stringify(event));
};

export default async function handler(request, response) {
  response.setHeader("Cache-Control", "no-store");
  if (request.method !== "POST") return response.status(405).json({ error: "Method not allowed." });
  if (!isAllowedOrigin(request)) return response.status(403).json({ error: "الطلب غير مسموح." });

  const password = typeof request.body?.password === "string" ? request.body.password : "";

  if (!process.env.ADMIN_PASSWORD_HASH || !process.env.ADMIN_SESSION_SECRET) {
    return response.status(503).json({ error: "حساب الإدارة غير متاح حالياً. حاول لاحقاً." });
  }

  if (!password || password.length > 1024 || !verifyPassword(password)) {
    auditLogin(request, "failure");
    return response.status(401).json({ error: "رمز الدخول غير صحيح." });
  }

  auditLogin(request, "success");
  response.setHeader("Set-Cookie", createSessionCookie("admin"));
  return response.status(200).json({ authenticated: true, username: "admin" });
}
