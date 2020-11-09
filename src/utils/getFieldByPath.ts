export default function getFieldByPath(obj: any, path: string): any {
    const keys = path.split(".");

    let result = obj;
    for (let key of keys) {
        const value = result[key];

        if (!value) {
            return undefined;
        }

        result = value;
    }

    return result;
}