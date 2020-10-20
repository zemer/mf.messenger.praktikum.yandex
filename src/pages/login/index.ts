import Block from "../../components/Block/Block.js";
import Login from "./login.js";

const temp = new Login();
const content = temp.getContent();

if (content) {
    document.body.appendChild(content);
    Block.hydrate();
}