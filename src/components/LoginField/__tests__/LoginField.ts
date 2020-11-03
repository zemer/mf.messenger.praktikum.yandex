import Block from "../../Block/Block.js";
import LoginField from '../index.js';

let expect = chai.expect;

function getExampleDOM(inner: string) {
    const div = document.createElement('div')
    div.innerHTML = inner
    return div
}

describe("LoginField", () => {
    it("Render", () => {
        const [id, label, placeholder] = ["login", "Login", "You login"]
        const login = new LoginField({
            id: id,
            label: label,
            placeholder: placeholder,
        });

        const dom = getExampleDOM(login.renderToString());
        Block.hydrate(dom);

        const domInput = dom.querySelector('input');
        const domLabel = dom.querySelector('label');

        if (!domInput)
            throw "login is null";

        if (!domLabel)
            throw "label is null";

        expect(domInput.getAttribute("id")).equals(id);
        expect(domInput.getAttribute("placeholder")).equals(placeholder);

        expect(domLabel.textContent).equals(label);
    })

    it("Validation", () => {
        const [id, label, placeholder] = ["login", "Login", "You login"]
        const login = new LoginField({
            id: id,
            label: label,
            placeholder: placeholder,
        });

        const emptyMessage = "Логин не может быть пустым";
        const notvalidMessage = "Логин может содержать только латинские символы";

        expect(login.checkValidation(null)).equals(emptyMessage);
        expect(login.checkValidation("")).equals(emptyMessage);

        expect(login.checkValidation("   ")).equals(notvalidMessage);
        expect(login.checkValidation("аваы")).equals(notvalidMessage);
        expect(login.checkValidation("443534")).equals(notvalidMessage);

        expect(login.checkValidation("fdsfsdfs")).equals(null);
    })
});