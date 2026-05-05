import { json } from "../../utils/response.js";

export async function handlePublic(request, env, ctx, runtime) {

  const url = new URL(request.url);
  const source = url.searchParams.get("source");

  if (!source) {
    return json("Missing source", 400);
  }

  // 🔥 QUAN TRỌNG: TRIGGER EVENT
  await runtime.events.emit("track.click", { source });

  return json({ source });
}
