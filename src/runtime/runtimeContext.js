import { cacheEngine } from "./cacheEngine.js";
import { eventBus } from "./eventBus.js";

export function createRuntimeContext(env) {
  return {
    env,
    cache: cacheEngine,
    events: eventBus,
  };
}
