import Block from "../../Block/Block.js";
import Button from '../index.js';

let expect = chai.expect;

function getExampleDOM(inner: string) {
    const div = document.createElement('div')
    div.innerHTML = inner
    return div
}

describe("Button", () => {
    it("Render", () => {
        const [buttonText, buttonType] = ["test", "button"]
        const button = new Button({
            value: buttonText,
            handleClick: () => { }
        });

        const dom = getExampleDOM(button.renderToString());
        Block.hydrate(dom);

        const domButton = dom.querySelector('button');

        if (!domButton)
            throw "Button is null";

        expect(domButton.getAttribute("type")).equals(buttonType);
        expect(domButton.textContent).equals(buttonText);
    })

    it("Render пустых props", () => {
        const [buttonText, buttonType] = ["", "button"]
        const button = new Button({
            value: buttonText,
            handleClick: () => { }
        });

        const dom = getExampleDOM(button.renderToString());
        Block.hydrate(dom);

        const domButton = dom.querySelector('button');

        if (!domButton)
            throw "Button is null";

        expect(domButton.getAttribute("type")).equals(buttonType);
        expect(domButton.textContent).equals(buttonText);
    })

    it("Update props", () => {
        const [buttonText, buttonType] = ["test", "button"]
        const button = new Button({
            value: buttonText,
            handleClick: () => { }
        });

        const dom = getExampleDOM(button.renderToString());
        Block.hydrate(dom);

        const domButton = dom.querySelector('button');

        if (!domButton)
            throw "Button is null";

        expect(domButton.getAttribute("type")).equals(buttonType);
        expect(domButton.textContent).equals(buttonText);

        button.setProps({
            ...button.props,
            value: "123"
        });

        expect(domButton.textContent).equals("123");
    })
});