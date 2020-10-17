import { template } from "./template.js";
import Button from "../components/button/index.js"

var compiled = Handlebars.compile(template);

var button = new Button({ value: "Войти" });

var context = { button: button.render() };
var block = compiled(context);

document.body.innerHTML = block;