import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom';

import Button from '../index';

function getExampleDOM(inner: string) {
    // This is just a raw example of setting up some DOM
    // that we can interact with. Swap this with your UI
    // framework of choice 😉
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
        const domButton = dom.querySelector('button');

        const onClick = jest.fn();
        if (!domButton)
            throw "Button is null";

        domButton.addEventListener('click', onClick);

        domButton.click();
        expect(onClick).toBeCalledTimes(1);
        domButton.click();
        expect(onClick).toBeCalledTimes(2);

        expect(domButton).toHaveAttribute("type", buttonType);
        expect(domButton).toHaveTextContent(buttonText);
    })
});