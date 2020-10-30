type StringIndexed = Record<string, unknown>;

const METHODS = {
    GET: 'GET',
    PUT: 'PUT',
    POST: 'POST',
    DELETE: 'DELETE'
};

function queryStringify(data: StringIndexed): string | never {
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

interface HttpOptions {
    method: string;
    headers: string[];
    data: StringIndexed;
    timeout: number;
}

class HTTPTransport {
    get = (url: string, options: HttpOptions) => {
        if (options.data) {
            url += queryStringify(options.data);
        }

        return this.request(url, { ...options, method: METHODS.GET }, options.timeout);
    };

    put = (url: string, options: HttpOptions) => {
        return this.request(url, { ...options, method: METHODS.PUT }, options.timeout);
    };

    post = (url: string, options: HttpOptions) => {
        return this.request(url, { ...options, method: METHODS.POST }, options.timeout);
    };

    delete = (url: string, options: HttpOptions) => {
        return this.request(url, { ...options, method: METHODS.DELETE }, options.timeout);
    };

    request = (url: string, options: HttpOptions, timeout = 5000) => {
        const { method, headers, data } = options;

        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.timeout = timeout;

            if (headers)
                for (const header in headers) {
                    xhr.setRequestHeader(header, headers[header]);
                }

            xhr.open(method, url);

            xhr.onload = function () {
                resolve(xhr);
            };

            xhr.onabort = reject;
            xhr.onerror = reject;
            xhr.ontimeout = reject;

            if (method === METHODS.GET || !data) {
                xhr.send();
            } else {
                xhr.send(JSON.stringify(data));
            }
        });
    };
}