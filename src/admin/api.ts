import type { AdminContentResponse, AdminMenuContent, AdminPromotionsContent } from "./types";

interface ApiErrorBody {
  error?: string;
}

const request = async <T>(url: string, options: RequestInit = {}): Promise<T> => {
  const response = await fetch(url, {
    credentials: "same-origin",
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  if (response.status === 429) {
    throw new Error("طلبات كثيرة. يرجى الانتظار حتى عشر دقائق قبل إعادة محاولة الدخول.");
  }

  const body = (await response.json().catch(() => ({}))) as T & ApiErrorBody;
  if (!response.ok) throw new Error(body.error || "تعذر الاتصال بالخادم.");
  return body;
};

export const getAdminSession = () =>
  request<{ authenticated: boolean; username: string | null }>("/api/admin/session", { method: "GET" });

export const loginAdmin = (password: string) =>
  request<{ authenticated: boolean; username: string }>("/api/admin/login", {
    method: "POST",
    body: JSON.stringify({ password }),
  });

export const logoutAdmin = () =>
  request<{ authenticated: boolean }>("/api/admin/logout", { method: "POST", body: "{}" });

export const loadAdminContent = () => request<AdminContentResponse>("/api/admin/content", { method: "GET" });

export const publishAdminContent = (payload: {
  baseSha: string;
  menu: AdminMenuContent;
  promotions: AdminPromotionsContent;
  images: Array<{ path: string; contentBase64: string }>;
}) =>
  request<{ commitSha: string }>("/api/admin/publish", {
    method: "POST",
    body: JSON.stringify(payload),
  });
