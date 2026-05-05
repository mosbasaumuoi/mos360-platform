import { handleAuth } from "../modules/auth/auth.routes.js";
import { handleCourses } from "../modules/courses/courses.routes.js";
import { handleAdmin } from "../modules/admin/admin.routes.js";

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
  // 📊 DEBUG ANALYTICS (THEO NGÀY)
  // =============================
  if (pathname === "/debug/analytics") {

    const date = new Date().toISOString().slice(0, 10);

    const sources = ["zalo", "facebook", "messenger"];
    const result = {};

    let total = 0;

    for (const source of sources) {
      const key = `track:${date}:${source}`;

      const value = await env.MOS360_TRACKING.get(key);
      const count = value ? parseInt(value) : 0;

      result[source] = count;
      total += count;
    }

    return new Response(JSON.stringify({
      ok: true,
      date,
      data: result,
      total
    }), {
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store"
      },
    });
  }

  // =============================
  // 📈 TRACK CLICK (PUBLIC)
  // =============================
if (pathname === "/api/public/track") {

  const source = url.searchParams.get("source") || "unknown";

  await runtime.events.emit("track.click", {
    source
  });

  return new Response(JSON.stringify({
    ok: true,
    source
  }), {
    headers: {
      "Content-Type": "application/json"
    }
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
