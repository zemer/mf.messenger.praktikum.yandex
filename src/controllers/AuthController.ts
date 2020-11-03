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
            .then(res => this.checkStatus(res))
            .then(() => Router.__instance.go("/chats"));
    }

    signUp(data: SingUpData) {
        this._authAPI.signUp(data)
            .then(res => this.checkStatus(res))
            .then(() => Router.__instance.go("/chats"));
    }

    checkSignUp() {
        this._authAPI.profile()
            .then(res => this.checkStatus(res))
            .then(() => Router.__instance.go("/chats"));
    }

    logout() {
        this._authAPI.logout()
            .then(res => this.checkStatus(res))
            .then(() => Router.__instance.go("/login"));
    }

    profile() {
        this._authAPI.logout()
            .then(res => this.checkStatus(res))
            .then(() => Router.__instance.go("/login"));
    }

    getChats() {
        this._authAPI.profile()
            .then(res => this.checkStatus(res))
            .then(res => JSON.parse(res.response))
            .then(res => store.dispatch(Store.EVENTS.PROFILE_CHANGED, { profile: res }));
    }

    private checkStatus(res: XMLHttpRequest) {
        if (res.status != 200)
            throw res.status + " " + res.statusText;

        return res;
    }
}

export const authController = new AuthController();