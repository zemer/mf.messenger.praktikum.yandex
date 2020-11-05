import { ChnageUserProfileReques as ChnageUserProfileRequest, UserAPI } from "../api/user-api.js";
import { Store, store } from "../store/Store.js";
import Router from "../utils/router.js";

export default class UsersController {
    private _userAPI: UserAPI;

    constructor() {
        this._userAPI = new UserAPI();
    }

    updateProfile(profile: ChnageUserProfileRequest, oldPassword: string, newPassword: string, avatar: File | null) {
        const updatePorile = this._userAPI.updateProfile(profile)
            .then(res => this.checkStatus(res));

        let updateAvatar = null;
        if (avatar) {
            updateAvatar = this.updateAvatar(avatar)
                .then(res => this.checkStatus(res));
        }

        const updatePassword = this.updatePassword(oldPassword, newPassword)
            .then(res => this.checkStatus(res));

        return Promise.all([updatePorile, updateAvatar, updatePassword])
            .then(() => Router.__instance.back());
    }

    private updatePassword(oldPassword: string, newPassword: string) {
        return this._userAPI.updatePassword(oldPassword, newPassword);
    }

    private updateAvatar(avatar: File | null) {
        return this._userAPI.updateAvatar(avatar);
    }

    search(login: string) {
        return this._userAPI.search(login)
            .then(res => this.checkStatus(res))
            .then(res => JSON.parse(res.response))
            .then(res => store.dispatch(Store.EVENTS.SEARCH_USERS, { items: res }));
    }

    private checkStatus(res: XMLHttpRequest) {
        if (res.status != 200)
            throw res.status + " " + res.statusText;

        return res;
    }
}

export const usersController = new UsersController();