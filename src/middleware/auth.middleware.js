import { jwtVerify } from "jose";

const SECRET = new TextEncoder().encode("MOS360_SECRET_KEY");

export async function authMiddleware(request, env) {
  try {
    const authHeader = request.headers.get("Authorization");

    if (!authHeader?.startsWith("Bearer ")) {
      return { ok: false, message: "Missing token" };
    }

    const token = authHeader.split(" ")[1];

    const { payload } = await jwtVerify(token, SECRET);

    request.user = {
      id: payload.id,
      email: payload.email,
      role: payload.role || "user",
    };

    return { ok: true, user: request.user };

  } catch (e) {
    return { ok: false, message: "Invalid token" };
  }
}
