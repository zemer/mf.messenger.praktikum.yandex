export function isEqual(a: object, b: object): boolean {
    if (!a && !b)
        return true;

    if (!a)
        return false;

    if (!b)
        return false;

    const keysA = Object.keys(a);
    const keysB = Object.keys(b);

    if (keysA.length !== keysB.length)
        return false;

    const commonKeys = keysA.concat(keysB);

    for (let key of commonKeys) {
        if (!a.hasOwnProperty(key))
            return false;

        if (!b.hasOwnProperty(key))
            return false;

        const valueA = Reflect.get(a, key);
        const valueB = Reflect.get(b, key);

        if (typeof valueA === 'object' && typeof valueB === 'object') {
            if (!isEqual(valueA, valueB))
                return false;
        }
        else {
            if (valueA !== valueB)
                return false;
        }
    }

    return true;
}