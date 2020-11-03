import Block from "../../Block/Block.js";
import PasswordField from "../index.js";

let expect = chai.expect;

function getExampleDOM(inner: string) {
    const div = document.createElement('div')
    div.innerHTML = inner
    return div
}

describe("PasswordField", () => {
    it("Render", () => {
        const [id, label, placeholder] = ["password", "Password", "You password"]
        const login = new PasswordField({
            id: id,
            label: label,
            placeholder: placeholder,
            value: ""
        });

        const dom = getExampleDOM(login.renderToString());
        Block.hydrate(dom);

        const domInput = dom.querySelector('input');
        const domLabel = dom.querySelector('label');

        if (!domInput)
            throw "input is null";

        if (!domLabel)
            throw "label is null";

        expect(domInput.getAttribute("id")).equals(id);
        expect(domInput.getAttribute("placeholder")).equals(placeholder);

        expect(domLabel.textContent).equals(label);
    })

    it("Validation", () => {
        const [id, label, placeholder] = ["password", "Password", "You password"]
        const login = new PasswordField({
            id: id,
            label: label,
            placeholder: placeholder,
            value: ""
        });

        const emptyMessage = "Пароль не может быть пустым";
        const notvalidMessage = "Пароль может содержать латинские символы и цифры";

        expect(login.checkValidation(undefined)).equals(emptyMessage);
        expect(login.checkValidation("")).equals(emptyMessage);

        expect(login.checkValidation("   ")).equals(notvalidMessage);
        expect(login.checkValidation("аваы")).equals(notvalidMessage);
        expect(login.checkValidation("(&*^^)")).equals(notvalidMessage);

        expect(login.checkValidation("odhdu83682")).equals(null);
    })
});