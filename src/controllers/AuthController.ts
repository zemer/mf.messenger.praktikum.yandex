import AuthAPI, { SingUpData } from "../api/auth-api";
import { Store, store } from "../store/Store";
import { TError } from "../store/types";
import Router from "../utils/router";

export default class AuthController {
    private authAPI: AuthAPI;

    constructor() {
        this.authAPI = new AuthAPI();
    }

    signIn(login: string, password: string): void {
        this.authAPI.signIn(login, password)
            .then(() => Router.go("/chats"))
            .catch((e: XMLHttpRequest) => {
                const error = (JSON.parse(e.response) as TError);
                store.dispatch(Store.EVENTS.SIGN_IN_FAILED, error.reason);
            });
    }

    signUp(data: SingUpData): void {
        this.authAPI.signUp(data)
            .then(() => Router.go("/chats"));
    }

    checkSignUp(): void {
        this.authAPI.profile()
            .then(() => Router.go("/chats"));
    }

    logout(): void {
        this.authAPI.logout()
            .then(() => Router.go("/login"));
    }

    profile(): void {
        this.authAPI.profile()
            .then((res) => JSON.parse(res.response))
            .then((res) => store.dispatch(Store.EVENTS.PROFILE_CHANGED, { res }));
    }
}

export const authController = new AuthController();
