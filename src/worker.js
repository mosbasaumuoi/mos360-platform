// ============================================
// MAIN WORKER ENTRY
// Điều phối toàn hệ thống
// ============================================

import { renderApp } from "../frontend/app.js";

import { router } from "./gateway/router.js";

import { createRuntimeContext }
from "./runtime/runtimeContext.js";

export default {

  async fetch(request, env, ctx) {

    // ========================================
    // URL
    // ========================================

    const url = new URL(request.url);

    // ========================================
    // API REQUEST
    // ========================================

    if (url.pathname.startsWith("/api/")) {

      const runtime =
        createRuntimeContext(request, env);

      return router(
        request,
        env,
        ctx,
        runtime
      );
    }

    // ========================================
    // FRONTEND REQUEST
    // ========================================

    return renderApp(request);
  }
};
