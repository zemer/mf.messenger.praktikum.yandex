import { cloneDeep } from "../utils/cloneDeep.js";
import EventBus from "../utils/event-bus.js";
import { AppState, UserState } from "./types.js";

export class Store {

    static EVENTS = {
        CHATS_ITEMS_CHANGED: "CHATS_ITEMS_CHANGED",
        CHAT_USERS_CHANGED: "CHAT_USERS_CHANGED",
        PROFILE_CHANGED: "PROFILE_CHANGED",
        SEARCH_USERS: "SEARCH_USERS",
    };

    private state: AppState;
    eventBus: () => EventBus;

    constructor(initialState: AppState) {
        const eventBus = new EventBus();
        this.eventBus = () => eventBus;
        this.state = initialState;
    }

    get value() {
        return this.state;
    }

    subscribe(event: string, callback: Function) {
        this.eventBus().on(event, callback);
    }

    getState(): AppState {
        return this.state;
    }

    dispatch(event: string, payload: any): any {
        const clone = cloneDeep(this.state) as AppState;

        switch (event) {
            case Store.EVENTS.CHATS_ITEMS_CHANGED: {
                clone.chats.items = payload.items;
                break;
            }

            case Store.EVENTS.PROFILE_CHANGED: {
                clone.profile = payload.profile;
                break
            }

            case Store.EVENTS.CHAT_USERS_CHANGED: {
                clone.activeChat.users = payload.items
            }

            case Store.EVENTS.SEARCH_USERS: {
                clone.search.users = payload.items
            }
        }

        this.state = clone;

        this.eventBus().emit(event);
    }
}

export const initialState: AppState = {
    profile: {} as UserState,
    chats: {
        items: []
    },
    activeChat: {
        users: []
    },
    search: {
        users: []
    }
};

export const store = new Store(initialState);