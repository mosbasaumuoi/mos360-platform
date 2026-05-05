import { authMiddleware } from "../../middleware/auth.middleware.js";
import { adminOnly } from "../auth/admin.guard.js";
import { json } from "../../utils/response.js";

export async function handleAdmin(request, env, ctx) {

  const auth = await authMiddleware(request, env);

  if (!auth.ok) {
    return json(auth.message, 401);
  }

  request.user = auth.user;

  const guard = await adminOnly(request);

  if (guard instanceof Response) {
    return guard;
  }

  const keys = ["zalo", "facebook", "messenger"];
  const result = {};

  for (const key of keys) {
   const date = new Date().toISOString().slice(0, 10);
   const kvKey = `track:${date}:${key}`;

   const value = await env.MOS360_TRACKING.get(kvKey);
    result[key] = value ? parseInt(value) : 0;
  }

  return json(result);
}
