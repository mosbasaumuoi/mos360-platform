import { router } from "./gateway/router.js";
import { authMiddleware } from "./middleware/auth.middleware.js";
import { createRuntimeContext } from "./runtime/runtimeContext.js";

export default {
  async fetch(request, env, ctx) {

    // 🧭 STEP 7 - MIDDLEWARE CHAIN
    const authResult = await authMiddleware(request, env);
    const ctx = createRuntimeContext(env);

    // ❌ nếu fail auth thì chặn luôn
    if (!authResult.ok) {
      return new Response(JSON.stringify(authResult), {
        status: 401,
        headers: { "Content-Type": "application/json" }
      });
    }

    // ✅ gắn user vào request
    request.user = authResult.user;

    // 🚀 đi tiếp vào API Gateway
    return router(request, env, ctx);
  }
};
