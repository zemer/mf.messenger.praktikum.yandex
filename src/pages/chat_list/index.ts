import Block from "../../components/Block/index";
import ChatList from "./ChatList";

const page = new ChatList();
const content = page.getContent();

if (content) {
    document.body.appendChild(content);
    Block.hydrate();
}
