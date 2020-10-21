import Block from "../../../components/Block/index.js";
import Chat from "./Chat.js";
const page = new Chat();
const content = page.getContent();
if (content) {
    document.body.appendChild(content);
    Block.hydrate();
}
//# sourceMappingURL=index.js.map