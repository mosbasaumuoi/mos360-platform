export async function handleAnalytics(request, env) {

  try {

    if (!env.MOS360_TRACKING) {
      return new Response(JSON.stringify({
        error: "MOS360_TRACKING not found"
      }), {
        headers: { "Content-Type": "application/json" }
      });
    }

    const sources = ["zalo", "facebook", "messenger"];

    const result = {};

    for (const src of sources) {
      const value = await env.MOS360_TRACKING.get(`count:${src}`);
      result[src] = value ? parseInt(value) : 0;
    }

    return new Response(JSON.stringify({
      ok: true,
      data: result
    }), {
      headers: { "Content-Type": "application/json" }
    });

  } catch (err) {

    return new Response(JSON.stringify({
      error: err.message
    }), {
      headers: { "Content-Type": "application/json" }
    });
  }
}
