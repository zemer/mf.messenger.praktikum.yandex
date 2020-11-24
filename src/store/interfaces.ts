import { TMessage } from "./types";

export interface AppState {
    login: LoginState;
    registration: RegistrationState;
    profile: UserState;
    chats: ChatListState;
    activeChat: ChatState;
    search: SearchState;
}

export interface LoginState {
    error?: string;
}

export interface RegistrationState {
    error?: string;
}

export interface ChatItemState {
    id: number;
    title: string;
    avatar?: string;
}

export interface ChatListState {
    items: Array<ChatItemState>;
}

export interface UserState {
    id: number;
    first_name: string;
    second_name: string;
    display_name: string;
    login: string;
    email: string;
    phone: string;
    avatar: string;
}

export interface ChatState {
    token: string;
    users: UserState[];
    messages: TMessage[];
}

export interface SearchState {
    users: UserState[];
}
