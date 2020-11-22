export default class EventBus {
    private listeners: Map<string, Array<Function>>;

    constructor() {
        this.listeners = new Map();
    }

    on(event: string, callback: Function) {
        if (!this.listeners.get(event)) {
            this.listeners.set(event, []);
        }

        this.listeners.get(event)?.push(callback);
    }

    off(event: string, callback: Function) {
        if (!this.listeners.get(event)) {
            throw new Error(`Нет события: ${event}`);
        }

        const newListeners = this.listeners.get(event)?.filter(
            (listener) => listener !== callback
        );

        this.listeners.set(event, newListeners ?? []);
    }

    emit(event: string, ...args: Object[]) {
        if (!this.listeners.get(event)) {
            throw new Error(`Нет события: ${event}`);
        }

        this.listeners.get(event)?.forEach((listener: Function) => {
            listener(...args);
        });
    }
}
