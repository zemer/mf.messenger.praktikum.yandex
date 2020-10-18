import Button from "../../components/button/button.js";
import { items, messages } from "../data.js";

const source = document.getElementById("entry-template")?.innerHTML;
const template = Handlebars.compile(source);

var button = new Button({
    value: "GO",
    class: "send-button"
});

const context = {
    items: items.map(i => i.render()),
    user: "Илья",
    messages: messages.map(m => m.render()),
    button: button.render()
};

const block = template(context);

document.body.innerHTML = block;