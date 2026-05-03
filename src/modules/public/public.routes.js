export async function handlePublic(request, env) {
  const url = new URL(request.url);
  const pathname = url.pathname;

  if (pathname === "/api/public/track") {

    // 🔥 LẤY SOURCE ĐÚNG CÁCH
    const source = url.searchParams.get("source") || "unknown";

    const key = `track:${source}:${Date.now()}`;

    const data = {
      source,
      ip: request.headers.get("CF-Connecting-IP"),
      ua: request.headers.get("User-Agent"),
      time: Date.now(),
    };

    // 🔥 LƯU CHI TIẾT
    await env.MOS360_TRACKING.put(key, JSON.stringify(data));

    // 🔥 ĐẾM
    const countKey = `count:${source}`;

    let current = await env.MOS360_TRACKING.get(countKey);
    current = current ? parseInt(current) : 0;

    current++;

    await env.MOS360_TRACKING.put(countKey, current.toString());

    console.log("TRACK:", source, "→", current);

    return new Response(JSON.stringify({
      ok: true,
      source,
      total: current
    }), {
      headers: { "Content-Type": "application/json" }
    });
  }

  return new Response("Public API");
}
