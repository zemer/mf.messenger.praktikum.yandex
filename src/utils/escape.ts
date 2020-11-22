import { PlainObject } from "../commonTypes";

const entityMap: PlainObject<string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "\"": "&quot;",
    "'": "&#39;",
    "/": "&#x2F;",
    "`": "&#x60;",
    "=": "&#x3D;"
};

export function sanitize(value: string) {
    return String(value).replace(/[&<>"'`=\/]/g, (s: string) => entityMap[s]);
}
