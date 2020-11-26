import { PlainObject } from "Common/commonTypes";

function isPlainObject(value: unknown): value is PlainObject {
    return typeof value === "object"
        && value !== null
        && value.constructor === Object
        && Object.prototype.toString.call(value) === "[object Object]";
}

function isArrayOrObject(value: unknown): value is ([] | PlainObject) {
    return isPlainObject(value) || Array.isArray(value);
}

export default function isEqual(lhs: PlainObject | [], rhs: PlainObject | []): boolean {
    // Сравнение количества ключей объектов и массивов
    if (Object.keys(lhs).length !== Object.keys(rhs).length) {
        return false;
    }

    for (const [key, value] of Object.entries(lhs)) {
        const rightValue = Reflect.get(rhs, key);
        if (isArrayOrObject(value) && isArrayOrObject(rightValue)) {
            // Здесь value и rightValue может быть только массивом или объектом
            // И TypeScript это обрабатывает
            if (isEqual(value, rightValue)) {
                continue;
            }
            return false;
        }

        if (value !== rightValue) {
            return false;
        }
    }

    return true;
}
