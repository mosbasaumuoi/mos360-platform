import { router } from "./gateway/router.js";
import { authMiddleware } from "./middleware/auth.middleware.js";
import { createRuntimeContext } from "./runtime/runtimeContext.js";
import { registerTrackingEvents } from "./events/tracking.event.js";

export default {
  async fetch(request, env, ctx) {

    const runtime = createRuntimeContext(request, env);
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
      pathname.startsWith("/api/auth") ||
      pathname.startsWith("/debug");

    // =============================
    // 🚀 ROUTER
    // =============================
    return router(request, env, ctx, runtime);
  },
};
