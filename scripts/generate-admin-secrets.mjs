import { randomBytes, scryptSync } from "node:crypto";

const password = process.argv[2];
if (!password || password.length < 10) {
  console.error("Usage: node scripts/generate-admin-secrets.mjs \"a-strong-password\"");
  console.error("Password must contain at least 10 characters.");
  process.exit(1);
}

const salt = randomBytes(16).toString("hex");
const passwordHash = scryptSync(password, salt, 64).toString("hex");
console.log(`ADMIN_PASSWORD_HASH=scrypt$${salt}$${passwordHash}`);
console.log(`ADMIN_SESSION_SECRET=${randomBytes(48).toString("base64url")}`);

