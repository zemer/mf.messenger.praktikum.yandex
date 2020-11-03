// import BaseAPI from "./base-api.js";
// import { authAPIInstance, userAPIInstance } from "./http.js";

// class UserAPI extends BaseAPI {
//     create() {
//         return userAPIInstance.post('/profile', {})
//             // И то, только в случае, если уверены в результате,
//             // иначе контроллер проверит все сам дальше
//             .then({ user: { info } } => info);
//     }

//     profile(login: string, password: string): Promise<XMLHttpRequest> {
//         return authAPIInstance.post("/signin", {
//             data: {
//                 login,
//                 password
//             },
//         });
//     }
// } 