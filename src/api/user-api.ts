import { StringIndexed } from "../utils/fetch.js";
import BaseAPI from "./base-api.js";
import { userAPIInstance } from "./http.js";

export class UserAPI extends BaseAPI {
    // create() {
    //     return userAPIInstance.post('/profile', {})
    //         // И то, только в случае, если уверены в результате,
    //         // иначе контроллер проверит все сам дальше
    //         .then({ user: { info } } => info);
    // }

    updateProfile(profile: ChnageUserProfileReques): Promise<XMLHttpRequest> {
        return userAPIInstance.put("/profile", {
            data: profile,
        });
    }

    updatePassword(oldPassword: string, newPassword: string): Promise<XMLHttpRequest> {
        return userAPIInstance.put("/password", {
            data: {
                oldPassword,
                newPassword
            },
        });
    }
}

export interface ChnageUserProfileReques extends StringIndexed {
    first_name: string;
    second_name: string;
    display_name: string;
    login: string;
    email: string;
    phone: string;
} 