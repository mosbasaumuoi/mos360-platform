import { json } from "../../utils/response.js";

export async function handleTrack(request, env, ctx) {

  try {
    const url = new URL(request.url);

    // lấy type từ query (?type=zalo)
    const type = url.searchParams.get("type") || "unknown";

    const data = {
      type,
      time: Date.now(),
      ip: request.headers.get("CF-Connecting-IP"),
      ua: request.headers.get("User-Agent"),
    };

    const key = `track:${Date.now()}`;

    // 🔥 GHI KV
    await env.MOS360_TRACKING.put(
      key,
      JSON.stringify(data)
    );

    console.log("TRACK SAVED:", data);

    return json({
      ok: true,
      saved: data
    });

  } catch (err) {
    return json({
      error: err.message
    }, 500);
  }
}
