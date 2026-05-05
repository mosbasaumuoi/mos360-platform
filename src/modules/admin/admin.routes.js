import { authMiddleware } from "../../middleware/auth.middleware.js";
import { adminOnly } from "../auth/admin.guard.js";

export async function handleAdmin(request, env, ctx) {

  // 🔐 AUTH
  const authResult = await authMiddleware(request, env);

  if (!authResult.ok) {
    return new Response(JSON.stringify(authResult), {
      status: 401,
      headers: { "Content-Type": "application/json" }
    });
  }

  request.user = authResult.user;

  // 🔐 ADMIN GUARD
  const guard = await adminOnly(request);

  if (guard instanceof Response) {
    return guard;
  }

  // =============================
  // 📊 ANALYTICS
  // =============================
  const url = new URL(request.url);

  if (url.pathname === "/api/admin/analytics") {

    const keys = ["zalo", "facebook", "messenger"];
    const result = {};

    for (const key of keys) {
      const value = await env.MOS360_TRACKING.get(key);
      result[key] = value ? parseInt(value) : 0;
    }

    return new Response(JSON.stringify({
      ok: true,
      data: result
    }), {
      headers: { "Content-Type": "application/json" }
    });
  }

  return new Response(JSON.stringify({
    ok: true,
    message: "Admin OK"
  }));
}
