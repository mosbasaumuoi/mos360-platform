import { router } from "./gateway/router.js";
import { authMiddleware } from "./middleware/auth.middleware.js";
import { createRuntimeContext } from "./runtime/runtimeContext.js";

export default {
  async fetch(request, env, ctx) {

    // ⚡ Runtime Layer (đúng chuẩn)
    const runtime = createRuntimeContext(request, env);

    const pathname = new URL(request.url).pathname;

    // ⚡ PUBLIC ROUTES (bypass auth)
    const publicRoutes = [
      "/",
      "/debug/runtime",
      "/debug/cache",
      "/debug/analytics",
      "/api/public/courses",
      "/api/public/track"
    ];

    if (!publicRoutes.includes(pathname)) {

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

    // 🚀 Router
    return router(request, env, ctx, runtime);
  },
};
