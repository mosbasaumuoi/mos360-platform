import { authMiddleware } from "../../middleware/auth.middleware.js";
import { json } from "../../utils/response.js";

function getLastNDays(n = 7) {
  const dates = [];

  for (let i = 0; i < n; i++) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    dates.push(d.toISOString().slice(0, 10));
  }

  return dates;
}

export async function handleAdmin(request, env, ctx) {

  // 🔐 AUTH
  const auth = await authMiddleware(request, env);

  if (!auth.ok) {
    return json(auth.message, 401);
  }

  const user = auth.user;

  // 👑 ADMIN CHECK (KHÔNG dùng middleware nữa)
  if (user.role !== "admin") {
    return json("Forbidden", 403);
  }

  // 📊 ANALYTICS
  const sources = ["zalo", "facebook", "messenger"];
  const dates = getLastNDays(7);

  const result = {};

  for (const source of sources) {
    let total = 0;

    for (const date of dates) {
      const key = `track:${date}:${source}`;
      const value = await env.MOS360_TRACKING.get(key);

      const num = value ? parseInt(value) : 0;

      if (!isNaN(num)) {
        total += num;
      }
    }

    result[source] = total;
  }

  return json(result);
}
