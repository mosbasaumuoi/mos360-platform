import { cacheEngine } from "./cacheEngine.js";
import { eventBus } from "./eventBus.js"; // ✅ quay lại đúng file

export function createRuntimeContext(request, env) {
  const url = new URL(request.url);

  return {
    env,
    request,
    url,

    cache: cacheEngine,
    events: eventBus, // ✅ dùng lại singleton

    meta: {
      startTime: Date.now(),
      requestId: crypto.randomUUID(),
    }
  };
}
