import { handleAuth } from "../modules/auth/auth.routes.js";
import { handleCourses } from "../modules/courses/courses.routes.js";
import { handleAdmin } from "../modules/admin/admin.routes.js";

export async function router(request, env, ctx, runtime) {

  const url = new URL(request.url);
  const pathname = url.pathname;

  // 🔥 HOMEPAGE (FIX NOT FOUND + FIX FONT)
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
      font-family: Arial, sans-serif;
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
      text-align: center;
    }

    .btn {
      display: inline-block;
      margin: 10px;
      padding: 12px 20px;
      background: #2563eb;
      color: white;
      text-decoration: none;
      border-radius: 8px;
      font-weight: bold;
    }

    .btn:hover {
      background: #1d4ed8;
    }

    /* SOCIAL FLOAT */
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
      height: 28px;
    }
  </style>
</head>

<body>

<header>
  <h1>MOS360 🚀</h1>
  <p>Nền tảng học MOS + AI</p>
</header>

<div class="container">
  <h2>Học MOS dễ dàng hơn bao giờ hết</h2>
  <p>Luyện thi – Thực hành – Đạt chứng chỉ</p>

  <a href="/api/courses" class="btn">Xem khóa học</a>
  <a href="https://zalo.me/0912888360" target="_blank" class="btn">Tư vấn Zalo</a>
</div>

<!-- SOCIAL BUTTONS -->
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

</body>
</html>
  `, {
    headers: {
      "Content-Type": "text/html; charset=UTF-8"
    }
  });
}

  // ⚡ DEBUG RUNTIME
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

  // ⚡ DEBUG CACHE
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

  // AUTH
  if (pathname.startsWith("/api/auth")) {
    return handleAuth(request, env, ctx);
  }

  // COURSES
  if (pathname.startsWith("/api/courses")) {
    return handleCourses(request, env, ctx);
  }

  // ADMIN
  if (pathname.startsWith("/api/admin")) {
    return handleAdmin(request, env, ctx);
  }

  return new Response("Not Found", {
    status: 404,
  });
}
