import { handlePublic } from "../modules/public/public.routes.js";
import { handleAdmin } from "../modules/admin/admin.routes.js";
import { handleCourses } from "../modules/courses/courses.routes.js";
import { handleLogin, handleMe } from "../modules/auth/auth.routes.js";

const routes = new Map([
  // AUTH
  ["POST:/api/auth/login", handleLogin],
  ["GET:/api/auth/me", handleMe],

  // COURSES
  ["GET:/api/courses", handleCourses],

  // ADMIN
  ["GET:/api/admin/analytics", handleAdmin],

  // PUBLIC
  ["GET:/api/public/track", handlePublic],
]);

export async function router(request, env, ctx, runtime) {
  const url = new URL(request.url);
  const key = `${request.method}:${url.pathname}`;
  const handler = routes.get(key);

  if (!handler) {
    return new Response(JSON.stringify({
      ok: false,
      message: "Not Found"
    }), { status: 404 });
  }

  return handler(request, env, ctx, runtime);
}
