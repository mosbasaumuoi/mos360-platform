import { json } from "../../utils/response.js";
import {
  trackEvent
}
  from "../tracking/tracking.service.js";

export async function handlePublic(request, env, ctx, runtime) {

  const url = new URL(request.url);
  const source = url.searchParams.get("source");

  if (!source) {
    return json("Missing source", 400);
  }

  await trackEvent(runtime, source);

  return json({ source });
}
