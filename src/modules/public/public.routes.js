import { json } from "../../utils/response.js";

export async function handlePublic(request, env, ctx, runtime) {
  const url = new URL(request.url);

  if (url.pathname === "/api/public/track") {
    const source = url.searchParams.get("source");

    if (!source) {
      return json("Missing source", 400);
    }

    // 🔥 FIX ĐÚNG
    await runtime.events.emit("track.click", { source });

    return json({ source });
  }

  return json("Public API");
}
