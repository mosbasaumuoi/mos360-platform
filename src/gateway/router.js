import { handleAuth } from "../modules/auth/auth.routes.js";
import { handleCourses } from "../modules/courses/courses.routes.js";
import { handleAdmin } from "../modules/admin/admin.routes.js";
import { trackClick } from "../services/tracking.service.js";

export async function router(request, env, ctx, runtime) {

  const url = new URL(request.url);
  const pathname = url.pathname;

  // =============================
  // ⚡ DEBUG RUNTIME
  // =============================
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
        "Cache-Control": "no-store"
      },
    });
  }

  // =============================
  // ⚡ DEBUG CACHE
  // =============================
  if (pathname === "/debug/cache") {
    return new Response(JSON.stringify({
      ok: true,
      stats: runtime.cache.stats(),
    }), {
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store"
      },
    });
  }

  // =============================
  // 📊 DEBUG ANALYTICS
  // =============================
  if (pathname === "/debug/analytics") {

    const date = new Date().toISOString().slice(0, 10);

    const keys = ["zalo", "facebook", "messenger"];
    const result = {};

    for (const source of keys) {
      const key = `track:${date}:${source}`;

      const value = await env.MOS360_TRACKING.get(key);
      result[source] = value ? parseInt(value) : 0;
}

  // =============================
  // 📈 TRACK CLICK (PUBLIC)
  // =============================
if (pathname === "/api/public/track") {

  const source = url.searchParams.get("source") || "unknown";

  const result = await trackClick(runtime, source);

  return new Response(JSON.stringify({
    ok: true,
    ...result
  }), {
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-store"
    },
  });
}

  // =============================
  // 📦 PUBLIC COURSES API
  // =============================
  if (pathname === "/api/public/courses") {
    return handleCourses(request, env, ctx);
  }

  // =============================
  // 🔐 AUTH
  // =============================
  if (pathname.startsWith("/api/auth")) {
    return handleAuth(request, env, ctx);
  }

  // =============================
  // 🎓 COURSES (PROTECTED)
  // =============================
  if (pathname.startsWith("/api/courses")) {
    return handleCourses(request, env, ctx);
  }

  // =============================
  // 🛠 ADMIN
  // =============================
  if (pathname.startsWith("/api/admin")) {
    return handleAdmin(request, env, ctx);
  }

  // =============================
  // ❌ NOT FOUND
  // =============================
  return new Response("Not Found", {
    status: 404,
  });
}
