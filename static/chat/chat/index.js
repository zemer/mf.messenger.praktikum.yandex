var _a;
import { items } from "../data.js";
const source = (_a = document.getElementById("entry-template")) === null || _a === void 0 ? void 0 : _a.innerHTML;
const template = Handlebars.compile(source);
const context = {
    items: items.map(i => i.render())
};
const block = template(context);
document.body.innerHTML = block;
//# sourceMappingURL=index.js.map