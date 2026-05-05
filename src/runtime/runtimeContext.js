import { cacheEngine } from "./cacheEngine.js";
import { EventBus } from "../core/eventBus.js";

export function createRuntimeContext(request, env) {

  const url = new URL(request.url);

  return {
    env,
    request,
    url,

    cache: cacheEngine,

    // 🔥 FIX QUAN TRỌNG
    events: new EventBus(),

    meta: {
      startTime: Date.now(),
      requestId: crypto.randomUUID(),
    }
  };
}
