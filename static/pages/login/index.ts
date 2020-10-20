import Block from "../../components/block/block.js";
import Login from "./login.js";

const temp = new Login();
const content = temp.getContent();

if (content) {
    document.body.appendChild(content);
    Block.hydrate();
}