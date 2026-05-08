// ============================================
// MAIN WORKER ENTRY
// Điều phối toàn hệ thống
// ============================================

import { renderApp } from "../frontend/app.js";

import { router } from "./gateway/router.js";

import { createRuntimeContext }
from "./runtime/runtimeContext.js";

import {
  handleCourses,
  handleCourseDetail
}
from "./modules/courses/courses.routes.js";

export default {

  async fetch(request, env, ctx) {

    // ========================================
    // URL
    // ========================================

    const url = new URL(request.url);

    // ========================================
    // pathname
    // ========================================

    const pathname =
    url.pathname;

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

    if (
  pathname.startsWith(
    "/courses/"
  )
) {

  return handleCourseDetail(
    request
  );
}

// ========================================
// COURSES API
// ========================================

if (
  pathname === "/courses"
) {

  return handleCourses();
}

    // ========================================
    // FRONTEND REQUEST
    // ========================================

    return renderApp(request);
  }
};
