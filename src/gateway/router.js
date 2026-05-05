import { handleAuth } from "../modules/auth/auth.routes.js";
import { handleAdmin } from "../modules/admin/admin.routes.js";
import { json } from "../utils/response.js";

export async function router(request, env, ctx, runtime) {
  const url = new URL(request.url);
  const pathname = url.pathname;

  try {
    // =============================
    // 🔐 AUTH
    // =============================
    if (pathname.startsWith("/api/auth")) {
      return handleAuth(request, env);
    }

    // =============================
    // 👑 ADMIN
    // =============================
    if (pathname.startsWith("/api/admin")) {
      return handleAdmin(request, env, ctx);
    }

    // =============================
    // 🌍 PUBLIC TRACKING
    // =============================
    if (pathname.startsWith("/api/public/track")) {
      const source = url.searchParams.get("source");

      if (!source) {
        return json({ message: "Missing source" }, 400);
      }

      const current = await env.MOS360_TRACKING.get(source);
      const next = (parseInt(current || "0") + 1).toString();

      await env.MOS360_TRACKING.put(source, next);

      return json({ source, value: next });
    }

    // =============================
    // ❌ NOT FOUND
    // =============================
    return json({ message: "Not Found" }, 404);

  } catch (err) {
    console.error("Router error:", err);
    return json({ message: "Internal Server Error" }, 500);
  }
}
