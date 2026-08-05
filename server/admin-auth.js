import { createHmac, scryptSync, timingSafeEqual } from "node:crypto";

const COOKIE_NAME = "bh_admin_session";
const SESSION_DURATION_SECONDS = 8 * 60 * 60;

const encode = (value) => Buffer.from(value).toString("base64url");
const sign = (value, secret) => createHmac("sha256", secret).update(value).digest("base64url");

const getSecret = () => {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret || secret.length < 32) {
    throw new Error("ADMIN_SESSION_SECRET is missing or too short.");
  }
  return secret;
};

const parseCookies = (header = "") =>
  Object.fromEntries(
    header
      .split(";")
      .map((part) => part.trim())
      .filter(Boolean)
      .map((part) => {
        const separator = part.indexOf("=");
        return separator === -1
          ? [part, ""]
          : [decodeURIComponent(part.slice(0, separator)), decodeURIComponent(part.slice(separator + 1))];
      }),
  );

export const verifyPassword = (password) => {
  const stored = process.env.ADMIN_PASSWORD_HASH || "";
  const [algorithm, salt, expectedHex] = stored.split("$");
  if (algorithm !== "scrypt" || !salt || !expectedHex) return false;

  const expected = Buffer.from(expectedHex, "hex");
  const actual = scryptSync(password, salt, expected.length);
  return expected.length === actual.length && timingSafeEqual(expected, actual);
};

export const createSessionCookie = (username) => {
  const payload = encode(
    JSON.stringify({
      username,
      expiresAt: Date.now() + SESSION_DURATION_SECONDS * 1000,
    }),
  );
  const token = `${payload}.${sign(payload, getSecret())}`;
  const secure = process.env.VERCEL || process.env.NODE_ENV === "production" ? "; Secure" : "";
  return `${COOKIE_NAME}=${encodeURIComponent(token)}; Path=/; HttpOnly; SameSite=Strict; Max-Age=${SESSION_DURATION_SECONDS}${secure}`;
};

export const clearSessionCookie = () => {
  const secure = process.env.VERCEL || process.env.NODE_ENV === "production" ? "; Secure" : "";
  return `${COOKIE_NAME}=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0${secure}`;
};

export const getSession = (request) => {
  try {
    const token = parseCookies(request.headers.cookie || "")[COOKIE_NAME];
    if (!token) return null;
    const [payload, signature] = token.split(".");
    if (!payload || !signature) return null;

    const expected = sign(payload, getSecret());
    const signatureBuffer = Buffer.from(signature);
    const expectedBuffer = Buffer.from(expected);
    if (signatureBuffer.length !== expectedBuffer.length || !timingSafeEqual(signatureBuffer, expectedBuffer)) return null;

    const session = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
    if (!session.username || !session.expiresAt || session.expiresAt <= Date.now()) return null;
    return session;
  } catch {
    return null;
  }
};

export const requireAdmin = (request, response) => {
  const session = getSession(request);
  if (!session) {
    response.status(401).json({ error: "يجب تسجيل الدخول أولاً." });
    return null;
  }
  return session;
};

export const isAllowedOrigin = (request) => {
  const origin = request.headers.origin;
  if (!origin) return true;

  const configuredOrigin = process.env.ADMIN_ALLOWED_ORIGIN;
  if (configuredOrigin) return origin === configuredOrigin;

  try {
    return new URL(origin).host === request.headers.host;
  } catch {
    return false;
  }
};

