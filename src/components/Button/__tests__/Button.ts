//import '@testing-library/jest-dom/extend-expect';
//import '@testing-library/jest-dom';
//import sinon from "sinon";

//let fake = sinon.fake;

//import sinon from "sinon";
//import { expect } from 'chai';
//import Sinon, { fake } from "sinon";
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

        // const onClick = sinon1.fake();
        if (!domButton)
            throw "Button is null";

        //domButton.addEventListener('click', onClick);

        //domButton.click();
        // expect(onClick).toBeCalledTimes(1);
        // domButton.click();
        // expect(onClick).toBeCalledTimes(2);

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