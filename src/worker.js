import { router } from "./gateway/router.js";
import { createRuntimeContext } from "./runtime/runtimeContext.js";

export default {
  async fetch(request, env, ctx) {

    try {
      // =============================
      // ⚡ Runtime Layer
      // =============================
      const runtime = createRuntimeContext(request, env);

      // =============================
      // 🚀 Gateway Router (NO AUTH HERE)
      // =============================
      return await router(request, env, ctx, runtime);

    } catch (err) {
      // =============================
      // ❌ GLOBAL ERROR HANDLER
      // =============================
      console.error("🔥 Worker Error:", err);

      return new Response(JSON.stringify({
        ok: false,
        message: "Internal Server Error",
        error: err.message || "Unknown error"
      }), {
        status: 500,
        headers: {
          "Content-Type": "application/json"
        }
      });
    }
  },
};
