import { jwtVerify } from "jose";

const SECRET = new TextEncoder().encode("MOS360_SECRET_KEY");

export async function authMiddleware(request) {
  const url = new URL(request.url);
  const pathname = url.pathname;
  const publicRoutes = [
  "/",
  "/login",
  "/debug/runtime",
  "/debug/cache",
  "/api/public/track",
];
  // ✅ PUBLIC ROUTES (KHÔNG cần login)
  if (
    pathname === "/" ||
    pathname.startsWith("/debug") ||
    pathname.startsWith("/api/public")
  ) {
    return { ok: true, user: null };
  }

  // 🔐 PROTECTED ROUTES
  const authHeader = request.headers.get("Authorization");

  if (!authHeader?.startsWith("Bearer ")) {
    return { ok: false, message: "Missing token" };
  }

  try {
    const token = authHeader.split(" ")[1];
    const { payload } = await jwtVerify(token, SECRET);

    request.user = {
      id: payload.id,
      email: payload.email,
      role: payload.role || "user",
    };

    return { ok: true, user: request.user };

  } catch {
    return { ok: false, message: "Invalid token" };
  }
}
