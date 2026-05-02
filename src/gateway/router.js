import { handleAuth } from "../modules/auth/auth.routes.js";
import { handleCourses } from "../modules/courses/courses.routes.js";
import { handleAdmin } from "../modules/admin/admin.routes.js";

export async function router(request, env, ctx, runtime) {
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
if (pathname === "/debug/runtime") {

  runtime.cache.set("hello", "MOS360 Runtime");

  runtime.events.emit("debug.test", {
    time: Date.now(),
  });

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
