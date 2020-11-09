export function logForm() {
    let form = document.forms[0];

    let log = {} as any;

    for (let e of form.elements) {
        if (e.getAttribute("type") === "text" || e.getAttribute("type") === "password") {
            log[e["id"]] = (e as HTMLInputElement).value;
        }
    }

    console.log(log);

    return false;
}