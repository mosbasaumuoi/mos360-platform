import { jwtVerify } from "jose";

const SECRET = new TextEncoder().encode("MOS360_SECRET_KEY");

// 🔑 Verify + decode token
export const authMiddleware = async (request) => {
  const authHeader = request.headers.get("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return {
      ok: false,
      error: "Missing token"
    };
  }

  const token = authHeader.split(" ")[1];

  try {
    const { payload } = await jwtVerify(token, SECRET);

    // 👤 Gán role theo email
    const role =
      payload.email === "admin@mos360.vn"
        ? "admin"
        : "user";

    return {
      ok: true,
      user: {
        id: payload.sub,
        email: payload.email,
        role
      }
    };

  } catch (err) {
    return {
      ok: false,
      error: "Invalid token"
    };
  }
};
