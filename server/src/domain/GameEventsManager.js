class GameEventsManager {
  constructor() {
    this.listeners = {
      hide: [],
      seek: [],
    };
  }

  subscribe(event, listener) {
    this.listeners[event].push(listener);
  }

  unsubscribe(event, listener) {
    this.listeners[event] = this.listeners[event].filter((item) => item !== listener);
  }

  notify(event, data) {
    this.listeners[event].map((item) => item.update(data));
  }
}

module.exports = { GameEventsManager };
