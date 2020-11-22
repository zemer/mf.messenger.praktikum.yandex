import { HTTPTransport } from "../utils/fetch";
import { baseAPIUrl } from "./api-url";
import { ChnageUserProfileRequest } from "./interfaces";

export class UserAPI {
    private userAPIInstance = new HTTPTransport(`${baseAPIUrl}/api/v2/user`);

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

    updateAvatar(avatar: File | null) {
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

    search(login: string) {
        return this.userAPIInstance.post("/search", {
            data: {
                login
            }
        });
    }
}
