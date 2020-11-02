import Block from "../../Block/index.js";
import PhoneField from "../index.js";

let expect = chai.expect;

function getExampleDOM(inner: string) {
    const div = document.createElement('div')
    div.innerHTML = inner
    return div
}

describe("PhoneField", () => {
    it("Render", () => {
        const [id, label] = ["phone", "Phone"]
        const login = new PhoneField({
            id: id,
            label: label
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
        expect(domInput.getAttribute("placeholder")).equals("+7(999)456-78-90");

        expect(domLabel.textContent).equals(label);
    })

    it("Validation", () => {
        const [id, label] = ["phone", "Phone"]
        const phone = new PhoneField({
            id: id,
            label: label
        });

        const emptyMessage = "Не указан телефон";
        const notvalidMessage = "Неверный формат";

        expect(phone.checkValidation(null)).equals(emptyMessage);
        expect(phone.checkValidation("")).equals(emptyMessage);

        expect(phone.checkValidation("   ")).equals(notvalidMessage);
        expect(phone.checkValidation("аваы")).equals(notvalidMessage);
        expect(phone.checkValidation("(&*^^)")).equals(notvalidMessage);
        expect(phone.checkValidation("873643282")).equals(notvalidMessage);

        expect(phone.checkValidation("7(999)456-78-90")).equals(null);
        expect(phone.checkValidation("+7(999)456-78-90")).equals(null);
        expect(phone.checkValidation("89994567890")).equals(null);
        expect(phone.checkValidation("8 999 456 78 90")).equals(null);
    })
});