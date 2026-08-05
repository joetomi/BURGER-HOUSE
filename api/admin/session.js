import { getSession } from "../../server/admin-auth.js";

export default function handler(request, response) {
  response.setHeader("Cache-Control", "no-store");
  if (request.method !== "GET") return response.status(405).json({ error: "Method not allowed." });
  const session = getSession(request);
  return response.status(200).json({ authenticated: Boolean(session), username: session?.username || null });
}

