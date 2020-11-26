import cloneDeep from "Utils/cloneDeep";
import sanitize from "Utils/escape";
import EventBus from "Utils/event-bus";
import {
    AppState, ChatItemState, LoginState, RegistrationState, UserState
} from "./interfaces";
import {
    TChatItems, TChatUsers, TMessage, TProfile, TToken
} from "./types";

export class Store {
    static EVENTS = {
        CHATS_ITEMS_CHANGED: "CHATS_ITEMS_CHANGED",
        CHATS_TOKEN_CHANGED: "CHATS_TOKEN_CHANGED",
        CHAT_USERS_CHANGED: "CHAT_USERS_CHANGED",
        PROFILE_CHANGED: "PROFILE_CHANGED",
        SEARCH_USERS: "SEARCH_USERS",
        SIGN_IN_FAILED: "SIGN_IN_FAILED",
        REGISTRATION_FAILED: "REGISTRATION_FAILED",
        NEW_MESSAGE: "NEW_MESSAGE",
        OLD_MESSAGES: "OLD_MESSAGES",
        USER_ENTER: "USER_ENTER"
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

    subscribe(event: string, callback: any) {
        this.eventBus().on(event, callback);
    }

    getState(): AppState {
        return this.state;
    }

    dispatch(event: string, payload: unknown): any {
        const clone = cloneDeep(this.state) as AppState;

        switch (event) {
            case Store.EVENTS.CHATS_ITEMS_CHANGED: {
                clone.chats.items = (payload as TChatItems).items?.map((chat: any) => ({
                    id: chat.id,
                    title: sanitize(chat.title),
                    avatar: chat.avatar
                } as ChatItemState));
                break;
            }

            case Store.EVENTS.CHATS_TOKEN_CHANGED: {
                clone.activeChat.token = (payload as TToken).token;
                break;
            }

            case Store.EVENTS.PROFILE_CHANGED: {
                clone.profile = this.createUserState(payload as TProfile);
                break;
            }

            case Store.EVENTS.CHAT_USERS_CHANGED: {
                clone.activeChat.users = (payload as TChatUsers).items?.map((user) => this.createUserState(user));
                break;
            }

            case Store.EVENTS.SEARCH_USERS: {
                clone.search.users = (payload as TChatUsers).items?.map((user) => this.createUserState(user));
                break;
            }

            case Store.EVENTS.SIGN_IN_FAILED: {
                clone.login.error = (payload as string);
                break;
            }

            case Store.EVENTS.REGISTRATION_FAILED: {
                clone.registration.error = (payload as string);
                break;
            }

            case Store.EVENTS.NEW_MESSAGE: {
                clone.activeChat.messages.push(payload as TMessage);
                break;
            }

            case Store.EVENTS.OLD_MESSAGES: {
                clone.activeChat.messages = payload as TMessage[];
                break;
            }

            default: {
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
    login: {} as LoginState,
    registration: {} as RegistrationState,
    profile: {} as UserState,
    chats: {
        items: []
    },
    activeChat: {
        token: "",
        users: [],
        messages: []
    },
    search: {
        users: []
    }
};

export const store = new Store(initialState);
