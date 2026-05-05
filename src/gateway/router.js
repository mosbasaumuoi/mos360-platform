import { handlePublic } from "../modules/public/public.routes.js";
import { handleAdmin } from "../modules/admin/admin.routes.js";
import { handleCourses } from "../modules/courses/courses.routes.js";
import { handleLogin, handleMe } from "../modules/auth/auth.routes.js";

// =============================
// ROUTES API
// =============================
const routes = new Map([
  ["POST:/api/auth/login", handleLogin],
  ["GET:/api/auth/me", handleMe],

  ["GET:/api/courses", handleCourses],

  ["GET:/api/admin/analytics", handleAdmin],

  ["GET:/api/public/track", handlePublic],
]);

// =============================
// MAIN ROUTER
// =============================
export async function router(request, env, ctx, runtime) {
  const url = new URL(request.url);

  // =============================
  // 🎯 FRONTEND DASHBOARD
  // =============================
  if (url.pathname === "/dashboard") {
    return new Response(`
      <html>
        <head>
          <title>MOS360 Dashboard</title>
        </head>
        <body>
          <h2>📊 Tracking Dashboard</h2>

          <div>Zalo: <span id="zalo">0</span></div>
          <div>Facebook: <span id="facebook">0</span></div>
          <div>Messenger: <span id="messenger">0</span></div>

          <script>
            const API = "/api/admin/analytics";
            const token = localStorage.getItem("token");

            async function load() {
              const res = await fetch(API, {
                headers: {
                  Authorization: "Bearer " + token
                }
              });

              const json = await res.json();

              if (!json.ok) return;

              document.getElementById("zalo").innerText = json.data.zalo;
              document.getElementById("facebook").innerText = json.data.facebook;
              document.getElementById("messenger").innerText = json.data.messenger;
            }

            setInterval(load, 2000);
            load();
          </script>
        </body>
      </html>
    `, {
      headers: { "Content-Type": "text/html" }
    });
  }

  // =============================
  // API ROUTER
  // =============================
  const key = `${request.method}:${url.pathname}`;
  const handler = routes.get(key);

  if (!handler) {
    return new Response(JSON.stringify({
      ok: false,
      message: "Not Found"
    }), {
      status: 404,
      headers: { "Content-Type": "application/json" }
    });
  }

  try {
    return await handler(request, env, ctx, runtime);
  } catch (err) {
    console.error("ROUTER ERROR:", err);

    return new Response(JSON.stringify({
      ok: false,
      message: "Internal Server Error"
    }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
