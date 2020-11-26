import { HTTPTransport } from "Utils/fetch";
import { httpAPIUrl } from "Api/api-url";

export interface SingUpData extends Record<string, unknown> {
    first_name: string;
    second_name: string;
    login: string;
    email: string;
    password: string;
    phone: string;
}

export default class AuthAPI {
    private authAPIInstance = new HTTPTransport(`${httpAPIUrl}/api/v2/auth`);

    signIn(login: string, password: string): Promise<XMLHttpRequest> {
        return this.authAPIInstance.post("/signin", {
            data: {
                login,
                password
            }
        });
    }

    signUp(data: SingUpData): Promise<XMLHttpRequest> {
        return this.authAPIInstance.post("/signup", {
            data
        });
    }

    logout(): Promise<XMLHttpRequest> {
        return this.authAPIInstance.post("/logout");
    }

    profile(): Promise<XMLHttpRequest> {
        return this.authAPIInstance.get("/user");
    }
}
