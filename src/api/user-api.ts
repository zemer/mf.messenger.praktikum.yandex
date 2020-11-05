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
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            }
        });
    }

    updatePassword(oldPassword: string, newPassword: string): Promise<XMLHttpRequest> {
        return userAPIInstance.put("/password", {
            data: {
                oldPassword,
                newPassword
            },
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            }
        });
    }

    updateAvatar(avatar: File | null) {
        if (avatar) {
            const formdata = new FormData();
            formdata.append('avatar', avatar);

            return userAPIInstance.put("/profile/avatar", {
                data: formdata,
                // headers: {
                //     "Content-Type": "application/json; charset=utf-8"
                // }
            });
        }
        else {
            return Promise.reject();
        }
    }

    search(login: string) {
        return userAPIInstance.post("/search", {
            data: {
                login,
            },
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            }
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