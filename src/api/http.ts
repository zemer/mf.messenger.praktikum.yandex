import { HttpOptions, HTTPTransport } from "../utils/fetch.js";

class HTTP {
    private fetch: HTTPTransport;
    private baseUrl: string;

    private readonly defaultOptions = {
        headers: {
            "Content-Type": "application/json; charset=utf-8"
        }
    };

    constructor(baseUrl: string) {
        this.fetch = new HTTPTransport();
        this.baseUrl = baseUrl;
    }

    get(url: string, options: HttpOptions = this.defaultOptions) {
        return this.fetch.get(this.baseUrl + url, options);
    }

    post(url: string, options: HttpOptions = this.defaultOptions) {
        return this.fetch.post(this.baseUrl + url, options);
    }

    put(url: string, options: HttpOptions = this.defaultOptions) {
        return this.fetch.put(this.baseUrl + url, options);
    }

    delete(url: string, options: HttpOptions = this.defaultOptions) {
        return this.fetch.delete(this.baseUrl + url, options);
    }
}

export const baseAPIUrl = "https://ya-praktikum.tech";

export const apiInstance = new HTTP(baseAPIUrl);
export const chatAPIInstance = new HTTP(baseAPIUrl + "/api/v2/chats");
export const authAPIInstance = new HTTP(baseAPIUrl + "/api/v2/auth");
export const userAPIInstance = new HTTP(baseAPIUrl + "/api/v2/user")

export default HTTP; 