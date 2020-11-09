import { cloneDeep } from "../utils/cloneDeep.js";
import { sanitize } from "../utils/escape.js";
import EventBus from "../utils/event-bus.js";
import { AppState, ChatItemState, UserState } from "./interfaces.js";

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

    dispatch(event: string, payload: unknown): any {
        const clone = cloneDeep(this.state) as AppState;

        switch (event) {
            case Store.EVENTS.CHATS_ITEMS_CHANGED: {
                clone.chats.items = (payload as TChatItems).items?.map((chat: any) => {
                    return {
                        id: chat.id,
                        title: sanitize(chat.title),
                        avatar: chat.avatar
                    } as ChatItemState;
                });
                break;
            }

            case Store.EVENTS.PROFILE_CHANGED: {
                clone.profile = this.createUserState(payload as TProfile);
                break
            }

            case Store.EVENTS.CHAT_USERS_CHANGED: {
                clone.activeChat.users = (payload as TChatUsers).items?.map((user) => this.createUserState(user));
                break;
            }

            case Store.EVENTS.SEARCH_USERS: {
                clone.search.users = (payload as TChatUsers).items?.map((user) => this.createUserState(user));
                break;
            }
        }

        this.state = clone;

        this.eventBus().emit(event);
    }

    createUserState(user: TProfile) {
        return {
            id: user.id,
            first_name: sanitize(user.first_name),
            second_name: sanitize(user.second_name),
            display_name: sanitize(user.display_name),
            login: sanitize(user.login),
            email: sanitize(user.email),
            phone: sanitize(user.phone),
            avatar: user.avatar
        } as UserState;
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