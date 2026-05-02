import { handleAuth } from "../modules/auth/auth.routes.js";
import { handleCourses } from "../modules/courses/courses.routes.js";
import { handleAdmin } from "../modules/admin/admin.routes.js";

export async function router(request, env, ctx, runtime) {

  const url = new URL(request.url);
  const pathname = url.pathname;

  // ===============================
  // 🌐 HOMEPAGE (PUBLIC)
  // ===============================
  if (pathname === "/") {
    return new Response(`
<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <title>MOS360</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <style>
    body {
      font-family: Arial;
      margin: 0;
      background: #f5f7fb;
    }

    header {
      background: #0f172a;
      color: white;
      padding: 16px;
      text-align: center;
    }

    .container {
      padding: 20px;
    }

    .course {
      background: white;
      padding: 15px;
      margin-bottom: 12px;
      border-radius: 10px;
      box-shadow: 0 3px 10px rgba(0,0,0,0.1);
    }

    .btn {
      display: inline-block;
      margin-top: 10px;
      padding: 10px 16px;
      background: #2563eb;
      color: white;
      text-decoration: none;
      border-radius: 6px;
    }

    .side-socials {
      position: fixed;
      right: 10px;
      bottom: 20px;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .s-btn {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background: white;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 10px rgba(0,0,0,0.2);
    }

    .s-btn img {
      width: 28px;
    }
  </style>
</head>

<body>

<header>
  <h1>MOS360 🚀</h1>
  <p>Nền tảng học MOS + AI</p>
</header>

<div class="container">
  <h2>Khóa học nổi bật</h2>
  <div id="courses">Đang tải...</div>
</div>

<!-- SOCIAL -->
<div class="side-socials">
  <a href="https://zalo.me/0912888360" target="_blank" class="s-btn">
    <img src="https://img.icons8.com/color/48/zalo.png">
  </a>

  <a href="https://facebook.com/mos360.vn" target="_blank" class="s-btn">
    <img src="https://img.icons8.com/color/48/facebook-new.png">
  </a>

  <a href="https://m.me/mos360.vn" target="_blank" class="s-btn">
    <img src="https://img.icons8.com/color/48/facebook-messenger--v1.png">
  </a>
</div>

<script>
async function loadCourses() {
  try {
    const res = await fetch("/api/public/courses");
    const data = await res.json();

    const html = data.map(c => \`
      <div class="course">
        <h3>\${c.title}</h3>
        <p>\${c.description}</p>
<a href="https://zalo.me/0912888360" 
   class="btn" 
   target="_blank"
   onclick="trackClick('${c.id}')">
  Đăng ký học
</a>
      </div>
    \`).join("");

    document.getElementById("courses").innerHTML = html;

  } catch (e) {
    document.getElementById("courses").innerText = "Lỗi tải dữ liệu";
  }
}

loadCourses();
</script>

</body>
</html>
    `, {
      headers: {
        "Content-Type": "text/html; charset=UTF-8"
      }
    });
  }

  // ===============================
  // ⚡ DEBUG RUNTIME
  // ===============================
  if (pathname === "/debug/runtime") {
    runtime.cache.set("hello", "MOS360 Runtime");

    runtime.events.emit("debug.test", {
      time: Date.now(),
    });

    return new Response(JSON.stringify({
      ok: true,
      cache: runtime.cache.get("hello"),
      eventBus: "working",
    }), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  // ===============================
  // ⚡ DEBUG CACHE
  // ===============================
  if (pathname === "/debug/cache") {
    return new Response(JSON.stringify({
      ok: true,
      stats: runtime.cache.stats(),
    }), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  // ===============================
  // 🌐 PUBLIC API
  // ===============================
  if (pathname.startsWith("/api/public/courses")) {
    return handleCourses(request, env, ctx);
  }

  // ===============================
  // 🔐 AUTH
  // ===============================
  if (pathname.startsWith("/api/auth")) {
    return handleAuth(request, env, ctx);
  }

  // ===============================
  // 🔒 ADMIN
  // ===============================
  if (pathname.startsWith("/api/admin")) {
    return handleAdmin(request, env, ctx);
  }

  // ===============================
  // ❌ NOT FOUND
  // ===============================
  return new Response("Not Found", {
    status: 404,
  });
}
