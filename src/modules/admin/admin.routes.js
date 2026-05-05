function getDateKey() {
  const d = new Date();
  return d.toISOString().slice(0, 10);
}

export async function handleAdmin(request, env, ctx) {

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

  // 📊 ANALYTICS (FIX CHUẨN)
  const date = getDateKey();
  const sources = ["zalo", "facebook", "messenger"];

  const result = {};

  for (const source of sources) {
    const key = `track:${date}:${source}`;
    const value = await env.MOS360_TRACKING.get(key);
    result[source] = value ? parseInt(value) : 0;
  }

  return json(result);
}
