import { json } from "../../utils/response.js";

export async function handlePublic(request) {
  const url = new URL(request.url);

  // 🎯 TRACK EVENT
  if (url.pathname === "/api/public/track" && request.method === "POST") {
    const body = await request.json();

    console.log("TRACK EVENT:", body);

    return json({
      success: true,
      received: body
    });
  }

  return json({ message: "Public API" });
}
