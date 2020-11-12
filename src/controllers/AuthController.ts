import AuthAPI, { SingUpData } from "../api/auth-api.js";
import { Store, store } from "../store/Store.js";
import Router from "../utils/router.js";

export default class AuthController {
    private _authAPI: AuthAPI;

    constructor() {
        this._authAPI = new AuthAPI();
    }

    signIn(login: string, password: string) {
        this._authAPI.signIn(login, password)
            .then(() => Router.go("/chats"))
            .catch((e: XMLHttpRequest) => {
                const error = (JSON.parse(e.response) as TError);
                store.dispatch(Store.EVENTS.SIGN_IN_FAILED, error.reason);
            });
    }

    signUp(data: SingUpData) {
        this._authAPI.signUp(data)
            .then(() => Router.go("/chats"));
    }

    checkSignUp() {
        this._authAPI.profile()
            .then(() => Router.go("/chats"));
    }

    logout() {
        this._authAPI.logout()
            .then(() => Router.go("/login"));
    }

    profile() {
        this._authAPI.profile()
            .then(res => JSON.parse(res.response))
            .then(res => store.dispatch(Store.EVENTS.PROFILE_CHANGED, { res }));
    }
}

export const authController = new AuthController();