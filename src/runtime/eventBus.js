const listeners = {};

export const eventBus = {
  on(event, callback) {
    if (!listeners[event]) {
      listeners[event] = [];
    }

    listeners[event].push(callback);
  },

  emit(event, payload) {
    const handlers = listeners[event] || [];

    handlers.forEach((handler) => {
      try {
        handler(payload);
      } catch (err) {
        console.error("Event handler error:", err);
      }
    });
  },
};
