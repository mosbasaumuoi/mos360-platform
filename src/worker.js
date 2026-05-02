import { router } from "./gateway/router.js";
import { authMiddleware } from "./middleware/auth.middleware.js";
import { createRuntimeContext } from "./runtime/runtimeContext.js";

export default {
  async fetch(request, env, ctx) {

    // ⚡ Runtime Layer
    const runtime = createRuntimeContext(env);

    // ⚡ Cache Test
    runtime.cache.set("test", "MOS360");

 console.log("Cache test:", runtime.cache.get("test"));

    // ⚡ Event Bus Test
    runtime.events.on("student.login", (payload) => {
      console.log("Student login:", payload.name);
    });

    runtime.events.emit("student.login", {
      name: "MOS Student",
    });

    // 🧭 Middleware
    const authResult = await authMiddleware(request, env);

    // ❌ Block unauthorized
    if (!authResult.ok) {
      return new Response(JSON.stringify(authResult), {
        status: 401,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    // ✅ Attach user
    request.user = authResult.user;

    // 🚀 Continue Gateway Router
    return router(request, env, ctx, runtime);
  },
};
