import { items } from "../data.js";

const source = document.getElementById("entry-template")?.innerHTML;
const template = Handlebars.compile(source);

const context = {
    items: items.map(i => i.render())
};

const block = template(context);

document.body.innerHTML = block;