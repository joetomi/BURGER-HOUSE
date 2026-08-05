import { createSessionCookie, isAllowedOrigin, verifyPassword } from "../../server/admin-auth.js";

const attempts = new Map();

export default async function handler(request, response) {
  response.setHeader("Cache-Control", "no-store");
  if (request.method !== "POST") return response.status(405).json({ error: "Method not allowed." });
  if (!isAllowedOrigin(request)) return response.status(403).json({ error: "الطلب غير مسموح." });

  const ip = request.headers["x-forwarded-for"]?.split(",")[0]?.trim() || request.socket?.remoteAddress || "unknown";
  const state = attempts.get(ip) || { count: 0, blockedUntil: 0 };
  if (state.blockedUntil > Date.now()) return response.status(429).json({ error: "محاولات كثيرة. حاول لاحقاً." });

  const username = String(request.body?.username || "").trim();
  const password = String(request.body?.password || "");
  const expectedUsername = process.env.ADMIN_USERNAME;

  if (!expectedUsername || !process.env.ADMIN_PASSWORD_HASH || !process.env.ADMIN_SESSION_SECRET) {
    return response.status(503).json({ error: "لم يتم إعداد حساب الإدارة في Vercel بعد." });
  }

  if (username !== expectedUsername || !verifyPassword(password)) {
    state.count += 1;
    state.blockedUntil = state.count >= 5 ? Date.now() + 15 * 60 * 1000 : 0;
    attempts.set(ip, state);
    await new Promise((resolve) => setTimeout(resolve, 500));
    return response.status(401).json({ error: "اسم المستخدم أو كلمة المرور غير صحيحة." });
  }

  attempts.delete(ip);
  response.setHeader("Set-Cookie", createSessionCookie(username));
  return response.status(200).json({ authenticated: true, username });
}

