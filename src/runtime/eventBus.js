const listeners = {};

export const eventBus = {
  on(event, callback) {
    if (!listeners[event]) {
      listeners[event] = [];
    }

    listeners[event].push(callback);
  },

async emit(event, payload) {

  const handlers = listeners[event] || [];

  for (const handler of handlers) {
    try {
      await handler(payload);
    } catch (err) {
      console.error("Event handler error:", err);
    }
  }

}
