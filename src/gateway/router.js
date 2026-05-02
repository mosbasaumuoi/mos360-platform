import { handleAuth } from "../modules/auth/auth.routes.js";
import { handleCourses } from "../modules/courses/courses.routes.js";
import { handleAdmin } from "../modules/admin/admin.routes.js";

export async function router(request, env, ctx, runtime) {

  const url = new URL(request.url);
  const pathname = url.pathname;

  // ⚡ DEBUG RUNTIME
  if (pathname === "/debug/runtime") {

    runtime.cache.set("hello", "MOS360 Runtime");

    runtime.events.emit("debug.test", {
      time: Date.now(),
    });
// ⚡ DEBUG CACHE
    if (pathname === "/debug/cache") {

  return new Response(JSON.stringify({
    ok: true,
    stats: runtime.cache.stats(),
  }), {
    headers: {
      "Content-Type": "application/json",
    },
  });
}
    return new Response(JSON.stringify({
      ok: true,
      cache: runtime.cache.get("hello"),
      eventBus: "working",
    }), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  // AUTH
  if (pathname.startsWith("/api/auth")) {
    return handleAuth(request, env, ctx);
  }

  // COURSES
  if (pathname.startsWith("/api/courses")) {
    return handleCourses(request, env, ctx);
  }

  // ADMIN
  if (pathname.startsWith("/api/admin")) {
    return handleAdmin(request, env, ctx);
  }

  return new Response("Not Found", {
    status: 404,
  });
}
