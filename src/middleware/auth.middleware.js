import { verifyToken } from "../modules/auth/auth.service.js";

export async function authMiddleware(request, env) {
  const auth = request.headers.get("Authorization");

  if (!auth) {
    return { ok: false, message: "No token" };
  }

  const token = auth.replace("Bearer ", "");
  const user = await verifyToken(token, env);

  if (!user) {
    return { ok: false, message: "Invalid token" };
  }

  return {
    ok: true,
    user
  };
}
