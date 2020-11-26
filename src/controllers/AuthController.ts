import AuthAPI, { SingUpData } from "Api/auth-api";
import { Store, store } from "Store/Store";
import { TError, TProfile } from "Store/types";
import Router from "Utils/router";

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
            .then(() => Router.go("/chats"))
            .catch((e: XMLHttpRequest) => {
                const error = (JSON.parse(e.response) as TError);
                store.dispatch(Store.EVENTS.REGISTRATION_FAILED, error.reason);
            });
    }

    checkSignUp(): void {
        this.authAPI.profile()
            .then(() => Router.go("/chats"));
    }

    logout(): void {
        this.authAPI.logout()
            .then(() => Router.go("/login"));
    }

    getProfile(): Promise<TProfile> {
        return this.authAPI.profile()
            .then((res) => JSON.parse(res.response) as TProfile)
            .then((profile) => {
                store.dispatch(Store.EVENTS.PROFILE_CHANGED, profile);
                return profile;
            });
    }
}

export const authController = new AuthController();
