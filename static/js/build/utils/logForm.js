export function logForm() {
    let form = document.forms[0];
    let log = {};
    for (let e of form.elements) {
        if (e.getAttribute('type') === 'text' || e.getAttribute('type') === 'password')
            log[e['id']] = e.value;
    }
    console.log(log);
    return false;
}
//# sourceMappingURL=logForm.js.map