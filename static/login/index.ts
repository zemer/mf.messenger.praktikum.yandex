import Button from "../components/button/index"

var source = document.getElementById("entry-template")?.innerHTML;
var template = Handlebars.compile(source);

var button = new Button({ value: "Войти" });

var context = { button: button.render() };
var block = template(context);

document.body.innerHTML = block;