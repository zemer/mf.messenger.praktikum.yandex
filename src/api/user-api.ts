import { StringIndexed } from "../utils/fetch.js";
import { userAPIInstance } from "./http.js";

export class UserAPI {
    updateProfile(profile: ChnageUserProfileReques): Promise<XMLHttpRequest> {
        return userAPIInstance.put("/profile", {
            data: profile
        });
    }

    updatePassword(oldPassword: string, newPassword: string): Promise<XMLHttpRequest> {
        return userAPIInstance.put("/password", {
            data: {
                oldPassword,
                newPassword
            }
        });
    }

    updateAvatar(avatar: File | null) {
        if (avatar) {
            const formdata = new FormData();
            formdata.append('avatar', avatar);

            return userAPIInstance.put("/profile/avatar", {
                data: formdata,
                headers: {}
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