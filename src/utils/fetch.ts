export type StringIndexed = Record<string, unknown>;

const METHODS = {
    GET: 'GET',
    PUT: 'PUT',
    POST: 'POST',
    DELETE: 'DELETE'
};

export function queryStringify(data: StringIndexed): string | never {
    if (typeof (data) !== 'object')
        throw "Input must be an object";

    const convertKey = (key: string, value: any): string => {
        if (Array.isArray(value)) {
            return value.map((current, index) => convertKey(`${key}[${index}]`, current)).join('&');
        }

        if (typeof (value) === 'object') {
            return Object.keys(value).map(i => convertKey(`${key}[${i}]`, value[i])).join('&');
        }

        return `${key}=${value}`
    }

    return Object.keys(data).map(i => convertKey(i, data[i])).join('&');
}

export interface HttpOptions {
    headers?: string[];
    data?: StringIndexed;
    timeout?: number;
}

export class HTTPTransport {
    get = (url: string, options: HttpOptions): Promise<XMLHttpRequest> => {
        if (options.data) {
            url += '?' + queryStringify(options.data);
        }

        return this.request(url, options, METHODS.GET, options.timeout);
    };

    post = (url: string, options: HttpOptions): Promise<XMLHttpRequest> => {
        return this.request(url, options, METHODS.POST, options.timeout);
    };

    put = (url: string, options: HttpOptions): Promise<XMLHttpRequest> => {
        return this.request(url, options, METHODS.PUT, options.timeout);
    };

    delete = (url: string, options: HttpOptions): Promise<XMLHttpRequest> => {
        return this.request(url, options, METHODS.DELETE, options.timeout);
    };

    request = (url: string, options: HttpOptions, method: string, timeout = 5000): Promise<XMLHttpRequest> => {
        const { headers, data } = options;

        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.timeout = timeout;

            xhr.open(method, url);
            xhr.withCredentials = true;

            if (headers)
                for (const header in headers) {
                    xhr.setRequestHeader(header, headers[header]);
                }
            else {
                xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
            }



            xhr.onload = function () {
                resolve(xhr);
            };

            xhr.onabort = reject;
            xhr.onerror = () => {
                console.log("error");
                reject();
            };
            xhr.ontimeout = () => {
                console.log("timeout");
                reject();
            };

            if (method === METHODS.GET || !data) {
                xhr.send();
            } else {
                xhr.send(JSON.stringify(data));
            }
        });
    };
}