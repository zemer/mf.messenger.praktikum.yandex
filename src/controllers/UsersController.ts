import { ChnageUserProfileRequest } from "../api/interfaces";
import { UserAPI } from "../api/user-api";
import { Store, store } from "../store/Store";
import Router from "../utils/router";

export default class UsersController {
    private _userAPI: UserAPI;

    constructor() {
        this._userAPI = new UserAPI();
    }

    updateProfile(profile: ChnageUserProfileRequest, oldPassword: string, newPassword: string, avatar: File | null) {
        const updatePorile = this._userAPI.updateProfile(profile);

        let updateAvatar = null;
        if (avatar) {
            updateAvatar = this.updateAvatar(avatar);
        }

        const updatePassword = this.updatePassword(oldPassword, newPassword);

        return Promise.all([updatePorile, updateAvatar, updatePassword])
            .then(() => Router.back());
    }

    private updatePassword(oldPassword: string, newPassword: string) {
        return this._userAPI.updatePassword(oldPassword, newPassword);
    }

    private updateAvatar(avatar: File | null) {
        return this._userAPI.updateAvatar(avatar);
    }

    search(login: string) {
        return this._userAPI.search(login)
            .then((res) => JSON.parse(res.response))
            .then((res) => store.dispatch(Store.EVENTS.SEARCH_USERS, { items: res }));
    }
}

export const usersController = new UsersController();
