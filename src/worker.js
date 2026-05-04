import { router } from "./gateway/router.js";
import { authMiddleware } from "./middleware/auth.middleware.js";
import { createRuntimeContext } from "./runtime/runtimeContext.js";
import { registerTrackingEvents } from "./events/tracking.event.js";

export default {
  async fetch(request, env, ctx) {

    // ⚡ Runtime Layer (đúng chuẩn)
    const runtime = createRuntimeContext(request, env);

    const pathname = new URL(request.url).pathname;

   // 🔥 đăng ký event
registerTrackingEvents(runtime);   

    // ⚡ PUBLIC ROUTES (bypass auth)
const publicPrefixes = [
  "/debug",
  "/api/public"
];

// ⚡ Nếu KHÔNG phải API → bỏ qua auth luôn
if (!pathname.startsWith("/api")) {
  return router(request, env, ctx, runtime);
}

// ⚡ API thì mới check auth
if (!publicPrefixes.some(p => pathname.startsWith(p))) {

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
