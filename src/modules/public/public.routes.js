export async function handlePublic(request, env, ctx) {
  const url = new URL(request.url);
  const pathname = url.pathname;

  if (pathname === "/api/public/track") {

    const source = url.searchParams.get("source") || "unknown";

    // 🧠 KEY chi tiết
    const detailKey = `track:${source}:${Date.now()}`;

    const data = {
      source,
      ip: request.headers.get("CF-Connecting-IP"),
      userAgent: request.headers.get("User-Agent"),
      time: new Date().toISOString(),
    };

    // 🔥 Lưu chi tiết
    await env.MOS360_TRACKING.put(detailKey, JSON.stringify(data));

    // 🔥 COUNT KEY
    const countKey = `count:${source}`;

    let current = await env.MOS360_TRACKING.get(countKey);
    current = current ? parseInt(current) : 0;

    current++;

    await env.MOS360_TRACKING.put(countKey, current.toString());

    console.log("Tracking:", source, "→", current);

    return new Response(JSON.stringify({
      ok: true,
      source,
      total: current
    }), {
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response("Public API");
}
