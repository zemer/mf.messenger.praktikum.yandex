import Block from "../../Block/Block.js";
import MailField from "../index.js";
import Handlebars from "handlebars";

global.Handlebars = Handlebars;

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
        });

        const dom = getExampleDOM(mail.renderToString());
        Block.hydrate(dom);

        const domInput = dom.querySelector('input');
        const domLabel = dom.querySelector('label');

        if (!domInput)
            throw "mail is null";

        if (!domLabel)
            throw "label is null";

        expect(domInput.getAttribute("id")).toEqual(id);
        expect(domInput.getAttribute("placeholder")).toEqual(placeholder);


        expect(domLabel.textContent).toEqual(label);
    })

    it("Validation", () => {
        const [id, label, placeholder] = ["mail", "Mail", "You mail"]
        const mail = new MailField({
            id: id,
            label: label,
            placeholder: placeholder,
        });

        const emptyMessage = "Почта не может быть пустой";
        const notValidMessage = "Неверный формат";

        expect(mail.checkValidation(undefined)).toEqual(emptyMessage);
        expect(mail.checkValidation("")).toEqual(emptyMessage);

        expect(mail.checkValidation("   ")).toEqual(notValidMessage);
        expect(mail.checkValidation("аваы")).toEqual(notValidMessage);
        expect(mail.checkValidation("443534")).toEqual(notValidMessage);
        expect(mail.checkValidation("443534@mail")).toEqual(notValidMessage);

        expect(mail.checkValidation("32432@mail.ru")).toEqual(null);
    })
});