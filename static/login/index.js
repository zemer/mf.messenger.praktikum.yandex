var _a;
import Button from "../components/button/index.js";
var source = (_a = document.getElementById("entry-template")) === null || _a === void 0 ? void 0 : _a.innerHTML;
var template = Handlebars.compile(source);
var button = new Button({ value: "Войти" });
var context = { button: button.render() };
var block = template(context);
document.body.innerHTML = block;
//# sourceMappingURL=index.js.map