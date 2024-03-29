import { PlainObject, StringIndexed } from "Common/commonTypes";

const METHODS = {
    GET: "GET",
    PUT: "PUT",
    POST: "POST",
    DELETE: "DELETE"
};

export function queryStringify(data: StringIndexed): string | never {
    if (typeof data !== "object") throw Error("Input must be an object");

    const convertKey = (key: string, value: any): string => {
        if (Array.isArray(value)) {
            return value.map((current, index) => convertKey(`${key}[${index}]`, current)).join("&");
        }

        if (typeof (value) === "object") {
            return Object.keys(value).map((i) => convertKey(`${key}[${i}]`, value[i])).join("&");
        }

        return `${key}=${value}`;
    };

    return Object.keys(data).map((i) => convertKey(i, data[i])).join("&");
}

export interface HttpOptions {
    baseUrl?: string;
    headers?: PlainObject<string>;
    data?: StringIndexed | FormData;
    timeout?: number;
    withCredentials?: boolean;
}

export class HTTPTransport {
    private readonly defaultOptions = {
        headers: {
            "Content-Type": "application/json; charset=utf-8"
        }
    };

    private baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    get = (url: string, options: HttpOptions = this.defaultOptions): Promise<XMLHttpRequest> => {
        if (options.data) {
            const getUrl = `${url}?${queryStringify(options.data as StringIndexed)}`;

            return this.request(getUrl, options, METHODS.GET, options.timeout);
        }

        return this.request(url, options, METHODS.GET, options.timeout);
    };

    post = (url: string, options: HttpOptions = this.defaultOptions): Promise<XMLHttpRequest> => this.request(url, options, METHODS.POST, options.timeout);

    put = (url: string, options: HttpOptions = this.defaultOptions): Promise<XMLHttpRequest> => this.request(url, options, METHODS.PUT, options.timeout);

    delete = (url: string, options: HttpOptions = this.defaultOptions): Promise<XMLHttpRequest> => this.request(url, options, METHODS.DELETE, options.timeout);

    request = (url: string, options: HttpOptions, method: string, timeout = 5000): Promise<XMLHttpRequest> => {
        const { headers, data, withCredentials } = options;

        // Для FormData не нужно указывать ContentType
        const mergedHeaders = data instanceof FormData
            ? { ...headers }
            : {
                ...this.defaultOptions.headers,
                ...headers
            };

        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.timeout = timeout;

            const resultUrl = (options.baseUrl || this.baseUrl) + url;

            xhr.open(method, resultUrl);
            xhr.withCredentials = withCredentials ?? true;

            if (mergedHeaders) {
                Object.entries(mergedHeaders).forEach((pair) => xhr.setRequestHeader(pair[0], pair[1]));
            }

            xhr.onload = () => {
                if (xhr.status >= 400) return reject(xhr);

                return resolve(xhr);
            };

            xhr.onabort = reject;
            xhr.onerror = reject;
            xhr.ontimeout = reject;

            if (method === METHODS.GET || !data) {
                xhr.send();
            } else if (data instanceof FormData) {
                xhr.send(data);
            } else {
                xhr.send(JSON.stringify(data));
            }
        });
    };
}
