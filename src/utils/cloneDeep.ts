import { StringIndexed } from "./fetch";

export function cloneDeep(obj: object): object {
    if (obj === null || obj === undefined) {
        return obj;
    }
    else if (Array.isArray(obj)) {
        const clone = Array<any>();

        for (let item of obj) {
            clone.push(cloneDeep(item));
        }

        return clone;
    }
    else if (typeof obj === "object") {
        const clone = {} as StringIndexed;
        const keys = Object.keys(obj);
        for (let key of keys) {
            const value = Reflect.get(obj, key);
            clone[key] = cloneDeep(value);
        }

        return clone;
    }
    else {
        return obj;
    }
}