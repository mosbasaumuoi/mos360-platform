export class EventBus {
  constructor() {
    this.events = {};
  }

  on(name, handler) {
    if (!this.events[name]) {
      this.events[name] = [];
    }
    this.events[name].push(handler);
  }

  async emit(name, payload) {
    const handlers = this.events[name] || [];

    for (const handler of handlers) {
      await handler(payload);
    }
  }
}
