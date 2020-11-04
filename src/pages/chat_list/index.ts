import Block from "../../components/Block/index.js";
import ChatList from "./ChatList.js";

const page = new ChatList();
const content = page.getContent();

if (content) {
    document.body.appendChild(content);
    Block.hydrate();
}