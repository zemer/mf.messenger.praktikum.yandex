import { authAPIInstance } from "./http.js";

export interface SingUpData extends Record<string, unknown> {
    first_name: string;
    second_name: string;
    login: string;
    email: string;
    password: string;
    phone: string;
}

export default class AuthAPI {
    signIn(login: string, password: string): Promise<XMLHttpRequest> {
        return authAPIInstance.post("/signin", {
            data: {
                login,
                password
            }
        });
    }

    signUp(data: SingUpData): Promise<XMLHttpRequest> {
        return authAPIInstance.post("/signup", {
            data
        });
    }

    logout(): Promise<XMLHttpRequest> {
        return authAPIInstance.post("/logout");
    }

    profile(): Promise<XMLHttpRequest> {
        return authAPIInstance.get("/user");
    }
} 