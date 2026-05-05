import { authMiddleware } from "../../middleware/auth.middleware.js";
import { adminOnly } from "../auth/admin.guard.js";
import { json } from "../../utils/response.js";

export async function handleAdmin(request, env, ctx) {

  // =============================
  // 🔐 AUTH
  // =============================
  const auth = await authMiddleware(request, env);

  if (!auth.ok) {
    return json(auth.message, 401);
  }

  request.user = auth.user;

  // =============================
  // 👑 ADMIN GUARD
  // =============================
  const guard = await adminOnly(request, env, ctx);

  if (guard instanceof Response) {
    return guard;
  }

  // =============================
  // 🎯 ROUTE HANDLER
  // =============================
  const url = new URL(request.url);
  const pathname = url.pathname;

  // 📊 ANALYTICS
  if (pathname === "/api/admin/analytics") {

    const keys = ["zalo", "facebook", "messenger"];
    const result = {};

    for (const key of keys) {
      const value = await env.MOS360_TRACKING.get(key);
      result[key] = value ? parseInt(value) : 0;
    }

    return json(result);
  }

  return json({
    message: "Admin OK",
    user: request.user
  });
}
