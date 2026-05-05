import { authMiddleware } from "../../middleware/auth.middleware.js";
import { adminOnly } from "../auth/admin.guard.js";
import { json } from "../../utils/response.js";

export async function handleAdmin(request, env) {

  const auth = await authMiddleware(request, env);

  if (!auth.ok) {
    return json(auth.message, 401);
  }

  request.user = auth.user;

  const guard = await adminOnly(request);

  if (guard instanceof Response) {
    return guard;
  }

  // 🔥 CHỈ ĐỌC TOTAL (O(1))
  const keys = ["zalo", "facebook", "messenger"];
  const result = {};

  for (const key of keys) {
    const value = await env.MOS360_TRACKING.get(`track_total:${key}`);
    result[key] = value ? parseInt(value) : 0;
  }

  return json(result);
}
