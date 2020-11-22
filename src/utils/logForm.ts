export function logForm() {
    const form = document.forms[0];

    const log = {} as any;

    for (const e of form.elements) {
        if (e.getAttribute("type") === "text" || e.getAttribute("type") === "password") {
            log[e.id] = (e as HTMLInputElement).value;
        }
    }

    console.log(log);

    return false;
}
