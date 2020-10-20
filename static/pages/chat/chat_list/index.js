import Block from "../../../components/block/block.js";
import ChatList from "./ChatList.js";
const page = new ChatList();
const content = page.getContent();
if (content) {
    document.body.appendChild(content);
    Block.hydrate();
}
//# sourceMappingURL=index.js.map