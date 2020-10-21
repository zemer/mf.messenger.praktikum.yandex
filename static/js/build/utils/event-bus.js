export default class EventBus {
    constructor() {
        this.listeners = new Map();
    }
    on(event, callback) {
        var _a;
        if (!this.listeners.get(event)) {
            this.listeners.set(event, []);
        }
        (_a = this.listeners.get(event)) === null || _a === void 0 ? void 0 : _a.push(callback);
    }
    off(event, callback) {
        var _a;
        if (!this.listeners.get(event)) {
            throw new Error(`Нет события: ${event}`);
        }
        const newListeners = (_a = this.listeners.get(event)) === null || _a === void 0 ? void 0 : _a.filter(listener => listener !== callback);
        this.listeners.set(event, newListeners !== null && newListeners !== void 0 ? newListeners : []);
    }
    emit(event, ...args) {
        var _a;
        if (!this.listeners.get(event)) {
            throw new Error(`Нет события: ${event}`);
        }
        (_a = this.listeners.get(event)) === null || _a === void 0 ? void 0 : _a.forEach(function (listener) {
            listener(...args);
        });
    }
}
//# sourceMappingURL=event-bus.js.map