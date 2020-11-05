import Block from "../../Block/Block.js";
import Button from '../index.js';
import '@testing-library/jest-dom/extend-expect';
import Handlebars from "handlebars";

global.Handlebars = Handlebars;

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

        expect(domButton.getAttribute("type")).toEqual(buttonType);
        expect(domButton.textContent).toEqual(buttonText);
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

        expect(domButton.getAttribute("type")).toEqual(buttonType);
        expect(domButton.textContent).toEqual(buttonText);
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

        expect(domButton.getAttribute("type")).toEqual(buttonType);
        expect(domButton.textContent).toEqual(buttonText);

        button.setProps({
            ...button.props,
            value: "123"
        });

        expect(domButton.textContent).toEqual("123");
    })
});