import { authMiddleware } from "../../middleware/auth.middleware.js";
import { adminOnly } from "../auth/admin.guard.js";
import { json } from "../../utils/response.js";

function getDateKey() {
  const d = new Date();
  return d.toISOString().slice(0, 10);
}

export async function handleAdmin(request, env) {

  // 🔐 AUTH
  const auth = await authMiddleware(request, env);

  if (!auth.ok) {
    return json(auth.message, 401);
  }

  request.user = auth.user;

  // 👑 ADMIN CHECK
  const guard = await adminOnly(request);

  if (guard instanceof Response) {
    return guard;
  }

  // 📊 ANALYTICS (THEO NGÀY)
  const keys = ["zalo", "facebook", "messenger"];
  const result = {};

  const date = getDateKey();

  for (const key of keys) {
    const kvKey = `track:${date}:${key}`;

    try {
      const value = await env.MOS360_TRACKING_KV.get(kvKey);
      result[key] = value ? parseInt(value) : 0;
    } catch (err) {
      console.error("ADMIN KV ERROR:", kvKey, err);
      result[key] = 0;
    }
  }

  return json(result);
}
