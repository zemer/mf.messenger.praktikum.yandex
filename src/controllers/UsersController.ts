import { ChnageUserProfileReques as ChnageUserProfileRequest, UserAPI } from "../api/user-api.js";
import Router from "../utils/router.js";

export default class UsersController {
    private _userAPI: UserAPI;

    constructor() {
        this._userAPI = new UserAPI();
    }

    updateProfile(profile: ChnageUserProfileRequest, oldPassword: string, newPassword: string) {
        this._userAPI.updateProfile(profile)
            .then(res => this.checkStatus(res))
            .then(() => {
                this.updatePassword(oldPassword, newPassword)
                    .then(res => this.checkStatus(res))
                    .then(() => Router.__instance.back());
            })
    }

    private updatePassword(oldPassword: string, newPassword: string) {
        return this._userAPI.updatePassword(oldPassword, newPassword);
    }

    private checkStatus(res: XMLHttpRequest) {
        if (res.status != 200)
            throw res.status + " " + res.statusText;

        return res;
    }
}

export const usersController = new UsersController();