import { cacheEngine } from "./cacheEngine.js";
import { EventBus } from "./eventBus.js"; // ✅ đúng tên export

export function createRuntimeContext(request, env) {

  const url = new URL(request.url);

  return {
    env,
    request,
    url,

    cache: cacheEngine,

    // 🔥 TẠO INSTANCE MỚI MỖI REQUEST
    events: new EventBus(),

    meta: {
      startTime: Date.now(),
      requestId: crypto.randomUUID(),
    }
  };
}
