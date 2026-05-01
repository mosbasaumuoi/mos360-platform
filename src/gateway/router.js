import { handleCourses } from "../modules/courses/courses.routes.js";
import { handleAuth } from "../modules/auth/auth.routes.js";
import { handleAdmin } from "../modules/admin/admin.routes.js";

export async function router(request, env, ctx) {
  const url = new URL(request.url);
  const path = url.pathname;

  // COURSES
  if (path.startsWith("/api/courses")) {
    return handleCourses(request, env, ctx);
  }

  // AUTH
  if (path.startsWith("/api/auth")) {
    return handleAuth(request, env, ctx);
  }

  // ADMIN
  if (path.startsWith("/api/admin")) {
    return handleAdmin(request, env, ctx);
  }

  return new Response("Not Found", { status: 404 });
}
