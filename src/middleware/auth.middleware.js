import { jwtVerify } from "jose";

const SECRET = new TextEncoder().encode(env.JWT_SECRET);

export async function authMiddleware(request) {

  const authHeader = request.headers.get("Authorization");

  if (!authHeader?.startsWith("Bearer ")) {
    return { ok: false, message: "Missing token" };
  }

  try {
    const token = authHeader.split(" ")[1];
    const { payload } = await jwtVerify(token, SECRET);

    return {
      ok: true,
      user: {
        id: payload.id,
        email: payload.email,
        role: payload.role || "user",
      }
    };

  } catch (err) {
    return { ok: false, message: "Invalid token" };
  }
}
