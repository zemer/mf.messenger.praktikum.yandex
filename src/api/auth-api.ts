import BaseAPI from "./base-api.js";
import { authAPIInstance } from "./http.js";

export interface SingUpData extends Record<string, unknown> {
    first_name: string;
    second_name: string;
    login: string;
    email: string;
    password: string;
    phone: string;
}

export default class AuthAPI extends BaseAPI {

    signIn(login: string, password: string): Promise<XMLHttpRequest> {
        return authAPIInstance.post("/signin", {
            data: {
                login,
                password
            },
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            }
        });
    }

    signUp(data: SingUpData): Promise<XMLHttpRequest> {
        return authAPIInstance.post("/signup", {
            data,
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            }
        });
    }

    logout(): Promise<XMLHttpRequest> {
        return authAPIInstance.post("/logout", {});
    }

    profile(): Promise<XMLHttpRequest> {
        return authAPIInstance.get("/user", {});
    }

    // create() {
    //     // Здесь уже не нужно писать полный путь /api/v1/chats/
    //     return authAPIInstance.post('/', { title: 'string' });
    // }

    // request() {
    //     // Здесь уже не нужно писать полный путь /api/v1/chats/
    //     return authAPIInstance.get('/full').then();
    // }
} 