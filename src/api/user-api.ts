import { HTTPTransport } from "Utils/fetch";
import { httpAPIUrl } from "Api/api-url";
import { ChnageUserProfileRequest } from "./interfaces";

export default class UserAPI {
    private userAPIInstance = new HTTPTransport(`${httpAPIUrl}/api/v2/user`);

    updateProfile(profile: ChnageUserProfileRequest): Promise<XMLHttpRequest> {
        return this.userAPIInstance.put("/profile", {
            data: profile
        });
    }

    updatePassword(oldPassword: string, newPassword: string): Promise<XMLHttpRequest> {
        return this.userAPIInstance.put("/password", {
            data: {
                oldPassword,
                newPassword
            }
        });
    }

    updateAvatar(avatar: File | null): Promise<XMLHttpRequest> {
        if (avatar) {
            const formdata = new FormData();
            formdata.append("avatar", avatar);

            return this.userAPIInstance.put("/profile/avatar", {
                data: formdata,
                headers: {} // Заголовок multipart/form-data
            });
        }

        return Promise.reject();
    }

    search(login: string): Promise<XMLHttpRequest> {
        return this.userAPIInstance.post("/search", {
            data: {
                login
            }
        });
    }
}
