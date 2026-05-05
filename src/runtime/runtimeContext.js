import { cacheEngine } from "./cacheEngine.js";
import { eventBus } from "./eventBus.js";

export function createRuntimeContext(request, env) {

  const url = new URL(request.url);

  return {
    env,
    request,
    url,

    cache: cacheEngine,
    events: eventBus, // ⚠️ PHẢI LÀ singleton này

    meta: {
      startTime: Date.now(),
      requestId: crypto.randomUUID(),
    }
  };
}
