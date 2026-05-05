import { handleAuth } from "../modules/auth/auth.routes.js";
import { handleAdmin } from "../modules/admin/admin.routes.js";
import { handleCourses } from "../modules/courses/courses.routes.js";
import { handlePublic } from "../modules/public/public.routes.js";

// =============================
// 🧠 ROUTE TABLE (O(1))
// =============================
const routes = new Map([
  // AUTH
  ["POST:/api/auth/login", handleAuth],
  ["GET:/api/auth/me", handleAuth],

  // ADMIN
  ["GET:/api/admin/analytics", handleAdmin],

  // COURSES
  ["GET:/api/courses", handleCourses],

  // PUBLIC
  ["GET:/api/public/track", handlePublic],
]);

// =============================
// 🚀 MAIN ROUTER
// =============================
export async function router(request, env, ctx, runtime) {
  const url = new URL(request.url);
  const pathname = url.pathname;
  const method = request.method;

  const key = `${method}:${pathname}`;
  const handler = routes.get(key);

  if (!handler) {
    return new Response(
      JSON.stringify({
        ok: false,
        message: "Not Found",
      }),
      {
        status: 404,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  try {
    return await handler(request, env, ctx, runtime);
  } catch (err) {
    console.error("ROUTER ERROR:", err);

    return new Response(
      JSON.stringify({
        ok: false,
        message: "Internal Server Error",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
