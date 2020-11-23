import Handlebars from "handlebars";
import Block from "../../Block/Block";
import PasswordField from "../index";

global.Handlebars = Handlebars;

function getExampleDOM(inner: string) {
    const div = document.createElement("div");
    div.innerHTML = inner;
    return div;
}

describe("PasswordField", () => {
    it("Render", () => {
        const [id, label, placeholder] = ["password", "Password", "You password"];
        const login = new PasswordField({
            id,
            label,
            placeholder
        });

        const dom = getExampleDOM(login.renderToString());
        Block.hydrate(dom);

        const domInput = dom.querySelector("input");
        const domLabel = dom.querySelector("label");

        if (!domInput) throw Error("input is null");

        if (!domLabel) throw Error("label is null");

        expect(domInput.getAttribute("id")).toEqual(id);
        expect(domInput.getAttribute("placeholder")).toEqual(placeholder);

        expect(domLabel.textContent).toEqual(label);
    });

    it("Validation", () => {
        const [id, label, placeholder] = ["password", "Password", "You password"];
        const login = new PasswordField({
            id,
            label,
            placeholder
        });

        const emptyMessage = "Пароль не может быть пустым";
        const minLengthMessage = "Пароль не может быть меньше 8 символов";
        const notvalidMessage = "Пароль может содержать латинские символы и цифры";

        expect(login.checkValidation(undefined)).toEqual(emptyMessage);
        expect(login.checkValidation("")).toEqual(emptyMessage);

        expect(login.checkValidation("   ")).toEqual(minLengthMessage);
        expect(login.checkValidation("аваы")).toEqual(minLengthMessage);

        expect(login.checkValidation("(&*^^)fdsfsdf")).toEqual(notvalidMessage);

        expect(login.checkValidation("odhdu83682")).toEqual(null);
    });
});
