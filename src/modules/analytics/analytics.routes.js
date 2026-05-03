export async function handleAnalytics(request, env) {

  const sources = ["zalo", "facebook", "messenger"];

  const result = {};

  for (const src of sources) {
    const value = await env.TRACKING_KV.get(`count:${src}`);
    result[src] = value ? parseInt(value) : 0;
  }

  return new Response(JSON.stringify({
    ok: true,
    data: result
  }), {
    headers: {
      "Content-Type": "application/json"
    }
  });
}
