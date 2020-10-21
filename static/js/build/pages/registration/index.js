import Block from "../../components/Block/index.js";
import Registration from "./registration.js";
const page = new Registration();
const content = page.getContent();
if (content) {
    document.body.appendChild(content);
    Block.hydrate();
}
//# sourceMappingURL=index.js.map