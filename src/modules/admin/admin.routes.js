import { use } from "../../gateway/middleware.js";
import { authMiddleware } from "../../middleware/auth.middleware.js";
import { adminOnly } from "../auth/admin.guard.js";

// =============================
// 🎯 ADMIN HANDLER
// =============================
const adminHandler = async (req, env) => {

  const url = new URL(req.url);
  const pathname = url.pathname;

  // =============================
  // 📊 ANALYTICS
  // =============================
  if (pathname === "/api/admin/analytics") {

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
      headers: {
        "Content-Type": "application/json"
      }
    });
  }

  // =============================
  // 🧪 DEFAULT ADMIN TEST
  // =============================
  return new Response(
    JSON.stringify({
      ok: true,
      message: "Admin OK",
      user: req.user,
    }),
    {
      headers: {
        "Content-Type": "application/json"
      }
    }
  );
};

// =============================
// 🔥 APPLY MIDDLEWARE CHAIN
// =============================
export const handleAdmin = use(
  [authMiddleware, adminOnly],
  adminHandler
);
