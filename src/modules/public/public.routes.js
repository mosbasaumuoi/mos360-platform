import { json } from "../../utils/response.js";

export async function handlePublic(request, env) {
  const url = new URL(request.url);

  if (url.pathname === "/api/public/track" && request.method === "POST") {
    const body = await request.json();

    // 🔥 KEY UNIQUE
    const key = `track:${Date.now()}`;

    // 🔥 LƯU KV
    await env.TRACKING_KV.put(key, JSON.stringify(body));

    console.log("TRACK SAVED:", body);

    return json({ success: true });
  }

  return json({ message: "Public API" });
}
