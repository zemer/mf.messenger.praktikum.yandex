import Block from "../../Block/Block";
import LoginField from "../index";
import Handlebars from "handlebars";

global.Handlebars = Handlebars;

function getExampleDOM(inner: string) {
    const div = document.createElement("div")
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

        const domInput = dom.querySelector("input");
        const domLabel = dom.querySelector("label");

        if (!domInput)
            throw "login is null";

        if (!domLabel)
            throw "label is null";

        expect(domInput.getAttribute("id")).toEqual(id);
        expect(domInput.getAttribute("placeholder")).toEqual(placeholder);

        expect(domLabel.textContent).toEqual(label);
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

        expect(login.checkValidation(null)).toEqual(emptyMessage);
        expect(login.checkValidation("")).toEqual(emptyMessage);

        expect(login.checkValidation("   ")).toEqual(notvalidMessage);
        expect(login.checkValidation("аваы")).toEqual(notvalidMessage);
        expect(login.checkValidation("443534")).toEqual(notvalidMessage);

        expect(login.checkValidation("fdsfsdfs")).toEqual(null);
    })
});