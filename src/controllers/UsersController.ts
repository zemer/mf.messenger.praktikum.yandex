import { ChnageUserProfileRequest } from "Api/interfaces";
import UserAPI from "Api/user-api";
import { Store, store } from "Store/Store";
import { TChatUsers } from "Store/types";
import Router from "Utils/router";

export default class UsersController {
    private userAPI: UserAPI;

    constructor() {
        this.userAPI = new UserAPI();
    }

    updateProfile(profile: ChnageUserProfileRequest, oldPassword: string, newPassword: string, avatar: File | null) {
        const updatePorile = this.userAPI.updateProfile(profile);

        let updateAvatar = null;
        if (avatar) {
            updateAvatar = this.updateAvatar(avatar);
        }

        const updatePassword = this.updatePassword(oldPassword, newPassword);

        return Promise.all([updatePorile, updateAvatar, updatePassword])
            .then(() => Router.back());
    }

    private updatePassword(oldPassword: string, newPassword: string): Promise<XMLHttpRequest> {
        return this.userAPI.updatePassword(oldPassword, newPassword);
    }

    private updateAvatar(avatar: File | null): Promise<XMLHttpRequest> {
        return this.userAPI.updateAvatar(avatar);
    }

    search(login: string): Promise<XMLHttpRequest> {
        return this.userAPI.search(login)
            .then((res: { response: string; }) => JSON.parse(res.response) as TChatUsers)
            .then((res: TChatUsers) => store.dispatch(Store.EVENTS.SEARCH_USERS, { items: res }));
    }
}

export const usersController = new UsersController();
