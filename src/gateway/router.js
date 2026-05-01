import { handleAuth } from "../modules/auth/auth.routes.js";
import { handleCourses } from "../modules/courses/courses.routes.js";
import { handleAdmin } from "../modules/admin/admin.routes.js";

export async function router(request, env, ctx) {
  const url = new URL(request.url);

  if (url.pathname.startsWith("/api/auth")) {
    return handleAuth(request, env, ctx);
  }

  if (url.pathname.startsWith("/api/courses")) {
    return handleCourses(request, env, ctx);
  }

  if (url.pathname.startsWith("/api/admin")) {
    return handleAdmin(request, env, ctx);
  }

  return new Response("Not Found", { status: 404 });
}
