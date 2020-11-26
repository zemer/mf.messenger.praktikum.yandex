import Block from "Components/Block";
import ChatList from "./ChatList";

const page = new ChatList();
const content = page.getContent();

if (content) {
    document.body.appendChild(content);
    Block.hydrate();
}
