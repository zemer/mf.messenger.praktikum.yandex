import Block from "../../Block/index";
import PhoneField from "../index";
import "@testing-library/jest-dom/extend-expect";
import Handlebars from "handlebars";

global.Handlebars = Handlebars;

function getExampleDOM(inner: string) {
    const div = document.createElement("div");
    div.innerHTML = inner;
    return div;
}

describe("PhoneField", () => {
    it("Render", () => {
        const [id, label] = ["phone", "Phone"];
        const login = new PhoneField({
            id,
            label
        });

        const dom = getExampleDOM(login.renderToString());
        Block.hydrate(dom);

        const domInput = dom.querySelector("input");
        const domLabel = dom.querySelector("label");

        if (!domInput) throw "input is null";

        if (!domLabel) throw "label is null";

        expect(domInput.getAttribute("id")).toEqual(id);
        expect(domInput.getAttribute("placeholder")).toEqual("+7(999)456-78-90");

        expect(domLabel.textContent).toEqual(label);
    });

    it("Validation", () => {
        const [id, label] = ["phone", "Phone"];
        const phone = new PhoneField({
            id,
            label
        });

        const emptyMessage = "Не указан телефон";
        const notvalidMessage = "Неверный формат";

        expect(phone.checkValidation(undefined)).toEqual(emptyMessage);
        expect(phone.checkValidation("")).toEqual(emptyMessage);

        expect(phone.checkValidation("   ")).toEqual(notvalidMessage);
        expect(phone.checkValidation("аваы")).toEqual(notvalidMessage);
        expect(phone.checkValidation("(&*^^)")).toEqual(notvalidMessage);
        expect(phone.checkValidation("873643282")).toEqual(notvalidMessage);

        expect(phone.checkValidation("7(999)456-78-90")).toEqual(null);
        expect(phone.checkValidation("+7(999)456-78-90")).toEqual(null);
        expect(phone.checkValidation("89994567890")).toEqual(null);
        expect(phone.checkValidation("8 999 456 78 90")).toEqual(null);
    });
});
