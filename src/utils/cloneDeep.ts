import { StringIndexed } from "./fetch";

export function cloneDeep(obj: object): object {
    if (obj === null || obj === undefined) {
        return obj;
    }
    if (Array.isArray(obj)) {
        const clone = Array<any>();

        for (const item of obj) {
            clone.push(cloneDeep(item));
        }

        return clone;
    }
    if (typeof obj === "object") {
        const clone = {} as StringIndexed;
        const keys = Object.keys(obj);
        for (const key of keys) {
            const value = Reflect.get(obj, key);
            clone[key] = cloneDeep(value);
        }

        return clone;
    }

    return obj;
}
