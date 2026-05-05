import { json } from "../../utils/response.js";
import { login, verifyToken } from "./auth.service.js";

// =============================
// 🔐 LOGIN
// =============================
export async function handleLogin(request, env) {
  const body = await request.json();

  const result = await login(body.email, body.password, env);

  if (!result) {
    return json({ error: "Invalid credentials" }, 401);
  }

  return json(result);
}

// =============================
// 👤 VERIFY TOKEN
// =============================
export async function handleMe(request, env) {
  const authHeader = request.headers.get("Authorization");

  if (!authHeader) {
    return json({ error: "No token" }, 401);
  }

  const token = authHeader.replace("Bearer ", "");

  const user = await verifyToken(token, env);

  if (!user) {
    return json({ error: "Invalid token" }, 401);
  }

  return json({ user });
}
