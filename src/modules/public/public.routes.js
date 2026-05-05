import { json } from "../../utils/response.js";

export async function handlePublic(request, env, ctx, runtime) {
  const url = new URL(request.url);
  const pathname = url.pathname;

  // =============================
  // 📊 TRACK CLICK
  // =============================
  if (pathname === "/api/public/track") {
    const source = url.searchParams.get("source");

    if (!source) {
      return json("Missing source", 400);
    }

    // 🔥 EMIT EVENT (QUAN TRỌNG NHẤT)
    runtime.events.emit("track.click", { source });

    // ⚠️ KHÔNG bọc ok:true nữa
    return json({
      source
    });
  }

  return json("Public API");
}
