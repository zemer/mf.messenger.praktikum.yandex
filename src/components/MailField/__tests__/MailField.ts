import Block from "../../Block/Block.js";
import MailField from "../index.js";

let expect = chai.expect;

function getExampleDOM(inner: string) {
    const div = document.createElement('div')
    div.innerHTML = inner
    return div
}

describe("MailField", () => {
    it("Render", () => {
        const [id, label, placeholder] = ["mail", "Mail", "You mail"]
        const mail = new MailField({
            id: id,
            label: label,
            placeholder: placeholder,
            value: ""
        });

        const dom = getExampleDOM(mail.renderToString());
        Block.hydrate(dom);

        const domInput = dom.querySelector('input');
        const domLabel = dom.querySelector('label');

        if (!domInput)
            throw "mail is null";

        if (!domLabel)
            throw "label is null";

        expect(domInput.getAttribute("id")).equals(id);
        expect(domInput.getAttribute("placeholder")).equals(placeholder);


        expect(domLabel.textContent).equals(label);
    })

    it("Validation", () => {
        const [id, label, placeholder] = ["mail", "Mail", "You mail"]
        const mail = new MailField({
            id: id,
            label: label,
            placeholder: placeholder,
            value: ""
        });

        const emptyMessage = "Почта не может быть пустой";
        const notValidMessage = "Неверный формат";

        expect(mail.checkValidation(undefined)).equals(emptyMessage);
        expect(mail.checkValidation("")).equals(emptyMessage);

        expect(mail.checkValidation("   ")).equals(notValidMessage);
        expect(mail.checkValidation("аваы")).equals(notValidMessage);
        expect(mail.checkValidation("443534")).equals(notValidMessage);
        expect(mail.checkValidation("443534@mail")).equals(notValidMessage);

        expect(mail.checkValidation("32432@mail.ru")).equals(null);
    })
});