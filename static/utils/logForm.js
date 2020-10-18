function logForm() {
    let form = document.forms[0];
    let log = {};
    for (const e of form.elements) {
        if (e['type'] === 'text' || e['type'] === 'password')
            log[e['id']] = e['value'];
    }
    console.log(log);
    return false;
}
//# sourceMappingURL=logForm.js.map