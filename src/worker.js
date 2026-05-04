import { router } from "./gateway/router.js";
import { authMiddleware } from "./middleware/auth.middleware.js";
import { createRuntimeContext } from "./runtime/runtimeContext.js";
import { registerTrackingEvents } from "./events/tracking.event.js";

export default {
  async fetch(request, env, ctx) {

    const runtime = createRuntimeContext(env);
    const url = new URL(request.url);
    const pathname = url.pathname;

    // 🔥 register event
    registerTrackingEvents(runtime);

    // =============================
    // 🔐 AUTH CONTROL (CHUẨN)
    // =============================

    const isApi = pathname.startsWith("/api");
    const isPublicApi =
      pathname.startsWith("/api/public") ||
      pathname.startsWith("/debug");

    if (isApi && !isPublicApi) {

      const authResult = await authMiddleware(request, env);

      if (!authResult.ok) {
        return new Response(JSON.stringify(authResult), {
          status: 401,
          headers: {
            "Content-Type": "application/json",
          },
        });
      }

      request.user = authResult.user;
    }

    // =============================
    // 🚀 ROUTER
    // =============================
    return router(request, env, ctx, runtime);
  },
};
