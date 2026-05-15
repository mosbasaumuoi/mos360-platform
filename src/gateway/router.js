import { handlePublic }
from "../modules/public/public.routes.js";

import { handleAdmin }
from "../modules/admin/admin.routes.js";

import {
  handleCourses,
  handleCourseDetail,
  handleLessonDetail
}
from "../modules/courses/courses.routes.js";

import {
  handleLogin,
  handleMe
}
from "../modules/auth/auth.routes.js";

import {
  handleTrackEvent
}
  from "../modules/tracking/tracking.routes.js";

import {
  handleIssueCredential,
  handleVerifyCredential
}
  from "../modules/credentials/credentials.routes.js";
  
import {
  handleAnalytics
}
  from "../modules/analytics/analytics.routes.js";  

import {
  handleAddXP,
  handleDailyStreak
}
  from "../modules/gamification/gamification.routes.js";

// ============================================
// ROUTES API
// ============================================

const routes = new Map([

  ["POST:/api/auth/login", handleLogin],

  ["GET:/api/auth/me", handleMe],

  ["GET:/api/courses", handleCourses],

  ["GET:/api/admin/analytics", handleAdmin],

  ["GET:/api/public/track", handlePublic],

  ["POST:/api/track", handleTrackEvent],

  ["POST:/api/tracking/event", handleTrackEvent],

  ["POST:/api/credentials", handleIssueCredential],

  ["GET:/api/credentials/:certificateId", handleVerifyCredential],

  ["GET:/api/analytics", handleAnalytics],

  ["POST:/api/gamification/xp", handleAddXP],

  ["POST:/api/gamification/streak", handleDailyStreak],

]);

// ============================================
// CORS HEADERS
// ============================================

const corsHeaders = {

  "Access-Control-Allow-Origin":
    "*",

  "Access-Control-Allow-Methods":
    "GET, POST, OPTIONS",

  "Access-Control-Allow-Headers":
    "Content-Type, Authorization",
};

// ============================================
// MAIN ROUTER
// ============================================

export async function router(
  request,
  env,
  ctx,
  runtime
) {

  const url =
    new URL(request.url);

  // ==========================================
  // CORS PREFLIGHT
  // ==========================================

  if (
    request.method === "OPTIONS"
  ) {

    return new Response(null, {
      headers: corsHeaders
    });
  }

  // ==========================================
  // API ROUTER
  // ==========================================

  const key =
    `${request.method}:${url.pathname}`;

  // ==========================================
// COURSE DETAIL
// ==========================================

if (

  request.method === "GET"

  &&

  url.pathname.startsWith(
    "/api/courses/"
  )

) {

  const response =
  await handleCourseDetail(
    request
  );

const headers =
  new Headers(
    response.headers
  );

Object.entries(corsHeaders)
  .forEach(([key, value]) => {

    headers.set(key, value);

  });

return new Response(
  response.body,
  {
    status:
      response.status,

    headers
  }
);
}

// ==========================================
// LESSON DETAIL
// ==========================================

if (

  request.method === "GET"

  &&

  url.pathname.startsWith(
    "/api/learn/"
  )

) {

  const response =
    await handleLessonDetail(
      request
    );

  const headers =
    new Headers(
      response.headers
    );

  Object.entries(corsHeaders)
    .forEach(([key, value]) => {

      headers.set(key, value);

    });

  return new Response(
    response.body,
    {
      status:
        response.status,

      headers
    }
  );
}

  if (

    request.method === "GET"

    &&

    url.pathname.startsWith(
      "/api/credentials/"
    )

  ) {

    const response =
      await handleVerifyCredential(
        request,
        env
      );

    const headers =
      new Headers(
        response.headers
      );

    Object.entries(corsHeaders)
      .forEach(([key, value]) => {

        headers.set(key, value);

      });

    return new Response(
      response.body,
      {
        status:
          response.status,

        headers
      }
    );
  }

    const handler =
    routes.get(key);

  // ==========================================
  // NOT FOUND
  // ==========================================

  if (!handler) {

    return new Response(
      JSON.stringify({
        ok: false,
        message: "Not Found"
      }),
      {
        status: 404,

        headers: {

          "Content-Type":
            "application/json",

          ...corsHeaders
        }
      }
    );
  }

  try {

    // ========================================
    // HANDLER
    // ========================================

    const response =
      await handler(
        request,
        env,
        ctx,
        runtime
      );

    // ========================================
    // MERGE CORS
    // ========================================

    const headers =
      new Headers(
        response.headers
      );

    Object.entries(corsHeaders)
      .forEach(([key, value]) => {

        headers.set(key, value);

      });

    return new Response(
      response.body,
      {
        status:
          response.status,

        headers
      }
    );

  } catch (err) {

    console.error(
      "ROUTER ERROR:",
      err
    );

    return new Response(
      JSON.stringify({
        ok: false,
        message:
          "Internal Server Error"
      }),
      {
        status: 500,

        headers: {

          "Content-Type":
            "application/json",

          ...corsHeaders
        }
      }
    );
  }
}