import { jwtVerify } from "jose";

export async function authMiddleware(request, env) {

  const authHeader = request.headers.get("Authorization");

  if (!authHeader?.startsWith("Bearer ")) {
    return { ok: false, message: "Missing token" };
  }

  try {
    const token = authHeader.split(" ")[1];

    // 🔥 ĐẶT Ở ĐÂY (BÊN TRONG FUNCTION)
    const SECRET = new TextEncoder().encode(env.JWT_SECRET);

    const { payload } = await jwtVerify(token, SECRET);

    return {
      ok: true,
      user: {
        id: payload.id,
        email: payload.email,
        role: payload.role
      }
    };

  } catch (err) {
    console.error("JWT ERROR:", err);
    return { ok: false, message: "Invalid token" };
  }
}
