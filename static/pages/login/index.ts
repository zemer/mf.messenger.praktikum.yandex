import Block from "../../components/block/block.js";
import Button from "../../components/Button/index.js"
import Input from "../../components/input/input.js";
import Login from "./login.js";

// var source = document.getElementById("entry-template")?.innerHTML;
// var template = Handlebars.compile(source);

// var login = new Input({
//     id: "login",
//     label: "Логин",
//     handleClick: () => { console.log("123") }
// });

// var password = new Input({
//     id: "password",
//     label: "Пароль",
//     type: "password"
// });

// var button = new Button({
//     value: "Войти",
//     class: "button button-login"
// });

// var context = {
//     login: login.render(),
//     password: password.render(),
//     button: button.render()
// };

// var block = template(context);



const temp = new Login();
const content = temp.getContent();

if (content) {
    document.body.appendChild(content);
    Block.hydrate();
}