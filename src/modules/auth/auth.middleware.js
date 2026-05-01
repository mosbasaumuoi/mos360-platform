import { verifyToken } from "./auth.service.js";

export const authMiddleware = async (req, env, ctx, next) => {
  const auth = req.headers.get("Authorization");

  if (!auth || !auth.startsWith("Bearer ")) {
    return new Response("Missing token", { status: 401 });
  }

  try {
    const payload = await verifyToken(auth.split(" ")[1]);

    req.user = {
      id: payload.sub,
      email: payload.email,
      role:
        payload.email === "admin@mos360.vn"
          ? "admin"
          : "user",
    };

    return next();
  } catch {
    return new Response("Invalid token", { status: 401 });
  }
};
