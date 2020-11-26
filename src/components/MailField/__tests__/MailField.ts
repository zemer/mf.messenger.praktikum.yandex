import Handlebars from "handlebars";
import Block from "Components/Block";
import MailField from "Components/MailField";

global.Handlebars = Handlebars;

function getExampleDOM(inner: string) {
    const div = document.createElement("div");
    div.innerHTML = inner;
    return div;
}

describe("MailField", () => {
    it("Render", () => {
        const [id, label, placeholder] = ["mail", "Mail", "You mail"];
        const mail = new MailField({
            id,
            label,
            placeholder
        });

        const dom = getExampleDOM(mail.renderToString());
        Block.hydrate(dom);

        const domInput = dom.querySelector("input");
        const domLabel = dom.querySelector("label");

        if (!domInput) throw Error("mail is null");

        if (!domLabel) throw Error("label is null");

        expect(domInput.getAttribute("id")).toEqual(id);
        expect(domInput.getAttribute("placeholder")).toEqual(placeholder);

        expect(domLabel.textContent).toEqual(label);
    });

    it("Validation", () => {
        const [id, label, placeholder] = ["mail", "Mail", "You mail"];
        const mail = new MailField({
            id,
            label,
            placeholder
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
    });
});
