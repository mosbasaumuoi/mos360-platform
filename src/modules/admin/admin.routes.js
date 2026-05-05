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

  const auth = await authMiddleware(request, env);
  if (!auth.ok) return json(auth.message, 401);

  request.user = auth.user;

  const guard = await adminOnly(request);
  if (guard instanceof Response) return guard;

  const sources = ["zalo", "facebook", "messenger"];
  const dates = getLastNDays(7); // 👈 lấy 7 ngày

  const result = {};

  for (const source of sources) {
    let total = 0;

    for (const date of dates) {
      const key = `track:${date}:${source}`;
      const value = await env.MOS360_TRACKING.get(key);

      if (value) {
        total += parseInt(value);
      }
    }

    result[source] = total;
  }

  return json(result);
}
