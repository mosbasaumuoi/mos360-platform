import { json } from "../../utils/response.js";
import { login, verifyToken } from "./auth.service.js";

export async function handleAuth(request) {
  const url = new URL(request.url);

  // LOGIN
  if (url.pathname === "/api/auth/login" && request.method === "POST") {
    const body = await request.json();

    const result = await login(body.email, body.password);

    if (!result) {
      return json({ error: "Invalid credentials" }, 401);
    }

    return json(result);
  }

  // VERIFY TOKEN
  if (url.pathname === "/api/auth/me") {
    const authHeader = request.headers.get("Authorization");

    if (!authHeader) {
      return json({ error: "No token" }, 401);
    }

    const token = authHeader.replace("Bearer ", "");

    const user = await verifyToken(token);

    if (!user) {
      return json({ error: "Invalid token" }, 401);
    }

    return json({ user });
  }

  return json({ message: "Auth API" });
}
