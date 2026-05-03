import { handleAuth } from "../modules/auth/auth.routes.js";
import { handleCourses } from "../modules/courses/courses.routes.js";
import { handleAdmin } from "../modules/admin/admin.routes.js";

import { indexHTML } from "../static/index.js";

export async function router(request, env, ctx, runtime) {

  const url = new URL(request.url);
  const pathname = url.pathname;

  // =============================
  // 🏠 FRONTEND (STATIC HTML)
  // =============================
  if (pathname === "/") {
    return new Response(indexHTML, {
      headers: {
        "Content-Type": "text/html; charset=UTF-8",
        "Cache-Control": "no-store"
      }
    });
  }

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
      },
    });
  }

  // =============================
  // 📊 DEBUG ANALYTICS
  // =============================
  if (pathname === "/debug/analytics") {

    const keys = ["zalo", "facebook", "messenger"];
    const result = {};

    for (const key of keys) {
      const value = await env.MOS360_TRACKING.get(key);
      result[key] = value ? parseInt(value) : 0;
    }

    return new Response(JSON.stringify({
      ok: true,
      data: result,
    }), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  // =============================
  // 📈 TRACK CLICK (PUBLIC)
  // =============================
  if (pathname === "/api/public/track") {

    const source = url.searchParams.get("source") || "unknown";

    const current = await env.MOS360_TRACKING.get(source);
    const count = current ? parseInt(current) : 0;

    await env.MOS360_TRACKING.put(source, String(count + 1));

    console.log("TRACK:", source, count + 1);

    return new Response(JSON.stringify({
      ok: true,
      source,
      count: count + 1
    }), {
      headers: {
        "Content-Type": "application/json",
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
