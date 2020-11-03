import { HttpOptions, HTTPTransport } from "../utils/fetch.js";

class HTTP {
    private fetch: HTTPTransport;
    private baseUrl: string;

    constructor(baseUrl: string) {
        this.fetch = new HTTPTransport();
        this.baseUrl = baseUrl;
    }

    get(url: string, options: HttpOptions) {
        return this.fetch.get(this.baseUrl + url, options);
    }

    post(url: string, options: HttpOptions) {
        return this.fetch.post(this.baseUrl + url, options);
    }

    put(url: string, options: HttpOptions) {
        return this.fetch.put(this.baseUrl + url, options);
    }

    delete(url: string, options: HttpOptions) {
        return this.fetch.delete(this.baseUrl + url, options);
    }
}

const baseUrl = "https://ya-praktikum.tech/api/v2";

export const apiInstance = new HTTP(baseUrl);
export const chatAPIInstance = new HTTP(baseUrl + "/chats");
export const chatMessagesAPIInstance = new HTTP('api/v1/chats');
export const authAPIInstance = new HTTP(baseUrl + "/auth");

export default HTTP; 